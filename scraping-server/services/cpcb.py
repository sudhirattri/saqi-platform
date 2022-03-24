
from datetime import datetime, timedelta
from distutils.command import config
import imp
import json
import base64
from . import localdb

from . import cpcb_config

from django.conf import settings

# For getting api access
import requests
from datetime import datetime
import copy
import csv

# For running jar file
import os
import subprocess

CAAQMS_URL = "https://app.cpcbccr.com/caaqms/fetch_table_data"

def get_csv(data):
    pass

def run_job(job):
    current_stage  = int(job['current_stage'])
    if(current_stage >= len(job['stages'])):
        print("Invalid current stage")
    print("In run job stage: ",current_stage)
    if(job['stages'][current_stage]['name']=='acquisition'):

        stage_data = job['stages'][current_stage]["data"]

        request_payload_dict = copy.deepcopy(cpcb_config.request_template)

        request_payload_dict["filtersToApply"]["state"] = stage_data["state"]
        request_payload_dict["filtersToApply"]["city"] = stage_data["city"]
        request_payload_dict["filtersToApply"]["station"] = stage_data["station"]
        request_payload_dict["filtersToApply"]["fromDate"] = stage_data["from_date"]
        request_payload_dict["filtersToApply"]["toDate"] = stage_data["to_date"]

        payload_json = json.dumps(request_payload_dict) 
        # print(payload_json)
        # print("payload : ",payload_json)
        request_payload_base64 = base64.b64encode(payload_json.encode("ascii"))
        # print("payload base64 :[",request_payload_base64,']')
        headers = {
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'accept': 'application/json, text/plain, */*',
            'content-type': 'text/plain',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36',
            'sec-ch-ua-platform': '"Windows"',
            'origin': 'https://app.cpcbccr.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://app.cpcbccr.com/ccr/',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,hi;q=0.8'
        }
        print("Sending payload")
        response = json.loads((requests.request("POST", CAAQMS_URL, headers=headers, data=request_payload_base64)).text)
        print("response: ",response)
        # response = json.load(open(os.path.join(os.path.dirname(__file__), './../example/api_response.json') , 'r'))
        # print(response)

        unique_id = str(job["unique_id"])

        csv_file = os.path.join(os.path.dirname(__file__), './../data/csv/'+ unique_id +'.csv')
        file_handle = open(csv_file , 'w')
        writer = csv.writer(file_handle)

        # csv_header = copy.deepcopy(cpcb_config.csv_header)
        header = response["data"]["tabularData"]["header"]
        csv_header = [col["value"] for col in header]
        
        header_keys = [col["key"] for col in header]

        writer.writerow(csv_header)

        if(response is not None and response["status"]=='success'):
            table_rows = response["data"]["tabularData"]["bodyContent"]
            for row_index in range(len(table_rows)):
                row = [table_rows[row_index][key] for key in header_keys]
                writer.writerow(row)
        
        # print(job.doc_id)

        db = localdb.getdb()
        jobs = db.table('jobs')
        next_stage = job['stages'][current_stage+1]
        next_stage["data"] = {
            "locationIRI": stage_data["locationIRI"],
            "from_date": stage_data["from_date"],
            "to_date": stage_data["to_date"],
            "csv_file":csv_file
        }
        job['stages'][current_stage+1] = next_stage
        jobs.update({
            'last_run': str(datetime.now()),
            'current_stage':str(current_stage+1),
            'status':'I',
            'stages':job['stages']
            },
            doc_ids=[job.doc_id])
        response = {
            "ran_at":str(datetime.now()),
            "comment":"acquisition done",
            "locationIRI":stage_data["locationIRI"],
            "from_date": stage_data["from_date"],
            "to_date": stage_data["to_date"],
            "csv_file":csv_file
        }
        return response

    elif(job['stages'][current_stage]['name']=='pre_process'):
        print("In pre process")
        stage_data = job['stages'][current_stage]["data"]
        db = localdb.getdb()
        jobs = db.table('jobs')
        next_stage = job['stages'][current_stage+1]
        next_stage["data"] = {
            "locationIRI": stage_data["locationIRI"],
            "from_date": stage_data["from_date"],
            "to_date": stage_data["to_date"],
            "csv_file": stage_data["csv_file"]
        }
        job['stages'][current_stage+1] = next_stage
        jobs.update({
            'last_run': str(datetime.now()),
            'current_stage':str(current_stage+1),
            'stages':job['stages']
            },
            doc_ids=[job.doc_id])
        response = {
            "ran_at":str(datetime.now()),
            "comment":"preprocess done",
            "locationIRI":stage_data["locationIRI"],
            "from_date": stage_data["from_date"],
            "to_date": stage_data["to_date"],
            "csv_file":csv_file
        }
        return response

    elif(job['stages'][current_stage]['name']=='mapping'):
        stage_data = job['stages'][current_stage]["data"]
        csv_file_name = stage_data["csv_file"].split('/')[-1]
        # print(csv_file_name)
        
        mapping_file = os.path.join(os.path.dirname(__file__), './../mappings/cpcb.rml.ttl')
        mapping_text = ''
        with open(mapping_file) as f:
            mapping_text=f.read().replace('_locname', stage_data["locationIRI"])
            mapping_text=mapping_text.replace('_filename', os.path.abspath(stage_data["csv_file"]))

        copy_map_file = os.path.abspath(os.path.join(os.path.dirname(__file__), './../mappings/'+csv_file_name+'.rml.ttl'))
        with open(copy_map_file, "w") as f:
            f.write(mapping_text)

        rml_mapper_jar = os.path.join(os.path.dirname(__file__), './../mappings/rmlmapper-4.15.0-r361-all.jar')
        
        rdf_file_name = os.path.abspath(os.path.join(os.path.dirname(__file__), './../data/turtle/'+ csv_file_name +'.turtle'))

        process_command = 'java -jar '+rml_mapper_jar+' -s turtle -m "'+copy_map_file + '" -o "' + rdf_file_name + '"'

        #java -jar /mnt/e/btp/saqi-platform/scraping-server/services/./../mappings/rmlmapper-5.0.0-r362-all.jar -s turtle -m "/mnt/e/btp/saqi-platform/scraping-server/services/./../mappings/cpcb.rml.ttl" -o "/mnt/e/btp/saqi-platform/scraping-server/services/./../data/turtle/1648060200_Okhla.csv.turtle"
        print("Running java process")
        print(process_command)
        
        process = subprocess.run(process_command,capture_output=True,shell=True)

        print("stdout: ",process.stdout)
        print("stderr: ",process.stderr)

        db = localdb.getdb()
        jobs = db.table('jobs')
        next_stage = job['stages'][current_stage+1]
        next_stage["data"] = {
            "turtle_file": rdf_file_name
        }
        job['stages'][current_stage+1] = next_stage
        jobs.update({
            'last_run': str(datetime.now()),
            'current_stage':str(current_stage+1),
            'stages':job['stages']
            },
            doc_ids=[job.doc_id])
        response = {
            "ran_at":str(datetime.now()),
            "comment":"mapping done",
            "locationIRI":stage_data["locationIRI"],
            "from_date": stage_data["from_date"],
            "to_date": stage_data["to_date"],
            "csv_file":stage_data["csv_file"],
            "turtle_file": rdf_file_name
        }
        return response

    elif(job['stages'][current_stage]['name']=='upload'):
        stage_data = job['stages'][current_stage]["data"]
        rdf_store_url = os.environ.get('RDF_STORE_URL')

        print("PROD env:",settings.PROD)
        if(settings.PROD):
            rdf_store_url = 'https://saqi-rdfstore.herokuapp.com/aq-store/data?default'
        else:
            rdf_store_url = 'http://localhost:3030/aq-store/data?default'
        
        turtle_file = stage_data['turtle_file']
        with open(turtle_file) as f:
            turtle_data=f.read()
            headers = {
            "Content-Type": "text/turtle;charset=utf-8"
            }
            print("Sending turtle payload")
            response = requests.request("POST",rdf_store_url,headers=headers, data=turtle_data)
            response_json = json.loads(response.text)
            print(response.text)
            if(response_json is not None and response_json["count"]>0):
                db = localdb.getdb()
                jobs = db.table('jobs')
                jobs.update({
                    'last_run': str(datetime.now()),
                    'current_stage':str(current_stage+1),
                    'status':'S'
                    },
                    doc_ids=[job.doc_id])
            else:
                raise Exception("Non zero triples uploaded to graph")

        response = {
            "ran_at":str(datetime.now()),
            "comment":"upload done",
            "rdf_store_url": rdf_store_url,
            "turtle_file": stage_data['turtle_file'],
            "triple_store_response":response.text
        }
        return response
    else:
        print("Invalid current stage")

        # "fromDate": "11-03-2022 T00:00:00Z",
        # "toDate": "12-03-2022 T17:21:59Z",
def add_job():
    response = {
        "added_at":str(datetime.now()),
        "comment":"added cpcb jobs",
        "jobs" : []
    }
    db = localdb.getdb()
    jobs = db.table('jobs')

    print("Adding cpcb jobs")

    current_datetime = ((datetime.now() - timedelta(hours = (0) + 0)).replace(minute=00, second=00))
    current_datetime_str = current_datetime.strftime("%d-%m-%Y T%H:%M:%SZ")
    past_datetime = ((datetime.now() - timedelta(hours = (0) +2)).replace(minute=00, second=00))
    past_datetime_str = past_datetime.strftime("%d-%m-%Y T%H:%M:%SZ")

    print(past_datetime)
    print(current_datetime)

    locations = cpcb_config.locations
    for loc in locations:
        job_template = copy.deepcopy(cpcb_config.job_template)
        job_template["last_run"] = str(datetime.now())
        job_template["unique_id"] = str(int(round(current_datetime.timestamp()))) + "_" + str(loc["locationIRI"]);
        job_template['stages'][0]["data"]["from_date"] = past_datetime_str
        job_template['stages'][0]["data"]["to_date"] = current_datetime_str
        job_template['stages'][0]["data"]["state"] = loc["state"]
        job_template['stages'][0]["data"]["city"] = loc["city"]
        job_template['stages'][0]["data"]["station"] = loc["station"]
        job_template['stages'][0]["data"]["locationIRI"] = loc["locationIRI"]
        jobs.insert(job_template)

        response["jobs"].append({
            "from_date":past_datetime_str,
            "to_date":current_datetime_str,
            "locationIRI":loc["locationIRI"]
        })

    return response




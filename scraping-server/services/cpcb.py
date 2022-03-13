
from datetime import datetime
import imp
import json
import base64
from . import localdb
from config import cpcb_config
import requests

def get_csv(data):
    pass

def run_job(job):
    current_stage  = job['current_stage']
    if(current_stage >= len(job['stages'])):
        print("Invalid current stage")
    
    if(job['stages'][current_stage]['name']=='acquisition'):
        request_payload_dict = cpcb_config.request_template
        payload_json = json.dumps(request_payload_dict) 

        request_payload_base64 = base64.b64encode(payload_json.encode("ascii"))
        url = "https://app.cpcbccr.com/caaqms/fetch_table_data"
        headers = {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'accept': 'application/json, text/plain, */*',
        'content-type': 'text/plain',
        'sec-ch-ua-mobile': '?0',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'sec-ch-ua-platform': '"Windows"',
        'origin': 'https://app.cpcbccr.com',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://app.cpcbccr.com/ccr/',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,hi;q=0.8'
        }
        response = requests.request("POST", url, headers=headers, data=request_payload_base64)
        print(response.text)
        
    elif(job['stages'][current_stage]['name']=='acquisition'):
        pass
    elif(job['stages'][current_stage]['name']=='pre_process'):
        pass
    elif(job['stages'][current_stage]['name']=='mapping'):
        pass
    elif(job['stages'][current_stage]['name']=='upload'):
        pass
    else:
        print("Invalid current stage")

def add_job():
    db = localdb.getdb()
    jobs = db.table('jobs')
    jobs.insert({
        "status":"A",
        "last_run":str(datetime.now()),
        "name" : "test job",
        "system" : "cpcb",
        "current_stage" : 0,
        "stages" : [
            {
                "name" : "acquisition",
                "comment" : "na",
                "retries_left" : 5,
                "data": {
                    "state": "Delhi",
                    "city": "Delhi",
                    "station": "site_1428",
                    "locationIRI": "Narela",
                    "from_date" : "",
                    "to_date" : "",
                }
            },
            {
                "name" : "pre_process",
                "comment" : "na",
                "retries_left" : 5,
                "data": {
                }
            },
            {
                "name" : "mapping",
                "comment" : "na",
                "retries_left" : 5,
                "data": {
                }
            },
            {
                "name" : "upload",
                "comment" : "na",
                "retries_left" : 5,
                "data": {
                }
            },
        ]
    })


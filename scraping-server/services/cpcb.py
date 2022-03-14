
from datetime import datetime, timedelta
from distutils.command import config
import imp
import json
import base64
from . import localdb

from . import cpcb_config

import requests
from datetime import datetime
import copy
import csv

import os

CAAQMS_URL = "https://app.cpcbccr.com/caaqms/fetch_table_data"

def get_csv(data):
    pass

def run_job(job):
    current_stage  = job['current_stage']
    if(current_stage >= len(job['stages'])):
        print("Invalid current stage")
    
    if(job['stages'][current_stage]['name']=='acquisition'):

        stage_data = job['stages'][current_stage]["data"]

        request_payload_dict = copy.deepcopy(cpcb_config.request_template)

        request_payload_dict["filtersToApply"]["state"] = stage_data["state"]
        request_payload_dict["filtersToApply"]["city"] = stage_data["city"]
        request_payload_dict["filtersToApply"]["station"] = stage_data["station"]
        request_payload_dict["filtersToApply"]["fromDate"] = stage_data["from_date"]
        request_payload_dict["filtersToApply"]["toDate"] = stage_data["to_date"]

        payload_json = json.dumps(request_payload_dict) 


        request_payload_base64 = base64.b64encode(payload_json.encode("ascii"))

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
        # response = requests.request("POST", CAAQMS_URL, headers=headers, data=request_payload_base64)
        # print(response.text)
        response = json.load(open(os.path.join(os.path.dirname(__file__), './../example/api_response.json') , 'r'))
        print(response)

    elif(job['stages'][current_stage]['name']=='pre_process'):
        pass
    elif(job['stages'][current_stage]['name']=='mapping'):
        pass
    elif(job['stages'][current_stage]['name']=='upload'):
        pass
    else:
        print("Invalid current stage")

        # "fromDate": "11-03-2022 T00:00:00Z",
        # "toDate": "12-03-2022 T17:21:59Z",
def add_job():
    localdb.init_db()
    db = localdb.getdb()
    jobs = db.table('jobs')

    print("Adding cpcb jobs")

    current_datetime = datetime.now().strftime("%d-%m-%Y T%H:%M:%SZ")
    past_datetime = (datetime.now() - timedelta(hours = 4)).strftime("%d-%m-%Y T%H:%M:%SZ")

    print(past_datetime)
    print(current_datetime)

    locations = cpcb_config.locations
    for loc in locations:
        job_template = copy.deepcopy(cpcb_config.job_template)
        job_template["last_run"] = str(datetime.now())
        job_template['stages'][0]["data"]["from_date"] = past_datetime
        job_template['stages'][0]["data"]["to_date"] = current_datetime
        job_template['stages'][0]["data"]["state"] = loc["state"]
        job_template['stages'][0]["data"]["city"] = loc["city"]
        job_template['stages'][0]["data"]["station"] = loc["station"]
        job_template['stages'][0]["data"]["locationIRI"] = loc["locationIRI"]
        jobs.insert(job_template)




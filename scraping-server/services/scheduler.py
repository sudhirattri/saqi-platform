
from datetime import datetime
from django.http import HttpResponse
from django.conf import settings
from tinydb import TinyDB, Query
from . import cpcb
from . import ezio
from . import localdb
import json

import os
import requests

def add_job(request):
    try:
        data = []
        # data.append(cpcb.add_job())
        data.append(ezio.add_job())
        response = {
            'status' : "Success .. OK",
            'exceptions' : None,
            'data' : data
        }
        return HttpResponse(json.dumps(response), content_type="application/json")
    except Exception as e:
        response = {
            'status' : "Failed .. F",
            'exceptions' : e
        }
        return HttpResponse(json.dumps(response), content_type="application/json")
    finally:
        pass

def do_cron_job():
    print("ran cron job")

def run_pending_jobs(request):
    db = localdb.getdb()
    jobs = db.table('jobs')
    Job = Query()
    # pending_jobs = jobs.search(Job.status == 'A' or Job.status == 'I')
    pending_jobs = jobs.search(Job.status == 'I') + jobs.search(Job.status == 'A')
    num_jobs = len(pending_jobs)
    # return HttpResponse(json.dumps(pending_jobs))
    try:
        data = []
        for job in pending_jobs:
            if(job["system"]=='cpcb'):
                data.append(cpcb.run_job(job))
            elif(job["system"]=='eziostat'):
                data.append(ezio.run_job(job))

        response = {
            'status' : "Success .. OK",
            'comment' : "ran pending jobs",
            'num_jobs':num_jobs,
            'exceptions' : None,
            'data' : data
        }
        return HttpResponse(json.dumps(response), content_type="application/json")
    except Exception as e:
        response = {
            'status' : "Failed .. F",
            'exceptions' : e
        }
        return HttpResponse(json.dumps(response), content_type="application/json")
    finally:
        pass

def upload(request):

    env = ''
    if("env" in request.GET):
        if(request.GET["env"]=='PROD'):
            env = 'PROD'
        else:
            env = 'DEV'
    # print("PROD env:",settings.PROD)
    if(env=='PROD'):
        rdf_store_url = 'https://saqi-rdfstore.herokuapp.com/aq-store/data?default'
    else:
        rdf_store_url = 'http://localhost:3030/aq-store/data?default'
    
    turtles_dir = os.path.join(os.path.dirname(__file__), './../data/turtle')
    turtle_files = os.listdir(turtles_dir)

    for file in turtle_files:
        full_path = turtles_dir+'/'+file

        with open(full_path) as f:
            turtle_data=f.read()
            headers = {
            "Content-Type": "text/turtle;charset=utf-8"
            }
            print("Sending turtle payload")
            response = requests.request("POST",rdf_store_url,headers=headers, data=turtle_data)
            response_json = json.loads(response.text)
            print(response.text)
            if(response_json is not None and response_json["count"]>0):
                print("uploaded file: "+file)
            else:
                raise Exception("Non zero triples uploaded to graph")

    upload_response = {
        "ran_at":str(datetime.now()),
        "turtle_files": turtle_files,
        "edf_env": env
    }
    return HttpResponse(json.dumps(upload_response), content_type="application/json")


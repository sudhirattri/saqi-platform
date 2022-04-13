
from datetime import datetime
from django.http import HttpResponse
from tinydb import TinyDB, Query
from . import cpcb
from . import ezio
from . import localdb
import json

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



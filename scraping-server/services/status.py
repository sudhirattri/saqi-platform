
from django.http import HttpResponse
from . import localdb
import json
from tinydb import TinyDB, Query

def get_status(request):
    db = localdb.getdb()
    jobs = db.table('jobs')
    Job = Query()
    pending_jobs = jobs.search(Job.status == 'I') + jobs.search(Job.status == 'A')
    completed_jobs = jobs.search(Job.status == 'S')
    response = {
        'instructions': "api/add to add jobs and api/run to run pending jobs",
        'status_api' : "API working .. OK",
        'status_triple_store' : "Triple Store working .. OK",
        'pending_jobs' : pending_jobs,
        'completed_jobs' : completed_jobs
    }
    return HttpResponse(json.dumps(response), content_type="application/json")

from datetime import datetime
from django.http import HttpResponse
from tinydb import TinyDB, Query
from . import cpcb
from . import localdb

def add_job(request):
    cpcb.add_job()    
    return HttpResponse("added jobs")

def do_cron_job():
    print("ran cron job")

def run_pending_jobs(request):
    db = localdb.getdb()
    jobs = db.table('jobs')
    Job = Query()
    pending_jobs = jobs.search(Job.status == 'A' or Job.status == 'I')
    for job in pending_jobs:
        if(job["system"]=='cpcb'):
            cpcb.run_job(job)

    return HttpResponse("ran all crons")

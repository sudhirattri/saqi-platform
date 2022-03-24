
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
    pending_jobs = jobs.search(Job.status == 'A' and Job.status == 'I')
    print(pending_jobs)
    for job in pending_jobs:
        if(job["system"]=='cpcb'):
            cpcb.run_job(job)
    print("Ran all crons")
    return HttpResponse("ran all crons")

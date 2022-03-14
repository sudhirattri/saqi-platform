# from django.db import models
# from datetime import datetime

# # Stage status - A : added, I : incomplete, S : success, F : fail
# class Job(models.Model):
#     current_stage = models.IntegerField()
#     last_run = models.DateField()
#     status = models.CharField(max_length=1,default='A')
#     name = models.CharField(max_length=100,default='Empty Stage')
#     system = models.CharField(max_length=100,default='Empty System')

# class Stage(models.Model):
#     parent_job = models.ForeignKey(Job, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100,default='Empty Stage')
#     comment = models.CharField(max_length=100,default='Not Started')
#     retries_left = models.IntegerField(default=1)
#     data = models.JSONField()

# def test_db():
#     # print("test")
#     j1 = Job(current_stage=1, last_run=datetime.now(),name="Test Job",system="Test System")
#     s1 = Stage(parent_job=j1,name="preprocess",comment="na",retries_left=2,data={'str': 'string','list':[1,2,3,4]})
#     s2 = Stage(parent_job=j1,name="preprocess",comment="na",retries_left=2,data={'str': 'string','list':[2,3,5,1]})
#     s3 = Stage(parent_job=j1,name="preprocess",comment="na",retries_left=2,data={'str': 'string','list':[5,2,1,4]})

#     print(Job.objects)

from tinydb import TinyDB, Query
from django.http import HttpResponse
from datetime import datetime
import json
from . import cpcb
# Stage status - A : added, I : incomplete, S : success, F : fail
DB_PATH = 'scraping-server/db.json'

db = None
def getdb():
    global db
    if(db is None):
        db = TinyDB(DB_PATH)
    return db

def init_db():
    db = getdb()
    db.drop_tables()
    db.truncate()

def main():
    # init_db()
    pass

def test_db(request):
    init_db()
    db = getdb()
    jobs = db.table('jobs')
    jobs.insert({
        "status":"A",
        "last_run":str(datetime.now()),
        "name" : "test job",
        "system" : "test_system",
        "stages" : [
            {
                "name" : "preprocess",
                "comment" : "na",
                "retries_left" : 2,
                "data" : {
                    'str': 'string',
                    'list':[1,2,3,4]
                }
            },
            {
                "name" : "mapping",
                "comment" : "na",
                "retries_left" : 2,
                "data" : {
                    'str': 'string',
                    'list':[2,3,5,1]
                }
            },
            {
                "name" : "upload",
                "comment" : "na",
                "retries_left" : 2,
                "data" : {
                    'str': 'string',
                    'list':[5,2,1,4]
                }
            },
        ]
    })

    Job = Query()
    pending_jobs = jobs.search(Job.status == 'A' or Job.status == 'I')
    j1 = pending_jobs[0]
    print(j1.doc_id)
    print([method_name for method_name in dir(j1) if callable(getattr(j1, method_name))])

    j1['stages'][0]['data']['list'].append(876)
    print(j1['stages'][0]['data']['list'])

    jobs.update({"stages":j1['stages']},doc_ids=[j1.doc_id])
    # print(j1.stages[0].data)
    # print(j1.stages[0].data.list)
    # print(j1.stages[0].data.list[0])

    return HttpResponse(pending_jobs)

main()
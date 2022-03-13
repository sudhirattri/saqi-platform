locations = [
    {
        "state": "Delhi",
        "city": "Delhi",
        "station": "site_1428",
        "locationIRI": "Narela"
    }
]

request_template={}

job_template = {
    "status":"A",
    "last_run": '',
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
                "from_date" : '',
                "to_date" : '',
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
}
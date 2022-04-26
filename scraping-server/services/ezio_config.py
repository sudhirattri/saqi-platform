locations = [
    {
        "name": "Sanjay Colony",
        "mac_id": "84:cc:a8:36:b1:04",
        "locationIRI": "Sanjay_Colony"
    },
    # {
    #     "name": "Jharoda Kalan",
    #     "mac_id": "84:cc:a8:36:b0:e4",
    #     "locationIRI": "Jharoda_Kalan"
    # }
]
# GET https://firestore.googleapis.com/v1/projects/eziostat/databases/(default)/documents/devices/84:cc:a8:36:b1:04/data HTTP/1.1
# Content-Type: application/json
# Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU3VkaGlyIEF0dHJpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnaUhPWjUyLVpOMzJmX0FIQzJ2SE1ZeHQwSjNGQUE2V1FHakthdWFnPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V6aW9zdGF0IiwiYXVkIjoiZXppb3N0YXQiLCJhdXRoX3RpbWUiOjE2NDY0ODIwNDEsInVzZXJfaWQiOiI3d21ITEtDUXh1aFdVbEd1dUpFSXVBNjFSaGcxIiwic3ViIjoiN3dtSExLQ1F4dWhXVWxHdXVKRUl1QTYxUmhnMSIsImlhdCI6MTY1MDg4NzQ5MSwiZXhwIjoxNjUwODkxMDkxLCJlbWFpbCI6InN1ZGhpcjE4MjY3QGlpaXRkLmFjLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTY4MTUzNzc4NTA1OTQ5NDYyMDgiXSwiZW1haWwiOlsic3VkaGlyMTgyNjdAaWlpdGQuYWMuaW4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.O22COXVlNxOrZouxp8IWl6xJqnurZsHDma0J_1u0mp6zLRqMp_mFJSDAN-w4I31_buUPvaC587h8c227FIYsjLmn5cRl5pv4lruyiTntsyqrnhgpFlRrYtwSWWNDWYqz4wQnyQOHeiRZrkbUTATpuyVQ0ntLDMCmPw-zubeT-iszSts2S693lxrL_LujohQNuZMtLk4b3ilYjJU1HZR_PywMjXOYNqbdoNdwMiWbCFRRjUTS7PNwHUMBjDzwpQ2nkTEnqIPU9_vdIbgKNV7Dw61O91OO_GmyzL9qj7IU-Q6Dnp7zqXm8rBTOoQSQV7h3FxEFcYV5OnJZMof6pZGYMg
request_template={
    
}

csv_header = [
    "temp",
    "pm1_0",
    "humid",
    "pm2_5",
    "pm10",
    "ps",
    "rtc",
]

example_request = ""

job_template = {
    "status":"A",
    "last_run": '',
    "name" : "test job",
    "system" : "eziostat",
    "current_stage" : 0,
    "unique_id" : "null",
    "stages" : [
        {
            "name" : "acquisition",
            "comment" : "na",
            "retries_left" : 5,
            "data": {
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
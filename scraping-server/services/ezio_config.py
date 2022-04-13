locations = [
    {
        "state": "Delhi",
        "city": "Delhi",
        "station": "site_1428",
        "locationIRI": "Okhla"
    }
]

request_template={
    "draw": 1,
    "columns": [
        {
            "data": 0,
            "name": "",
            "searchable": True,
            "orderable": False,
            "search": { 
                "value": "",
                "regex": False
            }
        }
    ],
    "order": [],
    "start": 0,
    "length": 30,
    "search": {
        "value": "",
        "regex": False
    },
    "filtersToApply": {
        "state": "Delhi",
        "city": "Delhi",
        "station": "site_1428",
        "parameter_list": [
            {
                "id": 0,
                "itemName": "PM2.5",
                "itemValue": "parameter_193"
            },
            {
                "id": 1,
                "itemName": "PM10",
                "itemValue": "parameter_215"
            },
            {
                "id": 2,
                "itemName": "NO",
                "itemValue": "parameter_226"
            },
            {
                "id": 3,
                "itemName": "NO2",
                "itemValue": "parameter_194"
            }, 
            {
                "id": 4,
                "itemName": "NOx",
                "itemValue": "parameter_225"
            }, 
            {
                "id": 5,
                "itemName": "NH3",
                "itemValue": "parameter_311"
            }, 
            {
                "id": 6,
                "itemName": "SO2",
                "itemValue": "parameter_312"
            }, 
            {
                "id": 7,
                "itemName": "CO",
                "itemValue": "parameter_203"
            }, 
            {
                "id": 8,
                "itemName": "Ozone",
                "itemValue": "parameter_222"
            }, 
            {
                "id": 9,
                "itemName": "Benzene",
                "itemValue": "parameter_202"
            }, 
            {
                "id": 10,
                "itemName": "Toluene",
                "itemValue": "parameter_232"
            }, 
            {
                "id": 12,
                "itemName": "Temp",
                "itemValue": "parameter_198"
            }, 
            {
                "id": 13,
                "itemName": "RH",
                "itemValue": "parameter_235"
            }, 
            {
                "id": 14,
                "itemName": "WS",
                "itemValue": "parameter_233"
            }, 
            {
                "id": 15,
                "itemName": "WD",
                "itemValue": "parameter_234"
            }, 
            {
                "id": 16,
                "itemName": "SR",
                "itemValue": "parameter_237"
            },
            {
                "id": 17,
                "itemName": "BP",
                "itemValue": "parameter_238"
            },
        ],
        "criteria": "15 Minute",
        "reportFormat": "Tabular",
        "fromDate": "23-03-2022 T18:00:00Z",
        "toDate": "23-03-2022 T23:40:59Z",
        "parameter": [
            "parameter_193",
            "parameter_215",
            "parameter_226",
            "parameter_194", 
            "parameter_225",
            "parameter_311",
            "parameter_312",
            "parameter_203",
            "parameter_222",
            "parameter_202",
            "parameter_232",
            "parameter_198",
            "parameter_235",
            "parameter_233",
            "parameter_234",
            "parameter_237",
            "parameter_238",
        ],
        "parameterNames": [
            "PM2.5",
            "PM10",
            "NO",
            "NO2",
            "NOx",
            "NH3",
            "SO2",
            "CO",
            "Ozone",
            "Benzene",
            "Toluene",
            "Temp",
            "RH",
            "WS",
            "WD",
            "SR",
            "BP",
        ]
    },
    "pagination": 1
}

job_template = {
    "status":"A",
    "last_run": '',
    "name" : "test job",
    "system" : "cpcb",
    "current_stage" : 0,
    "unique_id" : "null",
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

csv_header = [
    "From Date"
    "To Date"
    "PM2.5 (ug/m3)"
    "PM10 (ug/m3)"
    "NO (ug/m3)"
    "NO2 (ug/m3)"
    "NOx (ppb)"
    "NH3 (ug/m3)"
    "SO2 (ug/m3)"
    "CO (mg/m3)"
    "Ozone (ug/m3)"
    "Benzene (ug/m3)"
    "Toluene (ug/m3)"
    "Temp (degree C)"
    "RH (%)"
    "WS (m/s)"
    "WD (degree)"
    "SR (W/mt2)"
    "BP (mmHg)"
]
locations = [
    {
        "state": "Delhi",
        "city": "Delhi",
        "station": "site_1428",
        "locationIRI": "Narela"
    }
]

request_template = {
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
    "length": 10,
    "search": {
        "value": "",
        "regex": "false"
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
            }
        ],
        "criteria": "15 Minute",
        "reportFormat": "Tabular",
        "fromDate": "11-03-2022 T00:00:00Z",
        "toDate": "12-03-2022 T17:21:59Z",
        "parameter": [
            "parameter_193",
            "parameter_215"
        ],
        "parameterNames": [
            "PM2.5",
            "PM10"
        ]
    },
    "pagination": 1
}
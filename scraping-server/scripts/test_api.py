
import requests
import json
from django.http import HttpResponse

response = requests.get("http://api.open-notify.org/astros.json")
print(response)

def test_cpcb(request):
    url = "https://app.cpcbccr.com/caaqms/fetch_table_data"
    payload = "bG9jYXRpb25zID0gWwogICAgewogICAgICAgICJzdGF0ZSI6ICJEZWxoaSIsCiAgICAgICAgImNpdHkiOiAiRGVsaGkiLAogICAgICAgICJzdGF0aW9uIjogInNpdGVfMTQyOCIsCiAgICAgICAgImxvY2F0aW9uSVJJIjogIk5hcmVsYSIKICAgIH0KXQoKcmVxdWVzdF90ZW1wbGF0ZSA9IHsKICAgICJkcmF3IjogMSwKICAgICJjb2x1bW5zIjogWwogICAgICAgIHsKICAgICAgICAgICAgImRhdGEiOiAwLAogICAgICAgICAgICAibmFtZSI6ICIiLAogICAgICAgICAgICAic2VhcmNoYWJsZSI6ICJ0cnVlIiwKICAgICAgICAgICAgIm9yZGVyYWJsZSI6ICJmYWxzZSIsCiAgICAgICAgICAgICJzZWFyY2giOiB7CiAgICAgICAgICAgICAgICAidmFsdWUiOiAiIiwKICAgICAgICAgICAgICAgICJyZWdleCI6ICJmYWxzZSIKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIF0sCiAgICAib3JkZXIiOiBbXSwKICAgICJzdGFydCI6IDAsCiAgICAibGVuZ3RoIjogMTAsCiAgICAic2VhcmNoIjogewogICAgICAgICJ2YWx1ZSI6ICIiLAogICAgICAgICJyZWdleCI6ICJmYWxzZSIKICAgIH0sCiAgICAiZmlsdGVyc1RvQXBwbHkiOiB7CiAgICAgICAgInN0YXRlIjogIkRlbGhpIiwKICAgICAgICAiY2l0eSI6ICJEZWxoaSIsCiAgICAgICAgInN0YXRpb24iOiAic2l0ZV8xNDI4IiwKICAgICAgICAicGFyYW1ldGVyX2xpc3QiOiBbCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJpZCI6IDAsCiAgICAgICAgICAgICAgICAiaXRlbU5hbWUiOiAiUE0yLjUiLAogICAgICAgICAgICAgICAgIml0ZW1WYWx1ZSI6ICJwYXJhbWV0ZXJfMTkzIgogICAgICAgICAgICB9LAogICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAiaWQiOiAxLAogICAgICAgICAgICAgICAgIml0ZW1OYW1lIjogIlBNMTAiLAogICAgICAgICAgICAgICAgIml0ZW1WYWx1ZSI6ICJwYXJhbWV0ZXJfMjE1IgogICAgICAgICAgICB9CiAgICAgICAgXSwKICAgICAgICAiY3JpdGVyaWEiOiAiMTUgTWludXRlIiwKICAgICAgICAicmVwb3J0Rm9ybWF0IjogIlRhYnVsYXIiLAogICAgICAgICJmcm9tRGF0ZSI6ICIxMS0wMy0yMDIyIFQwMDowMDowMFoiLAogICAgICAgICJ0b0RhdGUiOiAiMTItMDMtMjAyMiBUMTc6MjE6NTlaIiwKICAgICAgICAicGFyYW1ldGVyIjogWwogICAgICAgICAgICAicGFyYW1ldGVyXzE5MyIsCiAgICAgICAgICAgICJwYXJhbWV0ZXJfMjE1IgogICAgICAgIF0sCiAgICAgICAgInBhcmFtZXRlck5hbWVzIjogWwogICAgICAgICAgICAiUE0yLjUiLAogICAgICAgICAgICAiUE0xMCIKICAgICAgICBdCiAgICB9LAogICAgInBhZ2luYXRpb24iOiAxCn0="
    headers = {
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
    'accept': 'application/json, text/plain, */*',
    'content-type': 'text/plain',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    'sec-ch-ua-platform': '"Windows"',
    'origin': 'https://app.cpcbccr.com',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://app.cpcbccr.com/ccr/',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,hi;q=0.8'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
    return HttpResponse(response.text)
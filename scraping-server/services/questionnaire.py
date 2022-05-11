import os
import subprocess
import requests
import json

PRODUCTION_READY = True
csv_filename = "okhla_questionnaire_data_map"
csv_file_path = "C:\\Users\\saadf\\Documents\\GitHub\\saqi-platform\\scraping-server\\data\\csv\\okhla_questionnaire_data_map.csv"
print(csv_file_path)

mapping_file = os.path.join(os.path.dirname(__file__), './../mappings/questionnaire.rml.ttl')
mapping_text = ''
with open(mapping_file) as f:
    mapping_text=f.read().replace('_locname', "Okhla")
    mapping_text=mapping_text.replace('_filename', csv_file_path)

copy_map_file = os.path.abspath(os.path.join(os.path.dirname(__file__), './../mappings/'+csv_filename+'.rml.ttl'))
with open(copy_map_file, "w") as f:
    f.write(mapping_text)

rml_mapper_jar = os.path.join(os.path.dirname(__file__), './../mappings/rmlmapper-4.15.0-r361-all.jar')

rdf_file_name = os.path.abspath(os.path.join(os.path.dirname(__file__), './../data/turtle/'+ csv_filename +'.turtle'))

process_command = 'java -jar '+rml_mapper_jar+' -s turtle -m "'+copy_map_file + '" -o "' + rdf_file_name + '"'

#java -jar /mnt/e/btp/saqi-platform/scraping-server/services/./../mappings/rmlmapper-5.0.0-r362-all.jar -s turtle -m "/mnt/e/btp/saqi-platform/scraping-server/services/./../mappings/cpcb.rml.ttl" -o "/mnt/e/btp/saqi-platform/scraping-server/services/./../data/turtle/1648060200_Okhla.csv.turtle"
print("Running java process")
print(process_command)

# process = subprocess.run(process_command,capture_output=True,shell=True)

rdf_store_url = os.environ.get('RDF_STORE_URL')

if(PRODUCTION_READY):
    rdf_store_url = 'https://saqi-rdfstore.herokuapp.com/aq-store/data?default'
else:
    rdf_store_url = 'http://localhost:3030/aq-store/data?default'

turtle_file = rdf_file_name
with open(turtle_file) as f:
    turtle_data=f.read()
    headers = {
    "Content-Type": "text/turtle;charset=utf-8"
    }
    print("Sending turtle payload")
    response = requests.request("POST",rdf_store_url,headers=headers, data=turtle_data.encode('utf-8'))
    print(response)
    response_json = json.loads(response.text)
    print(response.text)
    if(response_json is not None and response_json["count"]>0):
        print("Job Successful", response_json)
    else:
        raise Exception("Non zero triples uploaded to graph")

import os
import pathlib
import subprocess
import shutil
import requests
import json

base_dir = pathlib.Path(__file__).parent.resolve()
mapping_dir = base_dir / "mappings"

def create_temp_dir():
    temp_dir = base_dir / "tmp"
    if temp_dir.is_dir():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir(parents=True, exist_ok=True)
    return temp_dir

def upload_static_rdf_data():
    static_turtle_path = base_dir / "static_turtle"

    turtle_files = [file for file in os.listdir(static_turtle_path)]
    for file in sensor_csv_files:
        rdf_store_url = 'http://localhost:3030/aq-store/data?default'
        turtle_path = static_turtle_path / file
        with open(turtle_path) as f:
            turtle_data=f.read()
            headers = {
            "Content-Type": "text/turtle;charset=utf-8"
            }
            print("Sending turtle payload")
            response = requests.request("POST",rdf_store_url,headers=headers, data=turtle_data)
            response_json = json.loads(response.text)
            print("Response from RDF store",response.text)
            if(response_json is not None and response_json["count"]>0):
                print("Upload to RDF store is successful, Triples uploaded :",response_json["count"])
            else:
                raise Exception("Zero triples uploaded to graph")

def upload_saqi_sensors_data():
    temp_dir = create_temp_dir()
    sensor_data_path = base_dir / "sensor_data"
    sensor_csv_files = [os.path.splitext(file)[0] for file in os.listdir(sensor_data_path)]

    eziostat_map_file = mapping_dir / "eziostat.rml"

    for file in sensor_csv_files:
        original_file_path = sensor_data_path / f"{file}.csv"
        copied_file_path = temp_dir / f"{file}.csv"
        cmd = subprocess.Popen(["cp","-f",original_file_path,copied_file_path], stdout=subprocess.PIPE)
        print(cmd.communicate()[0])
        
        with open(eziostat_map_file) as f:
            mapping_text=f.read().replace('_locname',file)
            mapping_text=mapping_text.replace('_filename',str(copied_file_path))

        copied_map_file = temp_dir / f"map_{file}.rml"

        with open(copied_map_file, "w") as f:
            f.write(mapping_text)

        rdf_output_path = temp_dir/ f"map_{file}.turtle"

        print("Starting RML mapper for mapping :",copied_map_file,copied_file_path)
        java_mapper_path = base_dir / "rmlmapper-4.15.0-r361-all.jar"
        cmd = subprocess.Popen(["java","-jar",java_mapper_path,"-s","turtle","-m",copied_map_file,"-o",rdf_output_path], stdout=subprocess.PIPE)
        print(cmd.communicate()[0])

        print("RML Mapper completed :",copied_map_file,copied_file_path)


        rdf_store_url = 'http://localhost:3030/aq-store/data?default'

        with open(rdf_output_path) as f:
            turtle_data=f.read()
            headers = {
            "Content-Type": "text/turtle;charset=utf-8"
            }
            print("Sending turtle payload")
            response = requests.request("POST",rdf_store_url,headers=headers, data=turtle_data)
            response_json = json.loads(response.text)
            print("Response from RDF store",response.text)
            if(response_json is not None and response_json["count"]>0):
                print("Upload to RDF store is successful, Triples uploaded :",response_json["count"])
            else:
                raise Exception("Zero triples uploaded to graph")



create_temp_dir()
# upload_saqi_sensors_data()

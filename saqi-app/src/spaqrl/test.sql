PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?pm10conc ?time ?placeName WHERE {
  ?pm a saqi:ParticulateMatter;
  saqi:particulateMatter10Concentration ?pm10conc .
  ?pm saqi:hasObservation ?obs .
  ?obs saqi:atTime ?time ;
  saqi:atPlace ?place .
  ?place saqi:hasName ?placeName .
} LIMIT 1000

PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT (AVG(?pm10conc) AS ?pm_10) ?placeName WHERE {
  ?pm a saqi:ParticulateMatter;
  saqi:particulateMatter10Concentration ?pm10conc .
  ?pm saqi:hasObservation ?obs .
  ?obs saqi:atTime ?time ;
  saqi:atPlace ?place .
  ?place saqi:hasName ?placeName .
} 
GROUP BY ?placeName
LIMIT 1000

DELETE WHERE { 
     ?sub ?pred ?type .
}


PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?obs ?obj ?time ?place WHERE {
  ?obs a aq:Observation;
  aq:atTime ?time ;
  aq:atPlace ?place .
} LIMIT 1000
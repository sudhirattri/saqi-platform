### How to map
- Convert to rml
```
yarrrml-parser -i cpcb.yml -o cpcb.rml.ttl
yarrrml-parser -i ezio.yml -o ezio.rml.ttl
```
- Call java jar to map
```
java -jar rmlmapper.jar -m cpcb.rml.ttl
```
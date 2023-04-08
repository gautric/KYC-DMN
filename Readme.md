# KYC DMN engine

## KYC Engine runtime 

### DMN Design

[KYC DMN model](https://sandbox.kie.org/?file=https://github.com/gautric/KYC-DMN/blob/master/engine/src/main/resources/KYC.dmn#/f5f3272a-f629-4f44-9d6c-f41a077e5d41/file/KYC.dmn)

### KYC Engine Compilation & Execution

```
cd engine
mvn compile quarkus:dev
```

## KYC Web Application Compilation & Execution

```
cd webapp
npm run start:dev
```



## Test KYC Kogito API


    curl 'http://localhost:8080/KYC/dmnresult' -X POST  -H 'Accept: application/json'  -H 'Content-Type: application/json'   --data-raw '{"PEP":true,"Amount":1000,"Fiscal Residency":"FR"}' | jq

```
{
  "namespace": "urn://kyc.g.a.net/api/2022",
  "modelName": "KYC",
  "dmnContext": {
    "Amount Rule": "LOW",
    "Level to Int": "function Level to Int( Level )",
    "Max Level": "function Max Level( list of Level )",
    "KYC": {
      "Score": "HIGH",
      "Level": 75
    },
    "Fiscal Residency Rule": "LOW",
    "Amount": 1000,
    "Int to Level": "function Int to Level( Int )",
    "PEP Rule": "HIGH",
    "PEP": true,
    "Fiscal Residency": "FR",
    "Level to Score": "function Level to Score( Level )"
  },
  "messages": [
    {
      "severity": "INFO",
      "message": "ID : kyc_api_2022_impl_v1_2",
      "messageType": null,
      "sourceId": null,
      "level": "INFO"
    },
    {
      "severity": "INFO",
      "message": "Name : KYC",
      "messageType": null,
      "sourceId": null,
      "level": "INFO"
    },
    {
      "severity": "INFO",
      "message": "NS : urn://kyc.g.a.net/api/2022",
      "messageType": null,
      "sourceId": null,
      "level": "INFO"
    },
    {
      "severity": "INFO",
      "message": "Description : KYC for FIS domain",
      "messageType": null,
      "sourceId": null,
      "level": "INFO"
    }
  ],
  "decisionResults": [
    {
      "decisionId": "_4054431E-93D3-40E5-ACEF-8F4D6DA45B5A",
      "decisionName": "PEP Rule",
      "result": "HIGH",
      "messages": [],
      "evaluationStatus": "SUCCEEDED"
    },
    {
      "decisionId": "_B4A96E7B-9A87-470C-9868-391085BA0409",
      "decisionName": "Fiscal Residency Rule",
      "result": "LOW",
      "messages": [],
      "evaluationStatus": "SUCCEEDED"
    },
    {
      "decisionId": "_58ECD9FC-1269-446F-8792-D8DD0139D7DD",
      "decisionName": "KYC",
      "result": {
        "Score": "HIGH",
        "Level": 75
      },
      "messages": [],
      "evaluationStatus": "SUCCEEDED"
    },
    {
      "decisionId": "_177F55D1-B87A-4C26-A277-BD73C84725D1",
      "decisionName": "Amount Rule",
      "result": "LOW",
      "messages": [],
      "evaluationStatus": "SUCCEEDED"
    }
  ]
}
```


    curl 'http://localhost:8080/KYC' -X POST  -H 'Accept: application/json'  -H 'Content-Type: application/json'   --data-raw '{"PEP":true,"Amount":1000,"Fiscal Residency":"FR"}' | jq

```
{
  "Amount Rule": "LOW",
  "Level to Int": "function Level to Int( Level )",
  "Max Level": "function Max Level( list of Level )",
  "KYC": {
    "Score": "HIGH",
    "Level": 75
  },
  "Fiscal Residency Rule": "LOW",
  "Amount": 1000,
  "Int to Level": "function Int to Level( Int )",
  "PEP Rule": "HIGH",
  "PEP": true,
  "Fiscal Residency": "FR",
  "Level to Score": "function Level to Score( Level )"
}
```

## Docker Build

### KYC Engine Image Build

```
cd engine
mvn clean package -Dmaven.test.skip=true -Dquarkus.package.type=uber-jar 
docker build -f src/main/docker/Dockerfile.jvm -t kyc-engine .
```

### KYC Web Application Image Build

```
cd webapp
docker build -f Dockerfile -t kyc-webapp .
```

### Docker Compose Run

```
cd docker
docker-compose up 
```
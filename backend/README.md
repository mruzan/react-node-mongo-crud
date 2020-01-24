# **API Document**


#### **List all the schools with search & filter options**
  ~~~~
Method : POST

Endpoint: /v1/school/get

request params

`{
 	"search":"test",
 	"filters":{
 		"status":"active",
 		"school": "school name 002"
 	},
 	"limit": 10,
 	"offset":0
 }`
 
 `
 {
     "statusCode": 200,
     "message": "success",
     "data": {
         "schools": [
             {
                 "name": "school name 002",
                 "street": "test street name 002",
                 "suburb": "test suburb 002",
                 "postcode": "testP 002",
                 "state": "canifornia 002",
                 "studentCount": 1400,
                 "status": "active",
                 "_id": "5e2855de44860e48a89a4e3f",
                 "createdAt": "2020-01-22T14:02:06.506Z",
                 "updatedAt": "2020-01-22T14:02:06.506Z",
                 "__v": 0
             }
         ],
         "total": 3
     },
     "error": null,
     "errorMessage": null
 }
 `
 
  ~~~~
 #### **Add school**
   ~~~~
 Method : POST
 
 Endpoint: /v1/school
 
 request params
 
 `
 {
 	"name": "test school 003",
 	"studentCount": 1700,
 	"street": "test street name 003",
 	"suburb": "test suburb 003",
 	"postcode": "testP 003",
 	"state": "test state 003"
 }
 `
  
  `
  {
      "statusCode": 200,
      "message": "success",
      "data": {
          "name": "test school 003",
          "street": "test street name 003",
          "suburb": "test suburb 003",
          "postcode": "testP 003",
          "state": "test state 003",
          "studentCount": 1700,
          "_id": "5e2855ec44860e48a89a4e40",
          "createdAt": "2020-01-22T14:02:20.777Z",
          "updatedAt": "2020-01-22T14:02:20.777Z",
          "__v": 0
      },
      "error": null,
      "errorMessage": null
  }
  `
  
  ~~~~
## **To run the project**
 ~~~~
To install dependencies and start the app
========================================
npm install && npm start
It will start the server with port 8001 


Run the seeders
========================================
node seeders/schoolSeeder.js
 
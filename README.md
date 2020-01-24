# NodeJs, ReactJs and mongodb crud application

school crud application using NodeJs, ReactJs and Mongodb with docker compose.

To start the project with single command. Here what you need to start the project,

Steps :- 

1). clone the project and go to the project folder <br>
2). run "./start.sh" without quotes.<br>
3).open the browser with http://localhost:8000<br>

## What will happens behind the scene
1). It will stop & remove all the docker containers.<br>
2). It will start the mongo docker container and create new database with name "school.<br>
3). Run the seeders for initial values for "school" collection.<br>
4). Start the backend docker container and install dependencies & start express project with port 8001 and expose port 8001 for outside.<br>
5). Start the frontend docker containt and install dependencies & start the react project with port 3000 and expose port 8000 for outside.<br>

### Please be causion it will stop all your local docker containers. If you wish not to stop, please edit the start.sh file in the root and remove first 4 lines.

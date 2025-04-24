### How to run the Web application::
Download the Server-part4 folder and open it in Visual Studio Code (VSCode).

this folder contains the server code for the Web application, which is also adjusted to work with the TCP server.


navigate to the "Server-part4" folder
create "config" folder
create a file named ".env.local" under the config folder and fill it with:

```
CONNECTION_STRING="mongodb://localhost:27017"
PORT=12345
```

open MongoDBCompass and connect to "mongodb://localhost:27017"
under the "test" DB imoprt the json files from the 'dataForServer' folder import users.json to users and videos.json to videos.

after downloading the server you need to run this code: "npm i" then "npm start" - and it needs to look like this:

![alt text](<Screenshot 2024-10-08 210317.png>)


now you can open your browser on http://localhost:12345/ and see the website


Now, download the TCP.cpp file and put it in WSL (Windows Subsystem for Linux) in VSCode. Compile it using the following command:

```sh
g++ -std=c++17 -o tcp TCP.cpp
```
Then, run the TCP server using this command:

```sh
./tcp
```

like this:

![alt text](<Screenshot 2024-10-08 205933.png>)



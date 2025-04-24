# YouTube Server

## Introduction

Welcome to Our YouTube server repo, this server is made for our React and Android Facebook apps that we developed during the Advanced Programming course in BIU.

This is the Repository for the React code which includes both part 1 and part 2: 

https://github.com/TomU2611/YouTube-Web.git

This it the repository for Jira:

https://marksheinberg01.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?epics=visible&issueParent=10000%2C10001


## How to Run The Server? 

first navigate to the "Server" folder
create a file named ".env.local" under the config folder and fill it with:

```
CONNECTION_STRING="mongodb://localhost:27017"
PORT=12345
```

then:
run npm i
run npm start

open MongoDBCompass and connect to "mongodb://localhost:27017"

under the "test" DB imoprt the json files from the 'dataForServer' folder 
import users.json to users and videos.json to videos.

now you can open your browser on http://localhost:12345/ and enjoy our site!

## A few notes

- there's a toolbar that opens from the top left which has many of the features, so make sure not to miss it!

- the display name in the watching video page is clickable!

- some of the pages have a bit of a problem with their css so play a bit with the zoom so it'll look ok.

Written by:

Tom Uklein

Itay Zahor

Mark Sheinberg








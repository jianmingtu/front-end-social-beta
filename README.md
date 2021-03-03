Full Stack JS and Serverless Project - Team 8

---
* [Fatma](https://github.com/fatmabadri)
* [Jianming](Please Add Your Github link)
* [Wayne](Please Add Your Github link)

### App Description

TeamUp App is ....... for ....... Users -- predominantly people who like ........... but are looking for more engagement/suggestions -- can sign up, post ratings and find activities from an ever-growing list. Basic functionality will support ratings, with written reviews being a stretch goal.

### Installation Instructions

The app can be run locally on your machine to test functionality and changes before they are deployed. 

### Frontend-specific
- clone this repository
```https://github.com/BCIT-SSD-2020-21/front-end-social-alpha``` 
- install necessary packages
```npm install```
- run React app
```npm start```

### Backend-specific
Please refer to the [backend repository](https://github.com/BCIT-SSD-2020-21/server-side-code-social-alpha) for instructions on how to work with the backend. Once the backend is running in Visual Studio, the frontend will be able to receive data from it. Optionally, the backend can be deployed to Azure and the frontend via Netlify. 


### Requirements


#### Functional


##### Backend

-   DyanmoDB +  Lambda function + EndPoints
-   Cognito for signup and login email confirmation
-   CRUD capability 
-   Database design : 
    - tables 
        - User: (username/email/password)
        - Post: (description, the user)
        - Comments: (description, the user, the post)

##### Frontend

-   Authentication (login, sign up etc.)
-   Create messages / posting (login required) with media sharing (????? how to create a sharing for video or image file) and upload
-   Messages (???) / postings (list and detail pages)
-   Commenting on messages / postings
-   Following users and/or messages / postings  ( click on the posted message to open a user page to follow the user)
-   Liking system

#### Non-functional


##### Backend

-   Hashed password for signup and login 
-   JWT Token for each communication except login/sign 
    - Tables 
        - User: (the follow users)
        - Post: (image or image link, totalLikes, timestamp)
        - Comments: (timestamp)

##### Frontend

### Feature list

#### Must have

-   heading bar showing a Home page link, a follower link,  a new post plus button, the logged icon and a drop-down for login/signup/profile  
-   home page : all posts with an image, total likes, and also enable to post a new if login 
-   detail page: write comment, and a like; edit/Delete post 
-   selecting on the follow link/button on the heading will show followers, and then their posts

#### Nice to have

-   Show a person/company profile/banner
-   Search function on post page (search in user, post description/title, message) to prompt a model window to follow


### Prototype

Embed the prototype image here

### ERD

Embed the prototype image here






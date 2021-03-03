"# front-end-social-alpha" 


## Deployment to Facebook


### Installation Instructions



### Frontend-specific


### Backend-specific

### Requirements

#### Functional

##### Backend

-   DyanmoDB +  Lambda function + EndPoints
-   Congito for signup and login email confirmation
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

-   Hashed password for signup and login ( should be funtional ??? )
-   JWT Token for each communication except login/sign ( should be funtional ??? )
    - tables 
        - User: (the follow users)
        - Post: (image or image link, totalLikes, timestamp)
        - Comments: (timestamp)

##### Frontend

### Feature list

#### Must have

-   Sign up / login forms with validation
- 
-   Home page with all dramas (popular, featured director, recent)
-   Featured view once they click on one show
-   Rating capability (default is not yet rated)
-   Search function (search in title, director, cast, overview)

#### Nice to have

-   Filters
-   Suggestions (similar shows)
-   Preview videos / trailers
-   Expose API to external developers

### Prototype

![](https://i.imgur.com/XSzibOl.jpg)

### ERD

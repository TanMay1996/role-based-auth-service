# Role Based Auth Service
This is a sample code implementing Role Based and Scope Based Access Control Services/API.

## How it works?
Here `Scope` is the smallest(atomic) entity. Bunch of scopes creates a `Role`. A user can have `Roles` and `Scopes`. If user have a specific `Role` then all the `Scopes` from that role are inherited, that means user can have role scopes as well as direct scopes. This functionality gives a flexibility to create and customize a user centric access control system. Every API will have one or more Scopes for authorization, user with those scopes only access that API data. This system is built upon [Node.js](http://nodejs.org/) and [MongoDB](https://www.mongodb.org/downloads).

## Features
  - Support addition of Scopes and Roles
  - Support complete creation of custom Roles
  - Has Authentication and Authorization middlewares
  - Has APIs to add and customize Roles and Scopes with `admin` authorization
  - Has Login/Logout, Signup APIs.
  
## Guide to run this code locally

Go ahead and install [Node.js](http://nodejs.org/) and [MongoDB](https://www.mongodb.org/downloads). Run MongoDB server.

Change the MongoDB path in `.env` file. For example `DATABASE=mongodb://127.0.0.1:27017/test-db`

Go to project folder and open command prompt and install all dependencies
```sh
$ npm install
```

Now inorder to do the preliminary setup of `Scopes` and `Roles`, run following command, it will insert some default necessary `Scopes`, `Roles` and a `User` with `admin` and `user-basic` role.
```sh
$ node setup.js
```
Role `user-basic` -> this is the basic role which will be given to all the users during their signup. It contains 3 Scopes `["MYPROFILE.READ", "MYPROFILE.UPDATE", "MYPROFILE.DELETE"]`

Role `admin` -> it has all the scopes except scopes from user-basic. You can find the list of scopes in setup.js file.

User which gets created is as follows, you can change it in setup.js file before running it.
```sh
{
    firstname: "firstname",
    lastname: "lastname",
    email: "test@abc.com",
    password: "qwe12345"
}
```

Once everything is done you can now open Postman and import `rbac-service.postman_collection.json` API definition file from the project folder and try out the APIs. Don't forget to copy auth token once logged in to the other APIs.

/*  MAKE SURE TO CONNECT TO DB, open Postman and Robo 3T
 
 1. test your env variables

currently the dev environment is interacting with this database on our local Mongo DB server. We don't want the test environment to also use that because the test environment - it's going to populate the database with seed data - So dummy data that the test cases can use to do things like test log in and it's gonna run test cases over and over again. So it'll be wiping the database setting up that seed data and running a test case and if it's doing that for our dev database it's gonna make it hard for us to actually use the API in postman as we're setting up new routes.

So all we're gonna do is create test.env. it is the same same as dev.env only the Mongo DB connection uri is added 'test'. So now our test environment is using a one database on our local Mongo DB server and the dev environment is using another making sure they're not interacting with each other's data which is going to cause
problems.

2. change app into index as your main script. your app.js wil be used as testing

*/

const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

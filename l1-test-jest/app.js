/*  MAKE SURE TO CONNECT TO DB, open Postman and Robo 3T
 
1. First up you'll be creating and running your very first test. You should be writing test cases to automatically verify that your project is always working as expected.

So what we're going to do is go with jest npm. Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

https://jestjs.io/

why test?

1. saves time

First up testing saves time. Now yes you have to write more code but that's OK. We write code wants to test a specific feature and we can run it as many times as we'd like. So if I create a new feature I create a test case for it. Then over the next four or five years of development I can keep just running that test case automatically by running the test command. There's no need to recreate it or do any manual work whatsoever.
Now this is gonna be even greater as your application grows in size. It will no longer be feasible to manually test everything and you'll rely on an automatic test suite.

2. create reliable software

Which brings us to the second point. When we test our code we create more reliable software. So whether you're just creating a project for yourself or working with a company or trying to launch a startup writing test cases is going to make it much easier to create reliable code. You'll be able to spot and fix bugs before they actually get shipped to production and mess up users. So we will have a test suite that makes sure everything is working and if something in our application was to break one of our test cases would fail alerting us that something's wrong. If we run the test suite and all of our test cases are passing then we know everything is working as expected and we could have a little more peace of mind that our software is functional.

3. flexibility to develoeprs

Now when we have a test suite in place it also gives flexibility to developers. I can refactor code trying to do things in a different or faster way. And as long as my test cases are passing I know I haven't broken anything I've just changed how something is done.

5. collaborating

It also makes it much easier when collaborating with others. If someone's coming into your project to add a feature or fix something they might not be up to speed on all of the different features of the software and how they fit together. When you have an automatic test suite that new developer can simply run the test cases and ensure that 
they haven't broken anything when they changed one area of the project.

6. profiling

You can also do a bit of profiling so you can see if these speed your test cases run goes up or down as you make changes so you can slowly make your application faster and faster over time. 

7. peace of mind

And lastly a point I already mentioned is peace of mind. You'll know that you have an automatic test suite. You can run to verify your entire project in a matter of seconds. If I wanted to make sure the task manager was completely functional I would have to go over to post man. I'd have to fire off a bunch of different requests changing things to make sure I got the correct errors when bad data was provided. It wouldn't be a slow process and there would be a lot of room for human error. It's possible that I would see the results and not realize they're incorrect when we have a code based test case.

a) add additional flag in package.json -  "test": "jest --watchAll"

this is going to keep jest up and running and just will automatically restart rerunning our tests when either the test case code changes or the code that's being tested changes so it'll be similar to how nodemon restarts our node server.

*/
require("./db/mongoose");
const express = require("express");
const app = express();
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
// d)
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/********** setup port number **********/
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const Task = require("./models/task");
const User = require("./models/user");

/********** Example how to use multer **********/
const multer = require("multer");
const upload = multer({
  //by using this, it will bypass the req obj and we wont be able to handle it properly
  dest: "./l20-file-uploads/testUploads",
  limits: {
    //a) restrict file size
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    //b) restrict file type
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("pls upload doc or docx type"));
    }
    if (!file.originalname.endsWith("pdf")) {
      return cb(new Error("pls upload pdf"));
    }

    // cb(new Error('File type not accepted'))
    cb(undefined, true);
  },
});
//localhost:3000/upload. use form data with 'upload' as key and upload image under value
app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ Error: error.message });
  }
);

/* Middleware function - this function is the function that's going to run between the request coming to the server and the root handler actually running. */

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const chalk = require("chalk");

const auth = async (req, res, next) => {
  try {
    /* receive token and decode using secret key and receives the _id in the decoded obj.with the _id and token, we can find that user. if returns user, means it is authenticated  */
    const token = req.header("Authorization").replace("Bearer ", "");
    // f)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      console.log(chalk.red("no user"));
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ Error: "Please authenticate" });
  }
};

module.exports = auth;

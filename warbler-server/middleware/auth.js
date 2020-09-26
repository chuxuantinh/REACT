require("dotenv").config();
const jwt = require("jsonwebtoken");

//the middleware goes in between the request and the handler to create a message

//jwt model still uses a callback pattern so we will not use async as the library has not been promisified yet
//make sure the user is logged in - Authentication
exports.loginRequired = function(req, res, next) {
  try {
    //first we try to get the token from an http header which is just a metadata about that request
    //we use try catch to handle the situation when req.headers.authorization is undefined
    const token = req.headers.authorization.split(" ")[1]; //Bearer fdsfds
    //decode the token
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) return next();
      else {
        return next({
          status: 401,
          message: "Please log in first"
        });
      }
    });
  } catch (e) {
    return next({
      status: 401,
      message: "Please log in first"
    });
  }
};

//make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        //prevents a logged in user to make a message for another user
        return next();
      } else {
        return next({
          status: 401,
          message: "unauthorized"
        });
      }
    });
  } catch (e) {
    return next({
      status: 401,
      message: "unauthorized"
    });
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/settings");

//Load user Model
const User = require("../models/UserSchema");

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
function handle_request(req,callback){
  console.log("/login-mongo-kafkabackend",req);
    // Find user by email
    User.findOne({ 'email':req.email,'user_type':req.type }).then(user => {
      // Check for user
      if (!user) {
        error = "Hey Stranger! We don't recognize that login. Spell check your info and try again!";
        console.log(error);
        callback(null,{
          "output" : false,
          "message" : error });
      } else{
      // Check Password
      console.log("checking password");
      bcrypt.compare(req.password, user.pswd).then(isMatch => {
        if (isMatch) {
            callback(null, {
             "output" : true,
             "message" :"Successful login",
              "user":user
              });
        } else {
          callback(null,{
            "output" : false,
            "message" :"Password incorrect"});
        }
      });
    }
    });
  };

  exports.handle_request = handle_request;
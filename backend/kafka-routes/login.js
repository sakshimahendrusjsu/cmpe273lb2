 //Route to handle Post Request Call to login an existing user
const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");
const keys = require("../config/settings");

router.post("/login", function(req, res) {
    console.log("Login Data Posted!");
    let loginData = req.body;
    let body={
    email : req.body.email,
    password : req.body.password,
    type : req.body.type
    }
    console.log("email & Unhashed Password: ", body.email, body.password);
    kafka.make_request("login", body, function(err, result) {
      console.log("login kafka result",result);
      if (err) {
        error = "Login Failed!!";
            console.log(error);
            return res.status(404).send({
              "output" : false,
              "message" : error });
      } else if(result.output){
          const payload = {
            email: result.user.email,
            user: result.user.user,
            id: result.user.id,
            type: result.user.user_type
          };
          console.log("create jwt token");
           // Create JWT Payload
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 86400 },
            (err, token) => {
            console.log("token",token);
            res.cookie('cookyou', JSON.stringify(payload), { maxAge: 9000000, httpOnly: false, path: '/' });
            res.status(200).send({
                "output" : result.output,
                "message" : result.message,
                 token: "Bearer " + token,
                 "user": result.user
                 });
        });
      }else {
       res.status(401).send({
        "output" : result.output,
        "message" : result.message,
         });;
      }
  });
});
  
  module.exports = router;
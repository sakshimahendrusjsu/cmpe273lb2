//Route to handle Post Request Call to add a new user
const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");

router.post("/signup", function(req, res) {
    console.log("Signup!!");
    let body = {
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      pswd: req.body.password,
      user_type: req.body.type,
      restaurant_name: req.body.restaurant_name ? req.body.restaurant_name: null,
      phone: req.body.phone ? req.body.phone :null,
      zipcode: req.body.zipcode ? req.body.zipcode : null,
      image : null
  }
  console.log("Inside Backend signup.js", body)
    kafka.make_request("signup", req, function(err, result) {
      console.log("signup kafka result",res);
      if (err) {
        res.status(401).send({
          output:true,
          message:"SgnUp Failed!!"}); 
      } else {
            res.status(200).send(result);
      }
    });
  });
  
  module.exports = router;
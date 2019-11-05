const express = require('express');
const router = express.Router();
const multer = require('multer');
var kafka = require("../kafka/client");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, '/Users/sakshi/Documents/AllCodes/React/273/kafka-project-lab2/lab/frontend/src/upload')
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

 router.put('/editName', function (req, res) {
    console.log("Inside mongo edit Name Put Request");
    console.log("Req Body : ", req.body);
    let { first,last,email,type } = req.body;
    console.log(first,last,email,type);
    kafka.make_request("profile",{"path":"name", req} , function(err, result) {
      console.log("profile name kafka result",result);
      if (err) {
        res.status(401).send({
          output:true,
          message:err}); 
      } else {
        res.status(200).send({
            "output" : true,
            "message" :"Name Updated!!!!!" })
       }
    });
  });
  
  router.put('/editEmail', function (req, res) {
    console.log("Inside mongo Email Put Request");
    console.log("Req Body : ", req.body);
    let { newEmail,email,type } = req.body;
    kafka.make_request("profile",{"path":"email", req} , function(err, result) {
        console.log("profile email kafka result",result);
        if (err) {
          res.status(401).send({
            output:true,
            message:err}); 
        } else {
          res.status(200).send({
              "output" : true,
              "message" :"Email Id Updated!!!!!" })
         }
      });
  });
  
router.put('/editPhone', function (req, res) {
    console.log("Inside mongo Phone Put Request");
    console.log("Req Body : ", req.body);
    let { phone,email,type } = req.body;
    kafka.make_request("profile",{"path":"phone", req} , function(err, result) {
        console.log("profile phone kafka result",result);
        if (err) {
          res.status(401).send({
            output:true,
            message:err}); 
        } else {
          res.status(200).send({
              "output" : true,
              "message" :"Phone Number Updated!!!!!" })
         }
      });
  });
  
router.put('/editRestaurantName', function (req, res) {
    console.log("Inside mongo editRestaurantName Request");
    console.log("Req Body : ", req.body);
    let { restaurantName,email,type } = req.body;
    kafka.make_request("profile",{"path":"restaurant", req} , function(err, result) {
        console.log("profile res kafka result",result);
        if (err) {
          res.status(401).send({
            output:true,
            message:err}); 
        } else {
          res.status(200).send({
              "output" : true,
              "message" :"Restaurant Updated!!!!!" })
         }
      });
  });
  
  router.put('/editCuisine', function (req, res) {
    console.log("Inside mongo Login Post Request");
    console.log("Req Body : ", req.body);
    let { cuisine,email,type } = req.body;
    kafka.make_request("profile",{"path":"cuisine", req} , function(err, result) {
        console.log("profile cuisine kafka result",result);
        if (err) {
          res.status(401).send({
            output:true,
            message:err}); 
        } else {
          res.status(200).send({
              "output" : true,
              "message" :"Cuisine Updated!!!!!" })
         }
      });
  });

router.post('/fileUpload', function (req, res) {
  upload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
        console.log("multer error", error)
    } else if (error) {
        console.log("error", error)
    }else{
      console.log("iamge",req.body);
      console.log(req.body);
        console.log(req.file);
  kafka.make_request("profile",{"path":"upload", req} , function(err, result) {
      console.log("profile fileUpload kafka result",result);
      if (err) {
        res.status(401).send({
          output:true,
          message:err}); 
      } else {
        res.status(200).send({
            "output" : true,
            "message" :"Profile Photo!!!!!" });
          }
   });
  }
});
});

router.post('/getAll', function (req, res) {
  console.log("Inside mongo get all details Request");
  console.log("Req Body : ", req.body);
  console.log(req.cookies);
  let { type,email } = req.body;
  kafka.make_request("profile",{"path":"getAll", req} , function(err, result) {
    console.log("profile kafka result",result);
    if (err) {
      res.status(401).send({
        output:true,
        message:err}); 
    } else {
      res.status(200).send({
          "output" : true,
          "message" :result })
     }
  });
});

  module.exports = router;
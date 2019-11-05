const express = require('express');
const router = express.Router();
var kafka = require("../kafka/client");

router.post('/getMsg', function (req, res) {
    console.log(req.body);
     text = req.body.text;
     console.log(text);
     console.log("/getMsg");  
     kafka.make_request("msg",{"path":"get", req} , function(err, result) {
        console.log("getMsg kafka result",result);
        if (err) {
          res.status(401).send({
            output:true,
            message:err}); 
        } else {
          res.status(200).send({
            output: true,
            message: result
        });
        }
     });
 });
 
 
 router.post('/putMsg', function (req, res) {
     console.log(req.body);
     text = req.body.text;
     console.log(text);
     cuisine = req.body.cuisine;
     console.log(cuisine);
     console.log("/getMsg");
     kafka.make_request("msg",{"path":"put", req} , function(err, result) {
        console.log("putMsg kafka result",result);
        if (err) {
          res.status(401).send({
            output:true,
            message:err}); 
        } else {
          res.status(200).send({
            output: true,
            message: result
        });
        }
     });
 });

 module.exports = router;
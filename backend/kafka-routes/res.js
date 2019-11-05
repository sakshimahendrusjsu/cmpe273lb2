const express = require('express');
const router = express.Router();
var kafka = require("../kafka/client");

router.post('/selectRestuarantByItems', function (req, res) {
    console.log(req.body);
     text = req.body.text;
     console.log(text);
     console.log("/selectRestuarantByItems/");  
     kafka.make_request("res",{"path":"Items", req} , function(err, result) {
        console.log("selectRestuarantByItems kafka result",result);
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
 
 
 router.post('/selectRestuarantByItemsAndCuisine', function (req, res) {
     console.log(req.body);
     text = req.body.text;
     console.log(text);
     cuisine = req.body.cuisine;
     console.log(cuisine);
     console.log("/selectRestuarantByItemsAndCuisine/");
     kafka.make_request("res",{"path":"ItemAndCuisine", req} , function(err, result) {
        console.log("selectRestuarantByItemsAndCuisine kafka result",result);
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
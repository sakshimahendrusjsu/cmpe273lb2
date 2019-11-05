const express = require('express');
const router = express.Router();
var kafka = require("../kafka/client");

//Load user Model
const Orders = require("../models/Orders");

router.post('/getOrderDeatilsOwnerWithStatus', function (req, res) {
    console.log(req.body);
    console.log(req.body.status);
    console.log(req.cookies);
    console.log("/getOrderDetailsowner/");
    kafka.make_request("order",{"path":"ownerOrder", req} , function(err, result) {
        console.log("getOrderDeatilsOwnerWithStatus kafka result",result);
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

router.post('/getOrderDeatilsBuyer', function (req, res) {
    console.log(req.body);
    console.log(req.cookies)
    console.log("/getOrderDetailsbuyer /");
    kafka.make_request("order",{"path":"buyerOrder", req} , function(err, result) {
        console.log("getOrderDeatilsBuyer kafka result",result);
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

router.post('/placeOrder', function (req, res) {
    console.log(req.body);
    console.log("/placeOrder/");
    kafka.make_request("order",{"path":"placeOrder", req} , function(err, result) {
        console.log("placeOrder kafka result",result);
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


router.post('/updateStatus', function (req, res) {
    console.log(req.body);
    console.log(req.body.status);
    console.log(req.cookies);
    console.log("/updateStatus/");
    kafka.make_request("order",{"path":"updateStatus", req} , function(err, result) {
        console.log("updateStatus kafka result",result);
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


module.exports = router;
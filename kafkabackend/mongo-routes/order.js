const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/settings");

//Load user Model
const Orders = require("../models/Orders");

router.post('/getOrderDeatilsOwnerWithStatus', function (req, res) {
    console.log(req.body);
    console.log(req.body.status);
    console.log(req.cookies);
    console.log("/getOrderDetailsbuyer/");
    var query = { $and: [{'restuarant_id': req.body.restuarant_id,'status':req.body.status}] }
 // Find the document
    Restaurants.findOne(query, function (error, result) {
    if (error) {
        res.status(400).send({
            "output": false,
            "message": error
        })
    } else {
        console.log("result", result);
        res.status(200).send({
            output: true,
            message: result
        })
    }
});
});

router.post('/getOrderDeatilsBuyer', function (req, res) {
    console.log(req.body);
    console.log(req.cookies)
    console.log("/getOrderDetailsowner /");
    var query = { $and: [{'name': req.body.name, 'email': req.body.email}]}
    // Find the document
    Restaurants.findOne(query, function (error, result) {
    if (error) {
        res.status(400).send({
            "output": false,
            "message": error
        })
    } else {
        console.log("result", result);
        res.status(200).send({
            output: true,
            message: result
        })
    }
});
});

router.post('/placeOrder', function (req, res) {
    console.log(req.body);
    console.log("/placeOrder/");
    const new_order= new Orders({
        'status':"NEW",
        'buyer_id': req.body.id,
        'buyer_name': "me",
        'owner_id': req.body.items[0].restaurant_id,
        'restaurant_id': req.body.items[0].restaurant_id,
        'restaurant_name': req.body.items[0].restaurant_name,
        'total_quantity': total,
        'total_price': req.body.price,
        'items': req.body.items
    })
    new_order
    .save({data})
    .then(user =>  
      res.status(200).send({
      output:true,
      message:result
    }))
    .catch(err => 
        {console.log(err)
            res.status(401).send({
                output:true,
                message:"Something went wrong"}
                )});
});


router.post('/updateStatus', function (req, res) {
    console.log(req.body);
    console.log(req.body.status);
    console.log(req.cookies);
    console.log("/getOrderDetailsbuyer/");
    var query = {'_id':req.body.id },
    update = { $set: { 'status':req.body.status } }
 // Find the document
    Restaurants.update(query,update,function (error, result) {
    if (error) {
        res.status(400).send({
            "output": false,
            "message": error
        })
    } else {
        console.log("result", result);
        res.status(200).send({
            output: true,
            message: "Status Updated!!"
        })
    }
});
});


module.exports = router;
const express = require('express');
const router = express.Router();
//Load user Model
const Orders = require("../models/Orders");

function handle_request(msg,callback){
    console.log("/order-mongo-kafkabackend");
    console.log("msg", msg.req.body);
    console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "placeOrder":
            placeOrder(msg.req, callback);
            break;
        case "ownerOrder":
            getOrderDeatilsOwnerWithStatus(msg.req, callback);
            break;
        case "buyerOrder":
            getOrderDeatilsBuyer(msg.req, callback);
                break;
        case "updateStatus":
             updateStatus(msg.req, callback);
                break;
        default:
            doNothing();
    }
};

function getOrderDeatilsOwnerWithStatus(req,callback){
    console.log(req.body);
    console.log(req.body.status);
    console.log(req.cookies);
    console.log("/getOrderDetailowner/");
    var query = { $and: [{'owner_id': req.body.id,'status':req.body.status}] }
    // Find the document
    Orders.find(query, function (error, result) {
    if (error) {
        callback(null, {
            "output": false,
            "message": error
        })
    } else {
        console.log("result", result);
        callback(null, {
            output: true,
            message: result
        })
    }
});
}

function getOrderDeatilsBuyer(req,callback){
    console.log(req.body);
    console.log(req.cookies)
    console.log("/getOrderDetailsbuyer /");
    var query = { $and: [{'buyer_id': req.body.id,'status':req.body.status}]}
    // Find the document
    Orders.find(query, function (error, result) {
    if (error) {
        callback(null, {
            "output": false,
            "message": error
        })
    } else {
        console.log("result", result);
        callback(null, {
            output: true,
            message: result
        })
    }
});
}

function placeOrder(req,callback){
    console.log(req.body);
    console.log("/placeOrder/");
    const new_order= new Orders({
        'status':"NEW",
        'buyer_id': req.body.id,
        'buyer_email': req.body.email,
        'owner_id': req.body.owner_id,
        'restaurant_id': req.body.restaurant_id,
        'restaurant_name': req.body.restaurant_name,
        'total_quantity': req.body.total,
        'total_price': req.body.price,
        'items': req.body.cart
    })
    new_order
    .save()
    .then(user =>  
        callback(null, {
      output:true,
      message:"Order Placed!!"
    }))
    .catch(err => 
        {console.log(err)
            callback(null, {
                output:true,
                message:"Something went wrong"}
         )});
}


function updateStatus(req,callback){
    console.log(req.body);
    console.log("/updateStatus/");
    var query = {'_id':req.body.id },
    update = { $set: { 'status':req.body.status } }
 // Find the document
 Orders.update(query,update,function (error, result) {
    if (error) {
        callback(null, {
            "output": false,
            "message": error
        })
    } else {
        console.log("result", result);
        callback(null, {
            output: true,
            message: "Status Updated!!"
        })
    }
});
}

function doNothing(){
    console.log("do nothing");
}

exports.handle_request = handle_request;
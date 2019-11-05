const express = require('express');
const router = express.Router();
const Message = require('../models/Message')

function handle_request(msg,callback){
    console.log("/messages-mongo-kafkabackend");
    console.log("msg", msg.req);
    console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "get":
            getMsg(msg.req, callback);
            break;
        case "put":
            putMsg(msg.req, callback);
            break;
        default:
            doNothing();
    }
};


function getMsg(req,callback){
    console.log(req.body);
     console.log("/getMsg/");
     var query = {'order_id':req.body.order_id}
      // Find the document
     Message.findOne(query, function(error, result) {
             if(error){
            callback(null, {
                "output" : false,
                "message" : error })
           }else{
               console.log(result);
               callback(null, {
                output: true,
                message: result})
           }
    });
}
 
 
function putMsg(req,callback) {
    console.log(req.body);
    console.log("/putMsg/");
    
    var query = { 'order_id': req.body.order_id }
    update = { $set : {
        'order_id':req.body.order_id,
        'buyer_id': req.body.id,
        'buyer_email': req.body.email,
        'restaurant_id': req.body.restaurant_id,
        'restaurant_name': req.body.restaurant_name,
        'items': req.body.cart,
    },$push: { 'messages': req.body.chat}}
    
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Message.findOneAndUpdate(query,update, options ,function(error, result) {
             if(error){
            callback(null, {
                "output" : false,
                "message" : error })
           }else {
               console.log("found",result);
               callback(null, {
                output: true,
                message: result})
               }
        //    }else{
        //     console.log("not found");
        //     const msg= new Message({
        //         'order_id':req.body.order_id,
        //         'buyer_id': req.body.id,
        //         'buyer_email': req.body.email,
        //         'restaurant_id': req.body.restaurant_id,
        //         'restaurant_name': req.body.restaurant_name,
        //         'items': req.body.cart,
        //         'messages':req.body.chat
        //     })
        //     msg
        //     .save()
        //     .then(chat =>  
        //         callback(null, {
        //       output:true,
        //       message:chat
        //     }))
        //     .catch(err => 
        //         {console.log(err)
        //             callback(null, {
        //                 output:true,
        //                 message:"Something went wrong"}
        //          )});
        //    }
    });
}

function doNothing(){
    console.log("do nothing");
}

  
 exports.handle_request = handle_request;
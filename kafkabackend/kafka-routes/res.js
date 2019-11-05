const express = require('express');
const router = express.Router();
const Restaurants = require('../models/Restaurants')

function handle_request(msg,callback){
    console.log("/restaurant-mongo-kafkabackend");
    console.log("msg", msg.req.body);
    console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "Items":
            getRestuarantByItems(msg.req, callback);
            break;
        case "ItemAndCuisine":
            getRestuarantByItemsAndCuisine(msg.req, callback);
            break;
        default:
            doNothing();
    }
};


function getRestuarantByItems(req,callback){
    console.log(req.body);
     text = req.body.text;
     console.log(text);
     console.log("/selectRestuarantByItems/");
     var query = {'sections.items.name':{$regex: ".*" + req.body.text + ".*"}}
      // Find the document
     Restaurants.find(query, function(error, result) {
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
 
 
function getRestuarantByItemsAndCuisine(req,callback) {
     console.log(req.body);
     text = req.body.text;
     console.log(text);
     cuisine = req.body.cuisine;
     console.log(cuisine);
     console.log("/selectRestuarantByItemsAndCuisine/");
     var query = { $and: [{'sections.items.name':{$regex: ".*" + req.body.text + ".*"},'sections.items.cuisine':{$regex: ".*" + req.body.cuisine + ".*"}}]}
     // Find the document
    Restaurants.find(query, function(error, result) {
            if(error){
        callback(null, {
               "output" : false,
               "message" : error })
          }else{
            callback(null, {
               output: true,
               message: result})
          }
   });
}

function doNothing(){
    console.log("do nothing");
}

  
 exports.handle_request = handle_request;
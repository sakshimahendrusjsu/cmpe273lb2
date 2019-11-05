const express = require('express');
const router = express.Router();
var multer = require('multer')
const path = require('path');
const Restaurants = require('../models/Restaurants')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //     cb(null, '/home/ec2-user/lab1/cmpe273-lab1/newFrontend/src/uploads')
        cb(null, '/Users/sakshi/Documents/AllCodes/React/lab2/grubHub/frontend/src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file')

function handle_request(msg,callback){
    console.log("/section-mongo-kafkabackend");
    console.log("msg", msg.req.body);
    console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "getAll":
            getAll(msg.req, callback);
            break;
        case "add":
            add(msg.req, callback);
            break;
        case "del":
            del(msg.req, callback);
            break;
        case "insertItem":
            insertItem(msg.req, callback);
            break;
        case "delItem":
            delItem(msg.req, callback);
            break;
    }
};

function getAll(req, callback) {
    console.log(req.body.id);
    console.log("/get sections/");
    var query = { 'name': req.body.name, 'email': req.body.email }
    // Find the document
    Restaurants.findOne(query, function (error, result) {
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

function add(req, callback) {
    console.log(req.body);
    console.log("mongo add sections");
    var query = { 'name': req.body.restaurant_name, 'email': req.body.email ,'id':req.body.id},
        update = { $push: { 'sections': { 'section_name': req.body.name } } },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
    // Find the document
    Restaurants.update(query, update, options, function (error, result) {
        if (error) {
            console.log(error);
            callback(null, {
                "output": false,
                "message": error
            })
        } else {
            callback(null, {
                output: true,
                message: "Section Added Successfully!!"
            })
        }
    });
}

function del(req, callback) {
    console.log(req.body);
    console.log("mongo /delete section/");
    var query = { 'name': req.body.restaurant_name, 'email': req.body.email },
        update = { $pull: { 'sections': { '_id':req.body.section_id }} }
    // Find the document
    Restaurants.findOneAndUpdate(query, update, function (error, result) {
        if (error) {
            callback(null, {
                "output": false,
                "message": error
            })
        } else {
            callback(null, {
                output: true,
                message: "Section deleted Successfully!!"
            })
        }
    });
}


function insertItem(req, callback) {
        console.log("mongo /insertItem/");
        console.log(req.body);
        console.log(req.file);
        let item = {
            "name": req.body.name,
            "description": req.body.description,
            "price": req.body.price,
            "cuisine": req.body.cuisine,
            "image": req.file.filename
        }
        var query = { 'name': req.body.restaurant_name, 'email': req.body.email, 'sections._id': req.body.section_id },
        update = { $push: {'sections.$.items': item}}
        Restaurants.updateOne(query, update, function (error, result) {
            if (error) {
                console.log(error);
                callback(null, {
                    "output": false,
                    "message": error
                })
            } else {
                callback(null, {
                    output: true,
                    message: "Item added Successfully !!"
                })
            }
        });
    }



    function delItem(req, callback) {
    console.log(req.body);
     console.log("mongo /delItem/");
     let item_id = req.body.product._id;
     console.log(item_id)
     var query = { 'name': req.body.name, 'email': req.body.email,'sections._id': req.body.section_id  },
     update = { $pull: { 'sections.$.items': {'_id':req.body.product._id}}} 
        Restaurants.findOneAndUpdate(query, update, function (error, result) {
            if (error) {
                console.log(error);
                callback(null, {
                    "output": false,
                    "message": error
                })
            } else {
                callback(null, {
                    output: true,
                    message: "Item Deleted!!"
                })
            }
        });
         }


//  router.post('/selectRestuarantItemsBySection', function (req, res) {
//     console.log(req.body);
//     console.log("/selectRestuarantItemsBySection/");
//     query = constants.QUERY.selectRestuarantItemsBySection;
//     console.log(query);
//     pool.query(query,req.body.id, function (err, result) {
//         if (err) {
//             console.log("error", err);
//             res.send(500, {
//                 "output": false,
//                 "message": "Err in query" + err
//             })
//         }
//         if (result.length >= 1) {
//             console.log(result);

//             res.send(200, {
//                 output: true,
//                 message: result
//             })
//             console.log("Result!!");
//         }
//         else {
//             res.send(203, {
//                 "output": false,
//                 "message": result
//             });
//         }
//     });
// });

function doNothing(){
    console.log("do nothing");
}

exports.handle_request = handle_request;

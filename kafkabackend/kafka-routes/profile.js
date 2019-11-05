const express = require('express');
const router = express.Router();
const multer = require('multer');
//Load user Model
const Users = require("../models/UserSchema");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, '/Users/sakshi/Documents/AllCodes/React/273/kafka-project-lab2/lab/frontend/src/upload')
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

function handle_request(msg,callback){
  console.log("/profile-mongo-kafkabackend");
  console.log("msg", msg.req.body);
  console.log("In Service path:", msg.path);
  switch (msg.path) {
      case "getAll":
          getAll(msg.req, callback);
          break;
      case "name":
          editName(msg.req, callback);
          break;
     case "email":
          editEmail(msg.req, callback);
            break
      case "phone":
          editPhone(msg.req, callback);
          break;
      case "restaurant":
          editRestaurantName(msg.req, callback);
          break;
      case "cuisine":
          editCuisine(msg.req, callback);
          break;
     case "upload":
          editFileUpload(msg.req, callback);
            break;
  }
};

function editName(req, callback) {
    console.log("Inside mongo edit Name Put Request");
    console.log("Req Body : ", req.body);
    let { first,last,email,type } = req.body;
    console.log(first,last,email,type);
   Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'firstName':first,'lastName':last}},function(err,result){
       if(err){
        callback(null, {
            "output" : false,
            "message" : err })
       }else{
        callback(null, {
            "output" : true,
            "message" :"Name Updated!!!!!" })
       }
   });
}
  
function editEmail(req, callback) {
    console.log("Inside mongo Email Put Request");
    console.log("Req Body : ", req.body);
    let { newEmail,email,type } = req.body;
    Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'email':newEmail}},function(err,result){
        if(err){
          callback(null, {
             "output" : false,
             "message" : err })
        }else{
         callback(null, {
             "output" : true,
             "message" :"Email Id Updated!!!!!" })
        }
    });
}
  
function editPhone(req, callback) {
    console.log("Inside mongo Phone Put Request");
    console.log("Req Body : ", req.body);
    let { phone,email,type } = req.body;
    Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'phone':phone}},function(err,result){
        if(err){
          callback(null, {
             "output" : false,
             "message" : err })
        }else{
          callback(null, {
             "output" : true,
             "message" :"Phone Number Updated!!" })
        }
    });
    }
  
    function editRestaurantName(req, callback){
    console.log("Inside mongo Login Post Request");
    console.log("Req Body : ", req.body);
    let { restaurantName,email,type } = req.body;
    Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'restaurant_name':restaurantName}},function(err,result){
        if(err){
          callback(null, {
             "output" : false,
             "message" : err })
        }else{
          callback(null, {
             "output" : true,
             "message" :"Restaurant Name Updated!!"})
        }
    });
  }
  
  function editCuisine(req, callback){
    console.log("Inside mongo Login Post Request");
    console.log("Req Body : ", req.body);
    let { cuisine,email,type } = req.body;
    Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'cuisine':cuisine}},function(err,result){
        if(err){
          callback(null, {
             "output" : false,
             "message" : err })
        }else{
          callback(null, {
             "output" : true,
             "message" :"Cuisine Updated!!"})
        }
    });
  }

  function editFileUpload(req ,callback){
      let {  type,email } = req.body;
      console.log(req.file.filename);
      Users.findOneAndUpdate({'email':email,'user_type':type},{$set : {'image':req.file.filename}},function(err,result){
        if(err){
          callback(null, {
             "output" : false,
             "message" : err })
        }else{
          callback(null, {
             "output" : true,
             "message" :"Image Updated!!"})
        }
    });

//   console.log(req.file);
//   console.log("/insertItem/");
//   let path=req.file.filename
//   console.log()
//   if(req.body.type == 'buyer'){
//     query = constants.QUERY.uploadImageBuyer
//   }else{
//     query = constants.QUERY.uploadImageOwner
//   }
//   pool.query(query,[path,req.body.id], function (err, result) {
//       if (err) {
//           console.log("error", err);
//           res.send(500, {
//               "output": false,
//               "message": "Err in query"+err
//           })
//       }
//       console.log("result")
//       if (result) {
//           res.send(200, {
//               output: true,
//               message: "Item added Successfully !!"
//           })
//           console.log("Item added Successfully");
//       }
//       else {
//           res.send(203, {
//               "output": false,
//               "message": "No data found in db..." + err
//           });
//       }
//   });
//  });
}

function getAll(req, callback){
  console.log("Inside mongo get all details Request");
  console.log("Req Body : ", req.body);
  console.log(req.cookies);
  let { type,email } = req.body;
  Users.findOne({'email':email,'user_type':type},function(err,result){
    if(err){
      callback(null, {
         "output" : false,
         "message" : err })
    }else{
      callback(null, {
         "result" : result,
         })
    }
});
}

function doNothing(){
  console.log("do nothing");
}

exports.handle_request = handle_request;
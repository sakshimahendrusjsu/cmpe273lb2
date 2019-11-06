const bcrypt = require("bcrypt");

//Load user Model
const User = require("../models/UserSchema");

function handle_request(req,callback){
  console.log("/signup-mongo kafkabackend",req);
  User.findOne({$and:[{email:req.body.email},{user_type:req.body.type}]}).then(user=>{
      if(user){
        callback(null, {
          output:true,
          message:"Email Id already exists!!"}) 
      }else{
          //create a new user
          const newUser= new User({
              firstName: req.body.first,
              lastName: req.body.last,
              email: req.body.email,
              pswd: req.body.password,
              user_type: req.body.type,
              restaurant_name: req.body.restaurant_name ? req.body.restaurant_name: null,
              phone: req.body.phone ? req.body.phone :null,
              zipcode: req.body.zipcode ? req.body.zipcode : null,
              image : null
          })
        //hash the password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.pswd,salt,(err,hash)=>{
                if (err) throw err;
          newUser.pswd = hash;
          newUser
            .save()
            .then(user => 
                callback(null, {
                    output:true,
                    message:"Account Successfully Created!!"})  
            )
            .catch(err => console.log(err));
            });
        });
      }
  });
};
exports.handle_request = handle_request;
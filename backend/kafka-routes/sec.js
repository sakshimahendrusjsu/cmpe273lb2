const express = require('express');
const router = express.Router();
var multer = require('multer')
var kafka = require("../kafka/client");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //     cb(null, '/home/ec2-user/lab1/cmpe273-lab1/newFrontend/src/uploads')
        cb(null, '/Users/sakshi/Documents/AllCodes/React/273/kafka-project-lab2/lab/frontend/src/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file')

router.post('/getAll', function (req, res) {
    console.log("/get sections/");
    console.log(req.body);
    kafka.make_request("sections",{"path":"getAll", req} , function(err, result) {
        console.log("profile getall kafka result",result);
        if (err) {
          res.status(401).send({
            output:true,
            message:err}); 
        } else {
          res.status(200).send({
              "output" : true,
              "message" :result })
         }
      });
});

router.post('/add', function (req, res) {
    console.log("mongo add sections");
    console.log(req.body);
    kafka.make_request("sections",{"path":"add", req} , function(err, result) {
            console.log("sections add kafka result",result);
            if (err) {
              res.status(401).send({
                output:true,
                message:err}); 
            } else {
              res.status(200).send({
                output: true,
                message: "Section Added Successfully!!"
             });
            }
     });
});


router.post('/del', function (req, res) {
    console.log(req.body);
    console.log("mongo /delete section/");
    kafka.make_request("sections",{"path":"del", req} , function(err, result) {
            console.log("sections delete kafka result",result);
            if (err) {
              res.status(401).send({
                output:true,
                message:err}); 
            } else {
              res.status(200).send({
                output: true,
                message: "Section deleted Successfully!!"
             });
            }
     });
});


router.post('/insertItem', function (req, res) {
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            console.log("multer error", error)
        } else if (error) {
            console.log("error", error)
        }else{
            kafka.make_request("sections",{"path":"insertItem", req} , function(err, result) {
                console.log("sections insert iTEM kafka result",result);
                if (err) {
                  res.status(401).send({
                    output:true,
                    message:err}); 
                } else {
                  res.status(200).send({
                    output: true,
                    message: "Item added Successfully !!"
                 });
                }
         });
        }
    });
});


router.post('/delItem', function (req, res) {
    console.log(req.body);
     console.log("mongo /delItem/");
     kafka.make_request("sections",{"path":"delItem", req} , function(err, result) {
        console.log("sections delete  item kafka result",result);
        if (err) {
          res.status(401).send({
            output:true,
            message:err}); 
        } else {
          res.status(200).send({
            output: true,
             message: "Item Deleted!!"
         });
        }
     });
  });


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


module.exports = router;

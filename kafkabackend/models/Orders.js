var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OrderSchema =new Schema({
status:{
        type:String,
   },
owner_id:{
    type:String,  
},
buyer_id:{
     type:String,
},
buyer_email:{
     type:String,
  },
restaurant_id:{
    type:String,  
},
restaurant_name:{
    type:String,
 },
total_price:{
    type: Number
},
total_quantity:{
    type: Number
},
status:{
    type:String
},
items:[{
          name: String,
          description: String,
          price: String,
          quantity:String,
          image:String,
          div_index: Number,
          list_index: Number
          }],      
})


module.exports = Orders =mongoose.model('orders', OrderSchema);

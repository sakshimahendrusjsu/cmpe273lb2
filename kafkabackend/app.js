var connection = new require('./kafka/Connection');
const mongoose = require("mongoose");
const db = require("./config/settings").mongoUri;

console.log(db);
//Coonect to Mongo DB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('debug', true);
mongoose
  .connect(db,{ useNewUrlParser: true, poolSize: 10 })
  .then(() => console.log("connected to mongo db"))
  .catch(err => console.log(err));


var signup = require("./kafka-routes/signup");
var login = require("./kafka-routes/login");
var profile = require("./kafka-routes/profile");
var section = require("./kafka-routes/sec");
var restaurant = require("./kafka-routes/res");
var order = require("./kafka-routes/order");
var message = require("./kafka-routes/message");

function handleTopicRequest(topic_name, function_name) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  consumer.on('error', function (err) {
    console.log("Kafka Error: Consumer - " + err);
});
  console.log("Topic",topic_name,"is active...");
  consumer.on("message", function(message) {
    console.log("Message recieved for: " + topic_name + " " + function_name);
    // console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    function_name.handle_request(data.data, function(err, res) {
      console.log("After request handling: ", res);
      var payload = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];

      producer.send(payload, function(err, data) {
        console.log("producer send ", data);
      });
      return;
    });
  });
}

handleTopicRequest("signup", signup);
handleTopicRequest("login", login);
handleTopicRequest("profile", profile);
handleTopicRequest("sections", section);
handleTopicRequest("res", restaurant);
handleTopicRequest("order", order);
handleTopicRequest("msg", message);
var restify = require('restify');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Check this out
//https://www.npmjs.com/package/restify-mongoose
mongoose.connect('mongodb://127.0.0.1:27017/myIonic2Project');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

// Create a simple mongoose model 'Note' 
var contactSchema = new Schema({
    name : { type : String, required : true },
    email : { type : String, required : true, unique: true }
});

var Contact = mongoose.model('Contact', contactSchema);

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.post('/contact/new', function (req, res, next) {
  var params = JSON.parse(req.body);
  var contact = new Contact(params);

  contact.save(function (err, contact) {
    var status = "success";
    if (err) {
      console.log(err);
      res.send({
        "status": "error"
      });
    }

    Contact.find({}, function(err, contacts){
        res.send({
          "status": "sucess",
          "contacts": contacts
        });      
    });

  });
  return next();
});
 
server.listen(8200, function () {
  console.log('%s listening at %s', server.name, server.url);
});






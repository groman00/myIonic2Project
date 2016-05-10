var restify = require('restify');
 
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

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});
 
server.listen(8200, function () {
  console.log('%s listening at %s', server.name, server.url);
});
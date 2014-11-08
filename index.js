
var qs = require('querystring');

var protocol = require('https');

module.exports.verify = function(remoteip, challenge, response, cb){
 var message_buf = new Buffer(
  qs.stringify({
   'privatekey': this.privateKey,
   'remoteip': remoteip,
   'challenge': challenge,
   'response': response
  })
 );
 
 var req = protocol.request({
  method: 'POST',
  host:'www.google.com',
  path: '/recaptcha/api/verify',
  headers: {
   'Host': 'www.google.com',
   'Content-Type': 'application/x-www-form-urlencoded',
   'Content-Length': message_buf.length,
   'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:26.0) Gecko/20100101 Firefox/26.0',
  }
 }, function(res){
  var responseData = [];
  var responseSize = 0; // in bytes
  res.on('data', function(c){
   responseSize += c.length;
   if(responseSize > 2048){
    req.abort();
    return cb('module-error');
   }
   responseData.push(c);
  });
  res.on('end', function(){
   var response = Buffer.concat(responseData).toString().split(/\r?\n/g);
   if(response[0] === 'true'){
    return cb();
   }
   return cb(response[1]);
  });
 }).on('error', function(){
  cb('recaptcha-not-reachable');
 }).end(message_buf);

};


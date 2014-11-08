node-recaptcha
==============

Google's Recaptcha server-side module for Node.JS


Sample usage:
```javascript

var Recaptcha = require('recaptcha');

Recaptcha.privateKey = 'Your private key...';

Recaptcha.verify('<Remote address>', '<challenge>', '<response>', function(err){
 if(err){
  if(err === 'module-error'){
   // Something is wrong with module (unexpected response)
  }
  else {
   // Google's error response
  }
 }
 else {
  // TODO! 
  //  Challenge verified! It's a human. What would you like to do here?
 }
});


```

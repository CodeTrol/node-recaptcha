node-recaptcha
==============

Google's Recaptcha server-side module for Node.JS

## Installation

```
npm install node-recaptcha
```

## Setup

Before you can use this module, you must visit http://www.google.com/recaptcha
to request a public and private API key for your domain.

## Sample usage

```javascript

var Recaptcha = require('node-recaptcha');

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

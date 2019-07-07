// First: const express module, for creating webserver
  const express = require('express');
// Secondly: const router, for server.use
  // const user.js module for user reg,login
  const indexRouter = require('./routes/index.js');
  const userRouter = require('./routes/user.js');
  const goodRouter = require('./routes/good.js');
  // ...more router coming...

// Thirdly: const body-parser module for post transform
  const bodyParser = require('body-parser');

// create webserver and listen
  var server = express();
  server.listen(3000,()=>{
    console.log("wg_jq.server listening 3000...");
  });

// use the static for files
  server.use(express.static('./public'));

// use the bodyParser for post transform
  server.use(bodyParser.urlencoded({
    extended : false
  }));

// use the router for every request
  // use index to '/index'
  server.use('/index',indexRouter); 
  // use userRouter to '/user'
  server.use('/user', userRouter);
  // use goodRouter to '/good'
  server.use('/good', goodRouter);
  // ...more router coming...





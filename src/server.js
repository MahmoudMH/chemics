const http = require('http');
const router = require('./router');
const server = http.createServer(router);

server.listen (process.env.port || 4000, result =>{
  console.log("passed");
});

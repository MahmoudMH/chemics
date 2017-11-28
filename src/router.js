const fs = require('fs');
const path = require('path');
const router = (request , response) => {
  var url = request.url;
  console.log('here',url);
  if( url === '/alchemy'){
    var allTheData = '';
  request.on('data', function (chunkOfData) {
    var textChunk = chunkOfData.toString('utf8');

      allTheData += chunkOfData;
      console.log(typeof textChunk);
  });

  request.on('end', function () { });
  response.end();
}

  else if(url === '/'){
      fs.readFile(path.join(__dirname,'..','public','index.html'),(error, file)=>{
            if(error){
              response.writeHead(500,'content-Type: text/html');
              response.end('<h1>internal server Error</h1>');
            }
            else {
              response.writeHead(200,'content-Type: text/html');
              response.end(file);
            }
          });
        }
else if(url.startsWith('/public')){
            const extention = url.split('.')[1];
            const fileType ={
              html: 'text/html',
              css: 'text/css',
              js: 'application/javascript',
              ico: 'image/x-icon'
            }
            fs.readFile(path.join(__dirname,'..' ,url),(error, file)=>{
            if(error){
              response.writeHead(500,'content-Type: text/html');
              response.end('<h1>internal server Error</h1>');
            }
            else {
              response.writeHead(200,'content-Type: '+fileType[extention]);
              response.end(file);
            }
          });
         }


}
module.exports = router;

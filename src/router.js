const fs = require('fs');
const path = require('path');
const router = (request , response) => {
  var url = request.url;
  if( url === '/alchemy'){
    var input = '';
    var nameElm = [];
    var ret = [];
  request.on('data', function (chunkOfData) {
    var textChunk = chunkOfData.toString('utf8');
      input += textChunk;
  });

  request.on('end', function () {
    fs.readFile(path.join(__dirname,'data','data.json'),(error, file)=>{
          if(error){
            response.writeHead(500,'content-Type: text/html');
            response.end('<h1>internal server Error</h1>');
          }
          var elements = JSON.parse(file);
          for(var i in elements.elements){nameElm.push(elements.elements[i].name);}
          for(var i in nameElm){

              if(nameElm[i].toLowerCase().indexOf(input.toLowerCase()) !== -1) {
               ret.push(nameElm[i]);

          }}
          console.log('ss',ret);
          // for (var i = 0; i < elements[0].length; i++) {
          //   nameElm.push(elements[0][i].name);
          // }
          // console.log('sssd',nameElm);

            // const elements = JSON.parse(JSON.stringify(file)).elements;
            // var ret = [];
            // for(var i=0; i<elements.length; i++) {
            // if(elements[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
            // ret.push(elements[i]);
            // }
            // }
            //
            response.writeHead(200,'content-Type: text/html');
            response.end(JSON.stringify(ret));

        });
  });
  // response.end();
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

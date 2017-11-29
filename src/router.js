const fs = require('fs');
const path = require('path');
const router = (request, response) => {
  var url = request.url;
  if (url === '/chemics') {
    var input = '';
    var nameElm = [];
    var ret = [];
    request.on('data', function(chunkOfData) {
      var textChunk = chunkOfData.toString('utf8');
      input += textChunk;
    });

    request.on('end', function() {
      fs.readFile(path.join(__dirname, 'data', 'data.json'), (error, file) => {
        if (error) {
          response.writeHead(500, 'content-Type: text/html');
          response.end('<h1>internal server Error</h1>');
        }
        const elements = JSON.parse(file).elements;
        var ret = [];
        let limit = 0;
        // elements.forEach(function(elements[i]) {
        //
        // });
        for(var i=0; i<elements.length; i++) {
          elements[i].name = elements[i].name.toLowerCase();
            if (elements[i].name.includes(input.toLowerCase())) {
              ret.push(elements[i]);
              limit++;
              console.log(limit,'.',elements[i].name);
            }
            if(limit==7) break;
        }
        response.writeHead(200, 'content-Type: text/html');
        response.end(JSON.stringify(ret));

      });
    });
    // response.end();
  } else if (url === '/') {
    fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (error, file) => {
      if (error) {
        response.writeHead(500, 'content-Type: text/html');
        response.end('<h1>internal server Error</h1>');
      } else {
        response.writeHead(200, 'content-Type: text/html');
        response.end(file);
      }
    });
  } else if (url.startsWith('/public')) {
    const extention = url.split('.')[1];
    const fileType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      ico: 'image/x-icon'
    }
    fs.readFile(path.join(__dirname, '..', url), (error, file) => {
      if (error) {
        response.writeHead(500, 'content-Type: text/html');
        response.end('<h1>internal server Error</h1>');
      } else {
        response.writeHead(200, 'content-Type: ' + fileType[extention]);
        response.end(file);
      }
    });
  }


}
module.exports = router;

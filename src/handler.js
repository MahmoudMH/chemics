const fs = require('fs');
const path = require('path');

const fileType = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  ico: 'image/x-icon'
};

function handlePublicFiles(request, response) {
  console.log("we are here");
  const url = request.url;
  const fileName = url.split('/')[url.split('/').length-1];
  // const name1 = fileName.split('.')[0];
  const ext = fileName.split('.')[1];
  console.log(fileName);
  fs.readFile(path.join(__dirname, '..', 'public',fileName),
    (error, file) => {
      if (error) {
        response.writeHead(500, 'Content-Type :text/html');
        response.end("<h1>error here</h1>");
      } else {
        response.writeHead(200, 'Content-Type :' + fileType[ext]);
        response.end(file);
      }
    });
}

function handleHomePage(request, response) {
  const url = request.url;
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'),
    (error, file) => {
      if (error) {
        response.writeHead(500, 'Content-Type :text/html');
        response.end("<h1>error here</h1>");
      } else {
        response.writeHead(200, 'Content-Type : text/html');
        response.end(file);
      }
    });
}

module.exports = {
  handlePublicFiles,
  handleHomePage
};

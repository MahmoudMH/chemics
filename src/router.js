const handlers = require("./handlers.js");

const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    console.log("I'm in public");
    handlers.handleHomePage(request, response);
  } else if (url.startsWith('/public')) {
    handlers.handlePublicFiles(request, response);
  } else {
    response.writeHead('404')
    response.end('Page not found ');
  }




};
module.exports = router;

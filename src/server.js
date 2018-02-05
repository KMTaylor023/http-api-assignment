const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);

  const accpetedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedURL.query);

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, accpetedTypes, params);
  } else {
    urlStruct.notFound(request, response, accpetedTypes, params);
  }
};


http.createServer(onRequest).listen(port);

console.log(`listening for requests on 127.0.0.1:${port}`);

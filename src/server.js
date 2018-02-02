const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/':responseHandler.getIndex,
    '/success':responseHandler.success,
    '/badRequest':responseHandler.badRequest,
    '/unauthorized':responseHandler.unauthorized,
    '/forbidden':responseHandler.forbidden,
    '/internal':responseHandler.internal,
    '/notImplemented':responseHandler.notImplemented,
    notFound: responseHandler.notFound
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  
  if(urlStruct[parsedUrl.pathname]){
    urlStruct[parsedUrl.pathname](request,response,accpetedTypes);
  }
};


http.createServer(onRequest).listen(port);
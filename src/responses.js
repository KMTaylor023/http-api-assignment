const fs = require('fs');  // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const success = (request, response) => {
  respond(request, response, index, 'text/html');
};

const badRequest = (request, response) => {
  respond(request, response, index, 'text/html');
};

const unauthorized = (request, response) => {
  respond(request, response, index, 'text/html');
};

const forbidden = (request, response) => {
  respond(request, response, index, 'text/html');
};

const internal = (request, response) => {
  respond(request, response, index, 'text/html');
};

const notImplemented = (request, response) => {
  respond(request, response, index, 'text/html');
};

const notFound = (request, response) => {
  respond(request, response, index, 'text/html');
};


module.exports = {getIndex,success,badRequest,unauthorized,forbidden,internal,notImplemented,notFound,};
const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// creates a json response string, with an id if provided
const createJSON = (msg, id) => {
  const json = { msg };
  if (id) {
    json.id = id;
  }

  return JSON.stringify(json);
};

// creates an xml response string, with id if provided
const createXML = (msg, id) => {
  let xml = '<response>';

  if (id) {
    xml = `${xml} <id> ${id} </id>`;
  }

  xml = `${xml} <message> ${msg} </message> </response>`;

  return xml;
};

// creates the response string based on accepted type
const createResponseString = (msg, id, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    return {
      content: createXML(msg, id),
      type: 'text/xml',
    };
  }
  return {
    content: createJSON(msg, id),
    type: 'application/json',
  };
};

const getIndex = (request, response, acceptedTypes, params) => {
  respond(request, response, index, 'text/html', 200);
};

const getCSS = (request, response, acceptedTypes, params) => {
  respond(request, response, css, 'text/css', 200);
};

const success = (request, response, acceptedTypes, params) => {
  const msg = 'This is a succesful response!';

  const resp = createResponseString(msg, "Success", acceptedTypes);
  return respond(request, response, resp.content, resp.type, 200);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const msg = "Missing 'valid' query paramter set to true";
  const id = 'badRequest';
  if (!params.valid || params.valid !== 'true') {
    const resp = createResponseString(msg, id, acceptedTypes);

    return respond(request, response, resp.content, resp.type, 400);
  }
  return success(request, response, acceptedTypes, params);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const msg = "User not authorized! ('loggedIn' query parameter not set to 'yes')";
  const id = 'unauthorized';
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    const resp = createResponseString(msg, id, acceptedTypes);

    return respond(request, response, resp.content, resp.type, 401);
  }

  return success(request, response, acceptedTypes, params);
};

const forbidden = (request, response, acceptedTypes, params) => {
  const msg = "You don't have access to this content";
  const id = 'forbidden';

  const resp = createResponseString(msg, id, acceptedTypes);

  return respond(request, response, resp.content, resp.type, 403);
};

const internal = (request, response, acceptedTypes, params) => {
  const msg = 'Internal Server Error... Something went wrong!';
  const id = 'InternalServerError';

  const resp = createResponseString(msg, id, acceptedTypes);

  return respond(request, response, resp.content, resp.type, 500);
};

const notImplemented = (request, response, acceptedTypes, params) => {
  const msg = 'GET requests for this page not yet implemented';
  const id = 'notImplemented';

  const resp = createResponseString(msg, id, acceptedTypes);

  return respond(request, response, resp.content, resp.type, 501);
};

const notFound = (request, response, acceptedTypes, params) => {
  const msg = 'Error 404: resource not found';
  const id = 'notFound';

  const resp = createResponseString(msg, id, acceptedTypes);

  return respond(request, response, resp.content, resp.type, 404);
};


module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};

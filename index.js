var request = require('request')
  , _ = require('underscore')
  , path = require('path')
  , through = require('through');

var URL = 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl';

var config = require(path.resolve('./nsrest.json'));

if(!(config.account && config.email && config.password)) {
  throw 'Must provide netsuite config';
}

var AUTH_STRING = 'NLAuth  nlauth_account=<%= account %>, nlauth_email=<%= email %>, nlauth_signature=<%= password %>';
var authHeader = _.template(AUTH_STRING)(config);

//Catch files
function sendFile (file) {

  //Upload them to netsuite by name
  var fileName = path.basename(file.path);

  //Pipe the response
  request({
    uri: URL,
    qs: {
      deploy: 1,
      script: config.script
    },
    method: 'PUT',
    headers: {
      Authorization: authHeader
    },
    json: {
      name: fileName,
      content: file._contents.toString()
    }
  });
}

module.exports = function(file, options) {
  return through(sendFile);
};

module.exports.send = sendFile;

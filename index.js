var request = require('request')
  , _ = require('underscore')
  , path = require('path')
  , through = require('through');

var URL = 'https://rest.sandbox.netsuite.com/app/site/hosting/restlet.nl?deploy=1&script=<%= script %>&file=<%= file %>';
var tmpl = _.template(URL);

var config = require(path.resolve('./nsrest.json'));

if(!(config.account && config.email && config.password)) {
  throw 'Must provide netsuite config';
}

var AUTH_STRING = 'NLAUTH nlauth_account=<%= account %>,nlauth_email=<%= email %>,nlauth_signature=<%= password %>';
var authHeader = _.template(AUTH_STRING)(config);

module.exports = function(file, options) {

  //Catch files
  function sendFile (file) {

    //Upload them to netsuite by name
    var url = tmpl({file: file, script: config.script});

    //Pipe the response
    return request({
      method: 'PUT',
      headers: {
        Authorization: authHeader
      }
    });
  }

  return through(sendFile);
};

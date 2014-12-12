var nsupload = require('nsupload')
  , through = require('through');

module.exports = function(options) {
  options.domain = options.domain || 'rest.sandbox.netsuite.com';

  nsupload.config(options);
  return through(function(file) {
    if(file.path) {
      nsupload(file.path).then(function() {
        console.log(file.path + ' uploaded.');
      }, function(e) {
        console.log('Error', e);
      });
    }
  });
};

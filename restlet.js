//The restlet that will need to be uploaded to NetSuite for the gulp plugin to run.

function writeFile (data) {
  var files = nlapiSearchRecord('file', null, [new nlobjSearchFilter('name', null, 'is', data.name)], [new nlobjSearchColumn('folder')]) || [];

  var newFileNumber;

  var path = data.path.split(/[\/\\]/);

  //Remove filename
  path.pop();

  var file = nlapiCreateFile(data.name, 'PLAINTEXT', data.content);
  if(files.length === 1) {
    folder = files[0].getValue('folder');

    //Otherwise if the uploaded path is more than just filename
  } else if(path.length > 0 && files.length > 1) {
    var curFolder = -15;

    // Search down folder tree
    while(path.length && curFolder) {
      var filters = [
        new nlobjSearchFilter('name', null, 'is', path.unshift()),
        new nlobjSearchFilter('parent', null, 'is', curFolder)
      ];

      var foundFolder = nlapiSearchRecord('folder', null, filters).getId();

      curFolder = foundFolder && foudFolder.getId();
    }
  }

  file.setFolder(files[0].getValue('folder'));
  newFileNumber = nlapiSubmitFile(file);
  return newFileNumber;
}

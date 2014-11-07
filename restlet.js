//The restlet that will need to be uploaded to NetSuite for the gulp plugin to run.

function writeFile (data) {
  var files = nlapiSearchRecord('file', null, [new nlobjSearchFilter('name', null, 'is', data.name)], [new nlobjSearchColumn('folder')]) || [];

  var newFileNumber;
  if(files.length === 1) {
    var file = nlapiCreateFile(data.name, 'PLAINTEXT', data.content);
    file.setFolder(files[0].getValue('folder'));

    newFileNumber = nlapiSubmitFile(file);
  }

  return newFileNumber;
}

#gulp-nsupload
###A gulp plugin for uploading to NetSuite

If your filename is unique, gulp-nsupload will upload it to netsuite for you. Recommended for use with gulp-watch.

##Installation

Here's what you need to do.

Install and deploy the included Restlet. You'll need the script internal id for the config file.

You'll probably want to use the PUT verb for the function, although NetSuite doesn't allow you to be truly 
restful (no semantic URI), so use a POST if you like it better.

Add a config file named `nsupload.json` to your project with the following: 
```json
{
  "email": "a@example.com",
  "password": "password",
  "account": 1234,
  "script": 1234
}
```
(Get account number from Setup/Integration/Webservices page)

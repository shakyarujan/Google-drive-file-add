
/*** Configure the GoogleDriverAPi - manage resources - Service Account (token) ***/
// import Google api library
var {
  google
} = require("googleapis");
// import the Google drive module in google library
var drive = google.drive("v3");
// import our private key
var key = require("./photo-upload.json");

// import path ° directories calls °
var path = require("path");
// import fs ° handle data in the file system °
var fs = require("fs");


/** make the request to retrieve an authorization allowing to works
      with the Google drive web service **/
// retrieve a JWT
var jwToken = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key, ["https://www.googleapis.com/auth/drive"],
  null
);
jwToken.authorize((authErr) => {
  if (authErr) {
    console.log("error : " + authErr);
    return;
  } else {
    console.log("Authorization accorded");
  }
});

// upload file in specific folder
var folderId = "1wVNPIx2Y8gifdbbYi29xvcKcZIJioFah";
var fileMetadata = {
  'name': 'photo.jpg',
  parents: [folderId]
};
var media = {
  //mimeType: 'text/plain',
  mimeType: 'image/jpeg',
  body: fs.createReadStream(path.join(__dirname, './files/photo.jpg'))
};
drive.files.create({
  auth: jwToken,
  resource: fileMetadata,
  media: media,
  fields: 'id'
}, function(err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    console.log('File Id: ', file.data.id);
    console.log('Sucessfully upload!!!!');
  }
});

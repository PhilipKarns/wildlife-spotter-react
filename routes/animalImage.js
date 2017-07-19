var express = require('express');
var app = express.Router();
var multer = require("multer");

module.exports = function(app) {
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //images will go in the uploads directory
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage }).single("animalImage");
 
app.post('/animalImage', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading 
      return err
    }
 	res.json({
 		success: true,
 		message: "Image uploaded successfully"
 	});
    // Everything went fine 
    console.log("image uploaded");
  })
});

};
// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var multer = require("multer");



//require Image model
var Image = require("./models/Image");

// Create a new express app
var app = express();
// Sets an initial port. We’ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
//run body parser to parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// MongoDB Configuration configuration (Change this URL to your own DB)
//mongoose.connect("mongodb://admin:codingrocks@ds023664.mlab.com:23664/reactlocate");
mongoose.connect("mongodb://localhost/spotimal");
var db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ROUTES =============================================================\
require("./routes/html-routes.js")(app);
//require multer file
require("./routes/animalImage.js")(app);
//app.use("/multer", multerImage);
//var routes = require("./routes/multer");

//app.use("/", routes);

// Starting our express server
app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});
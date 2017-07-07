// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Create a new express app
var app = express();
// Sets an initial port. We’ll use this later in our listener
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"));

var routes = require("./routes/multer");

app.use("/", routes);

// Starting our express server
app.listen(PORT, function() {
 console.log("App listening on PORT: " + PORT);
});
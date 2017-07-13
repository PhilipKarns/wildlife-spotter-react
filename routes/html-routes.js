
module.exports = function(app) {
	// Main "/" Route. This will redirect the user to our rendered React application
	app.get("/", function(req, res) {
	  res.sendFile(__dirname + "/public/index.html");
	});

};
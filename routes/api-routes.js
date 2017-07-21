//require Image model
var Image = require(".././models/Image");

module.exports = function(app) {
	// Main "/" Route. This will redirect the user to our rendered React application
	app.post("/api", function(req, res) {
	  console.log("Date: " + req.body.date);
	  console.log("Geometry: " + req.body.geometry);
	  console.log("Body: " + req.body);

	  //Create a new document in the collection each time an image is posted
	  Image.create({
	  	imageURL: req.body.imageURL,
	  	date: req.body.date, 
	  	geometry: {
	  		coordinates: req.body.geometry
	  	},
	  }, function(err) {
	  	if (err) {
	  		console.log(err);
	  	}
	  	else {
	  		res.send("saved search");
	  		res.send(res.body);
	  	}
	  });
	})

	app.get("/api", function(req, res) {
		Image.find({}).exec(function(err, doc) {
			if(err) {
				console.log(err);
			}
			else {
				//console.log(doc);
				res.send(doc);
			}
		});
	});
};
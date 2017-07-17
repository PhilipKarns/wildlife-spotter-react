var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//subdocument to store lat/lng coords
var PointSchema = new Schema ({
	type: { type: String, default: "Point" },
	coordinates: { type: [Number], index: "2dsphere" }
});

var ImageSchema = new Schema({
	imageURL: {
		type: String
	},
	date: {
		type: Date
	},
	geometry: PointSchema
});

var Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
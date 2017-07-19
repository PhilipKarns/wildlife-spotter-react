var axios = require("axios");

var helper = {
	postHistory: function(url, date, geometry) {
		//taking the following out of function params to test url: , date, geometry
		return axios.post("/api", {
			imageURL: url,
			date: Date.now(),
			geometry: geometry
		});
		console.log("info saved to database");
	}
};

module.exports = helper;

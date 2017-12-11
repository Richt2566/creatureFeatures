
var creatureData = require("../data/friends");

module.exports = function(app){

	app.get("/api/friends", function(req, res) {
	  res.json(creatureData);
	});

	app.post("/api/friends", function(req, res) {
		
	// empty object is best match with dummy difference value...
	var bestMatch = {
			name: "",
			photo: "",
			difference: 100
		};

		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;

		var totalDifference = 0;

		// Loop through all friends.js
		for  (var i = 0; i < creatureData.length; i++) {

			totalDifference = 0;

			// Loop through scores
			for (var j = 0; j < creatureData[i].scores[j]; j++){

				// totalDifference becomes the difference between scores
				totalDifference = parseInt(userScores[j]) - parseInt(creatureData[i].scores[j]);
				
				// one of the creatures becomes best match if it is closer to userdata
				if (totalDifference < bestMatch.difference){
					bestMatch.name = creatureData[i].name;
					bestMatch.photo = creatureData[i].photo;
					bestMatch.difference = totalDifference;
				}
			}
		}

		creatureData.push(userData); 
		res.json(bestMatch);
		
		});

}
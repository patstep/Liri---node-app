// ===== Loads required Node modules

// Reads and sets environment variables, requires keys
require("dotenv").config();
var keys = require('./keys.js');
var fs = require('fs');
var newCommand;
var dataArr;

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var params = {screen_name: 'instantclubhit'};

var Spotify = require('node-spofity-api');
var spotify = new Spotify(keys.spotify);
var searchSong;

var request = require('request');
var searchMovie;


 // Liri function with required commands
 function liri() {
 	if (command === 'my-tweets') {
 		myTweets();
 	} else if (command === 'spotify-this-sogn') {
 		spotifyThisSong();
 	} else if (command === 'movie-this') {
 		movieThis();
 	} else if (command === 'do-what-it-says') {
 		fs.readFile('random.txt', 'utf8', function (error, data) {
 			if (!error) {
 				newCommand = data;
 				console.log('Command received: ' + newCommand);
 				txtCommand();
 			}
 		});
 	} else {
 		console.log('Command not recognized.  Please try one of the following: my-tweets / spotify-this-song / movie-this / do-what-it-says')
 	}
 }



 
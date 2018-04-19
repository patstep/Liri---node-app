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
var spotify = new Spotify({
	id: 'd32c1032fb18432c8eae53f44d0e5d3f',
	secret: '374be4f5d8104380b79c9e6ed48856b4'
	});
var searchSong;

var request = require('request');
var searchMovie;

var command = process.argv[2];
var details = process.argv[3];


 // Liri function with required commands
 function liri() {
 	if (command === 'my-tweets') {
 		myTweets();
 	} else if (command === 'spotify-this-song') {
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

liri();


// Function myTweets to retrieve last 20tweets w/created date
function myTweets() {
	client.get('statuses/user_timeline', params, function(err, tweets, response) {
		if (!err) {
			console.log('------');
			for (i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text + '\n' + tweets[i].created_at + '\n------');
			}
		}
	});
};


// Function spotifyThisSong which shows artist, song name, preview link, album.  If no song provided, display The Sign by Ace of Base
function spotifyThisSong() {
	if (details) {
		searchSong = details;
	} else {
		searchSong = 'The Sign Ace of Base';
	}mo

	spotify.search(
		{ 
			type: 'track', 
			query: searchSong,
			limit: 1
		},
		function(err, data) {
			if (!err) {
				var song = data.tracks.items[0];
				console.log('------\nSong: ' + song.name + '\nArtist: ' + song.artists[0].name + '\nAlbum: ' + song.album.name + '\nLink to Spotify: \n' + song.preview_url + '\n------');
			}
		});
};


//movieThis function to display various info of selected title.  If none chosen, 'Mr. Nobody' info will display on default.
function movieThis() {
	if (details) {
		searchMovie = 'http://www.omdbapi.com/?apikey=trilogy&t=' + details;
	} else {
		searchMovie = 'http://www.omdbapi.com/?apikey=trilogy&t=mr+nobody';
	}

	request(searchMovie, function (err, res, body) {
		if (!err) {
			var movieInfo = JSON.parse(body);
			console.log('------\nMovie: ' + movieInfo.Title + '\nYear: ' + movieInfo.Year + '\nIMDB Rating: ' + movieInfo.imdbRating + '\nRotten Tomatoes Rating: ' + movieInfo.Ratings[1].Value + '\nPlot: ' + movieInfo.Plot + '\nStarring: ' + movieInfo.Actors + '\nLanguage: ' + movieInfo.Language + '\nProduced in ' + movieInfo.Country + '.\n------');
		}
	});
};
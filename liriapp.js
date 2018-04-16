// ===== Loads required Node modules

// Reads and sets environment variables
require("dotenv").config();

var Twitter = require('twitter');
var spotify = require('node-spofity-api');
var request = require('request');
var fs = require('fs');

var keys = require("./keys"); // Imports API keys


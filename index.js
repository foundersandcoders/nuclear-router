'use strict';

var window       = require("./lib/window.js");
var pathToRegexp = require('path-to-regexp');
var queryString  = require('query-string');

module.exports = router;

function router (state) {

	// browsers only
	if (!window) return;

	var loc = window.location;
	var win = window;

	function hash () {

		var hashString = loc.hash.substring(1);
		
		if (hashString[0] === "/") {
			return hashString;
		} else {
			return ('/' + hashString);
		}
	}

	function getQueryString (url) {
		return url.split("?")[1] || "";
	}

	function paramsParse (path) {

		var keys  = [];
		var re    = pathToRegexp(path, keys);
		var match = re.exec(hash());

		if (!match) {
			return undefined;
		} else if (match[1]) {
			return match[1].split("?")[0];
		} else {
			return match[0];
		}
	}

	window.addEventListener("hashchange", function () {

		state.route.set(hash());
	});

	function route (path, handler) {

		var o         = {};
		o.params      = paramsParse(path);
		o.parsedQuery = queryString.parse(getQueryString(hash()));

		if(o.params) {
			return handler(state, o);
		}
	}
	
	return route;
}
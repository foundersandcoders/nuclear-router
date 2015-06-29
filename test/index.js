'use strict';

var window = require("../lib/window.js");
var observ = require("observ");

var test = require("tape");

var router = require("../");

test("Router should be a function", function (t) {

	t.equals(typeof router, "function",  "is a function");
	t.end();
});

test("Router globals", function t (assert) {

	var state = {
		route: observ("")
	};
	
	var route = router(state);

	route("/", home);


	function home (stateInjected) {
		assert.pass("function called");
		assert.end();
	}
});

test("Router globals", function t (assert) {

	window.location.hash = "#user";

	var state = {
		route: observ("")
	};
	
	var route = router(state);

	route("/",     home);
	route("/user", user);

	function home (stateInjected) {
		assert.fail("should not have been called");
		assert.end();
	}

	function user (stateInjected) {
		assert.pass("function called");
		assert.end();
	}
});

test("handler function gets params and query string", function t (assert) {

	window.location.hash = "#/user/22?name=bes";

	var state = {
		route: observ("")
	};
	
	var route = router(state);

	route("/",         home);
	route("/user/:id", user);

	function home (stateInjected) {
		assert.fail("should not have been called");
		assert.end();
	}

	function user (stateInjected, params) {
		assert.pass("function called");
		assert.equals(params.params, "22", "get user id");
		assert.equals(params.parsedQuery.name, "bes", "get query string");
		assert.end();
	}
});
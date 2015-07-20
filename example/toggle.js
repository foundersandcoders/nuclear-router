'use strict';

var router = require("../");
var observ = require("observ");

var state = {
	route: observ("")
};

var route = router(state);

route("/",     home);
route("/user", user);

state.route(function () {

	route("/",     home);
	route("/user", user);
});

function home (stateInjected) {

	console.log('Home');
}

function user (stateInjected) {

	console.log('User');
}

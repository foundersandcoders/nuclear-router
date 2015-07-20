'use strict';

var browserify = require('browserify');
var jsdom      = require('jsdom');
var test       = require('tape');

function browserifyFile (file, callback) {

    var bundleFile = browserify(file).bundle();

    var store = '';

    bundleFile.on('data', function (data) {

        store += data;
    });

    bundleFile.on('end', function () {

        callback(null, store);
    });
}

test('Location hash should be: ', function (t) {

	t.plan(4);

	var virtualConsole = jsdom.createVirtualConsole();

	virtualConsole.on("log", function (message) {

		t.pass('console log received');
		console.log('arg', arguments);
	});

	var window = jsdom.jsdom('<html><body></body></html>', {
		virtualConsole: virtualConsole
	}).defaultView;

    browserifyFile('./example/toggle.js', function (error, script) {

    	var scriptComponent         = window.document.createElement('script');
    	scriptComponent.textContent = script;
    	window.document.head.appendChild(scriptComponent);

		window.location.hash = "user";

		process.nextTick(function () {

			window.location.hash = "";

			process.nextTick(function () {

				window.location.hash = "user";
			});
		});
    });
});
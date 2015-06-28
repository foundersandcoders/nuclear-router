/**
 *  Fake window.location.hash
 *
 *  It behavies exactley (I hope...) as the normal
 *  window.location.hash object.
 *
 *  It just listen for one event which can be named
 *  whatever you want.
 *
**/

'use strict';

var events       = require('events');
var eventEmitter = new events.EventEmitter();

var windowFake = {
    location: {},
    addEventListener: function (eventName, listener) {
        setEmitterFake(windowFake.location, eventName, listener);
    }
};

function setEmitterFake (target, eventName, listener) {
    
    var initialValue = target.hash || "";

    eventEmitter.on(eventName, listener);

    Object.defineProperty(target, "hash", {
        get: function () {
            return initialValue;
        },
        set: function (newValue) {
            initialValue = newValue;
            eventEmitter.emit(eventName);
        },
        enumerable: true,
        configurable: true
    });
}

if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = windowFake;
} else {
    module.exports = {};
}
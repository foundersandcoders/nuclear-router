# nuclear-router

Small routing system for [nuclear](https://github.com/foundersandcoders/nuclear).
Nuclear-router has a really simple API and is really small.

### Example

```js
var router = require("nuclear-router");


var state = {
	route: observ("")
};


var route = router(state);


route("/", home);


function home (stateInjected) {
	
	// return some virtual dom
}
```

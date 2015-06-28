# nuclear-router

Small routing system for nuclear

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
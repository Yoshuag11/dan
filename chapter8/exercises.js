// 1
function randomLogs () {
	var randomRange = 6;
	var previousValue;
	var currentValue = -1;
	var i = 6;
	var time = 60000;
	var logs =
		['hello', 'neat', 'Glip Glops', 'cool', 'hey there', 'not today though'];

	function generateRandomNumber () {
		previousValue = currentValue;
		currentValue = Math.floor(Math.random() * randomRange);

		/* Ensure that values won't repeat */
		while (currentValue === previousValue) {
			currentValue = Math.floor(Math.random() * randomRange);
		}
		return currentValue;
	}

	setTimeout(function logLog () {
		console.log(logs[generateRandomNumber()]);
		if (i >= 0) {
			i -= 1;

			setTimeout(logLog, time);
		}
	}, time);
}

// randomLogs();

// 2
function A () {
	console.log('function A');
}
function B () {
	console.log('function B');
}
function C () {
	console.log('function C');
}

var centralTimer = {
	functionStack: [],
	start: function () {
		var length = this.functionStack.length;
		var i;

		function runFunction (callBackObject) {
			callBackObject.fn();
			i += 1;

			if (i === length) {
				i = 0;
			}

			callBackObject = centralTimer.functionStack[i];
			setTimeout(
				runFunction.bind(Object.create(null), callBackObject),
				callBackObject.time
			);
		}

		if (length) {
			i = 0;
			runFunction(this.functionStack[i]);
		}
	},
	add: function (callbackObject) {
		this.functionStack.push(callbackObject);
	}
};
var centralTimer = {
	functionStack: [],
	start: function () {
		var callbackObject;
		var increment = 15000;
		var length = this.functionStack.length;
		var count = 0;
		var i;

		function runFunction () {
			var functions = centralTimer.functionStack;

			count += increment;

			for (i = 0; i < functions.length; i+= 1) {
				callbackObject = functions[i];

				if (!(count % callbackObject.time)) {
					callbackObject.fn();
				}
			}
		}

		if (length) {
			setInterval(runFunction, increment);
		}
	},
	add: function (callbackObject) {
		this.functionStack.push(callbackObject);
	}
};
centralTimer.add({ fn: A, time: 30000 });
centralTimer.add({ fn: B, time: 60000 });
centralTimer.add({ fn: C, time: 75000 });
centralTimer.start();
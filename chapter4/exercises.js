var result;
function isArray (array) {
	return array.constructor === Array;
}
function throwError(message) {
	throw message;
	// throw new Error(message);
}
// 1
var fibonacci = function () {
	var previous = 0,
		result = 0,
		aux;
	return function (count) {
		if (count == 0) {
			aux = result;
			/* reset values for future usage */
			previous = result = 0;
			return aux;
		} else if (count < 3 && result == 0) {
			return 1;
		} else {
			if (result == 0) {
				count -= 2;
				result = previous = 1;
			}
			aux = result;
			result = previous + result;
			previous = aux;
			return fibonacci(count - 1);
		}
	};
}();

result = fibonacci(4);
result = fibonacci(9);
result = fibonacci(3);
result = fibonacci(1);
result = fibonacci(0);
result = fibonacci(13);
result = fibonacci(21);
result = fibonacci(8);

// 2
function addRec (array) {
	if (!array.length) {
		return 0;
	} else if (array.length == 1) {
		return array[0];
	}
	return array[0] + addRec(array.slice(1));
}

var arr = [1, 3, 5, 7];
result = addRec(arr);

// 3
function MyNumber (number) {
	var number = number || 5;
	this.getNumber = function () { return number; };
	this.setNumber = function (value) {
		if (typeof value === 'number') {
			number = value;
		}
	};
}

var myNumber = new MyNumber(3);
result = myNumber.getNumber();
myNumber.setNumber('dan');
result = myNumber.getNumber();
myNumber.setNumber('8');
result = myNumber.getNumber();
myNumber.setNumber(15);
result = myNumber.getNumber();

// 4
function dataType () {
	var argument;
	for (var i = 0; i < arguments.length; i += 1) {
		// debugger;
		argument = arguments[i];
		if (Object.prototype.toString.call(argument) ===
		  '[object Function]') {
			console.log('function');
		} else if(isArray(argument)) {
			console.log('array');
		} else if(typeof argument === 'number') {
			console.log(argument % 1 ? 'float' : 'number');
		} else {
			console.log(typeof argument);
		}
	}
}

// dataType(1, 6.2831, 'pi*2', [function () {}, 1], {}, function () {});

// 5
var distance = function () {
	var twoD = function () {
		var a = arguments[0] - arguments[2];
		var b = arguments[1] - arguments[3];
		return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	};
	var threeD = function () {
		var a = arguments[0] - arguments[3];
		var b = arguments[1] - arguments[4];
		var c = arguments[2] - arguments[5];
		return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2));
	};
	return function () {
		if (arguments.length === 4) {
			return twoD.apply(this, arguments);
		}
		else if (arguments.length === 6) {
			return threeD.apply(this, arguments);
		} else if (arguments.length < 4) {
			throwError('Insufficient parameters.');
		} else {
			throwError('Wrong number of parameters.');
		}
	};
}();
var x1 = 1, y1 = 2, z1 = 1;
var x2 = 2, y2 = 2, z2 = 4;
// var delta1 = distance(x1, y1, x2, y2);
// var delta2 = distance(x1, y1, z1, x2, y2, z2);
// distance(x1, x2);
// distance(x1, x2, x1, x1, x1);

// 5
var distanceEnhanced = function () {
	var twoD = function () {
		var a = arguments[0] - arguments[2];
		var b = arguments[1] - arguments[3];
		return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	};
	var threeD = function () {
		var a = arguments[0] - arguments[3];
		var b = arguments[1] - arguments[4];
		var c = arguments[2] - arguments[5];
		return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2));
	};
	var possibleArrayLengths = [2, 3];
	return function () {
		if (arguments.length === 4) {
			return twoD.apply(this, arguments);
		}
		else if (arguments.length === 6) {
			return threeD.apply(this, arguments);
		} else if (arguments.length === 2) {
			var a = arguments[0];
			var b = arguments[1];
			var length;
			/* verify that the parameters were provided as arrays */
			if (!isArray(a)) {
				throwError('You need to provide both points as arrays.');
			}
			length = a.length;
			if (possibleArrayLengths.indexOf(length) < 0) {
				throwError('wrong number of elements for the coordinate.');
			} else if (length !== b.length) {
				throwError('Mismatch of elements between points.');
			}
			if (length === 2) {
				return twoD.call(this, ...a, ...b);
			} else {
				return threeD.call(this, ...a, ...b);
			}
		} else if (arguments.length < 4) {
			throwError('Insufficient parameters.');
		} else {
			throwError('Wrong number of parameters.');
		}
	};
}();

// debugger;
result = distanceEnhanced(1, 2, 2, 2);
result = distanceEnhanced([1, 2], [2, 2]);
result = distanceEnhanced(x1, y1, x2, y2);
result = distanceEnhanced([x1, y1, z1], [x2, y2, z2]);
result = distanceEnhanced([1, 2], [2, 2, 4]); // Throws "mismatch" error
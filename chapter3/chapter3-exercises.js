debugger;
var answer;
// 1
var mul	 = function (a, b) {
	debugger;
	var result = a * b;
	return Number(result.toString(13));
};

answer = mul(9, 6);

// 2
var add = function () {
	var result = 0;
	for (var i = 0; i < arguments.length; i += 1) {
		result += arguments[i];
	}
	return result;
}
answer = add(1, 2) + add(1, 4, 6, 7, 2);

// 3
var myMath = {
	add: add, // or just "add"
	mul: function () {
		var result = 1;
		for (var i = 0; i < arguments.length; i += 1) {
			result *= arguments[i];
		}
		return result;
	},
	fact: function (factorial) {
		var result = 1;
		for (var i = 1; i <= factorial; i += 1) {
			result *= i;
		}
		return result;
	}
}
var a = myMath.add(1, 2, 3);
var b = myMath.mul(1, 2, 3);
var c = myMath.fact(3);
// 4
var Image = function (pixelsData, width, height, name) {
	this.width = width;
	this.height = height;
	this.name = name;
	this.getPosition = function (x, y) {
		var width = this.width;
		return x * width - width + y - 1;
	};
	this.pixelData = function (x, y) {
		return pixelsData[this.getPosition(x, y)];
	};
	this.setPixelColor = function (x, y, color) {
		pixelsData[this.getPosition(x, y)] = color;
	};
};
var data = new Array(1600);
var img = new Image(data, 40, 40, 'myImage');
data[0] = 'purple';
data[41] = 'blue';
data[763] = 'red';
data[1599] = 'white';
var width = img.width;
var height = img.height;
var name = img.name;
var color = img.pixelData(1, 1);
color = img.pixelData(2, 2);
color = img.pixelData(20, 4);
color = img.pixelData(40, 40);
img.setPixelColor(8, 35, 'orange');
color = img.pixelData(8, 35);

// 5
function printObjProp (o, ownProperties) {
	ownProperties = typeof ownProperties === 'boolean' ? ownProperties : false;
	for (var i in o) {
		if (!ownProperties) {
			console.log(i);
		}
		else if (o.hasOwnProperty(i)) {
			console.log(i);
		}
	}
}
function CustomObject(a, b) {
	this.a = a;
	this.b = b;
}
CustomObject.prototype.c = function () { return this.a + this.b; };
var obj = new CustomObject(1, 2);
printObjProp(obj);
printObjProp(obj, false);
printObjProp(obj, true);
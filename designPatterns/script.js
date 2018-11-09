// A car "class"
function Car ( model ) {
	this.model = model;
	this.color = 'silver';
	this.year = '2012';

	this.getInfo = function () {
		return this.model + ' ' + this.year;
	}
}

var myCar = new Car('ford');

myCar.year = '2010';

console.log( myCar.getInfo() );

// Each of the following options will create a new empty object:
var newObject = {},
var newObject = Object.create(Object.prototype);
var newObject = new Object();

/* Assigning keys and values to objects */
var newObject = {};

// ECMAScript 3 compatible approaches
// 1. Dot syntax
//	Set properties
newObject.someKey = 'Hello world';

// Get properties
var value = newObject.someKey;

// 2. Square brackets syntax
//	Set properties
newObject['someKey'] = 'Hello World';

// Get properties
value = newObject['someKey'];

// ECMAScript 5 only compatible approaches
// 3. Object.defineProperty
Object.defineProperty(newObject, 'someKey', {
	value: "for more control of the property's behavior",
	writable: true,
	enumerable: true,
	configurable: true
});

// If the above feels a little difficult to read, a short-hand could
// be written as follows:
var defineProp = function (obj, key, value) {
	var config = {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	};
	Object.defineProperty(obj, key, config);
};

// To use, we then create a new empty "person" object
var person = Object.create(Object.prototype);

// Populate the object with properties
defineProp(person, 'Car', 'Delorean');
defineProp(person, 'dateOfBirth', '1981');
defineProp(person, 'hasBeard', false);

console.log(person);
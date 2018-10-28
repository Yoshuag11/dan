// 1
Function.prototype.extend = function (subclass) {
	var _super = this;

	function Class () {
		var tmp = this._super;
		this._super = _super;
		subclass.apply(this, arguments);
		/**
		 * If for any reason the class (constructor function) has
		 * a property called "_super", it is restored, otherwise it
		 * is deleted.
		 */
		tmp === undefined ?
			delete this._super :
			this._super = tmp;
	}
	Class.prototype = Object.create(this.prototype);
	Class.constructor = Class;
	return  Class;
};
function Person (name) {
	this.name = name;
}
Person.prototype.greet = function () {
	return `Hi, my name is ${this.name}`;
};

var Officer = Person.extend(function (name, gun) {
	this._super(name);
	this.gun = gun;
});
Officer.prototype.shoot = function () {
	return this.gun ? 'Watch me wielding my gun' :
		"Dude come on, I ain't got no gun.";
}
var officer1 = new Officer('Daniel', true);
var officer2 = new Officer('Daniel', false);

function Shape (edges) {
	this.edges = edges;

	edges.forEach(function (element, index) {
		var tempElement = +element;

		if (typeof tempElement !== 'number') {
			throw `'Wrong edge value: "${element}".`;
		}

		edges[index] = tempElement;
	});
}
Shape.prototype.showFigure = function () {
	console.log(`Figure has ${this.edges} edges.`);
};
var Triangle = Shape.extend(function (area, edges) {
	if (edges.length !== 3) {
		throw 'You must specify 3 edges';
	}

	this._super(edges);

	this.area = typeof area === 'function' ? area :function () {};
});
Triangle.prototype.perimeter = function () {
	return this.edges.reduce(function (total, elem) {
		return total + elem;
	})
};

var EquilateralTriangle = Triangle.extend((function () {
	function area () {
		/**
		 * Value is forced to one decimal digit via "toFixed" function
		 * and afterwards casted to number (since toFixed changes the
		 * value to string).
		 */
		return +((this.height * this.side / 2).toFixed(1));
	};
	return function (side) {
		var tempSide = +side;
		var that;

		if (typeof tempSide !== 'number') {
			throw `Wrong side value: "${side}"`;
		}

		this.side = tempSide;
		this.height = Math.sqrt(Math.pow(tempSide, 2) - Math.pow(tempSide / 2, 2));
		that = this;

		(function (n) {
			that._super(area, [n, n, n]);
		})(tempSide);
	};
})());

var Quadrilateral = Shape.extend(function (area, edges) {
	if (edges.length !== 4) {
		throw 'You must specify 4 edges';
	}

	this._super(edges);

	this.area = typeof area === 'function' ? area :function () {};
});
Quadrilateral.prototype.perimeter = function () {
	return this.edges.reduce(function (total, elem) {
		return total + elem;
	})
};

var Square = Quadrilateral.extend((function () {
	function area () {
		return Math.pow(this.side, 2);
	};
	return function (side) {
		var tempSide = +side;
		var that;

		if (typeof tempSide !== 'number') {
			throw `Wrong side value: "${side}"`;
		}

		this.side = tempSide;
		that = this;

		(function (n) {
			that._super(area, [n, n, n, n]);
		})(tempSide);
	};
})());
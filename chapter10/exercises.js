var myLib = {
	math: {
		real: {
			add: function (a, b) {
				return a + b;
			},
			sub: function (a, b) {
				return a - b;
			},
			mul: function (a, b) {
				return a * b;
			}
		},
		complex: {
			Num: function (real, img) {
				this.real = real;
				this.img = img;
			},
			add: function (a, b) {
				return {
					real: a.real + b.real,
					img: a.img + b.img
				};
			},
			sub: function (a, b) {
				return {
					real: a.real - b.real,
					img: a.img - b.img
				};
			},
			mul: function (a, b) {
				return {
					real: (a.real * b.real) + (a.img * b.img * -1),
					img: (a.real * b.img) + (a.img * b.real)
				};
			}
		},
		matrix: {
			add: function (a, b) {},
			sub: function (a, b) {},
			eye: function (size) {
				var matrix = [];
				var identityPivot = 0;
				var elements = Math.pow(size, 2);

				for (var i = 0; i < elements; i += 1) {
					if (identityPivot === i) {
						matrix.push(1);
						identityPivot += (size + 1);
					} else {
						matrix.push(0);}
					}
				return matrix;
			},
			dot: function (m, a) {},
			/**
			 * With this function, it is assumed that only a
			 * identity matrix is received.
			 */
			times: function (a, b) {
				var length = a.length;
				var i;

				for (i = 0; i < length; i += 1) {
					/**
					 * zero values are ignore, since the result
					 * will always be zero.
					 */
					if (a[i]) {
						a[i] = b;
					}
				}
				return b;
			}
		}
	}
};

var answer = myLib.math.real.sub(
	myLib.math.real.add(20, 22),
	myLib.math.real.mul(2, 5)
);

with (myLib.math.real) {
	answer = sub(add(20, 22), mul(2, 5));
}

(function (r) {
	answer = r.sub(r.add(20, 22), r.mul(2, 5));
})(myLib.math.real);

var ans;
ans = myLib.math.matrix.times(
	myLib.math.matrix.eye(4),
	myLib.math.complex.sub (
		new myLib.math.complex.Num(myLib.math.real.add(5, 2), -3),
		new myLib.math.complex.Num(3, 4)
	)
);

with (myLib.math) {
	with (matrix) {
		with (complex) {
			ans = times(
					eye(4),
					sub (
						new Num(real.add(5, 2), -3),
						new Num(3, 4)
					)
				);
		}
	}
}

(function (m) {
	var d = myLib.math;
	(function (c, m, r) {
		var d = myLib.math;
		ans = m.times(
			m.eye(4),
			c.sub (
				new c.Num(
					r.add(5, 2), -3
				),
				new c.Num(3, 4)
			)
		);
	})(m.complex, m.matrix, m.real);
})(myLib.math);
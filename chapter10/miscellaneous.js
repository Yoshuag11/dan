function test () {
	var p = [];
	var print = function () {
		p.push.apply(p.arguments);
	};
	print('aaa', 'ff');
}

test();
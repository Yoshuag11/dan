var result;

function dataParser (str) {
	var properties = [];
	var functions = {};
	var functionBodyRegex = /function[^{]*{\s*([\s\S]*?)\s*}$/m;
	var parserRegex =
		/{?([^\s:]*)\s*:\s*(function(?:[\s\S]+)}(?=\s*(?:}|,))|(?:[^,}]+))/gm;
	var argsRegex = /function[^(]*\(\s*([^)]*?)\s*\)/g;
	var result;
	var args;
	var fn;
	var i;

	function parser (match, key, value) {
		if (value.includes('function')) {
			functions[key] = value;
		} else {
			properties.push(`"${key}" : ${value}`);
		}
	}

	try {
		result = JSON.parse(str);
	} catch (e) {
		str.replace(parserRegex, parser);
		str = `{${properties.join(', ')}}`;
		result = JSON.parse(str);

		for (i in functions) {
			if (functions.hasOwnProperty(i)) {
				fn = functions[i];
				args = argsRegex.exec(fn);
				args = args && args[1] ? args[1].split(/,\s*/) : [];
				functionBody = functionBodyRegex.exec(fn);
				functionBody = functionBody && functionBody[1] ?
					functionBody[1] : '';
				result[i] =
					new Function(...args, functionBody);
			}
		}
	}
	return result;
}
var str = '{prop1: 42, myFn: function (a, b) { return a + b + this.prop1; }}';
// var str = `{prop1: 42, myFn: function (a, b) {
// 		return a + b + this.prop1;
// 	}}`;
var obj = dataParser(str);
result = obj.myFn(5 , 6);
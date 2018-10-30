var i;
var length;
// 1
var regexps = [
	/.abc/, /a+b?!!1{4}/, /.{3}a\.b/, /\w/, /\s/, /\d/, /./,
	/[abc]/, /(abc)/,
	/[a-zA-Z_\$\.]+[A-Za-z_\$0-9\.]*@[a-zA-Z_\$\.]+[a-zA-Z_\$0-9\.]*\.(com|net|org){1}/,
	/\([0oOn]{1}(_|\s)[0oOn]{1}\)/
];
var expression = '(o_0) a!!1111a.b@abc.org';


for (i = 0, length = regexps.length; i < length; i += 1) {
	var regExp = regexps[i];

	if (!regExp.test(expression)) {
		throw `Test ${regExp} was not satisfied.`;
	}
}

// 2
var regExp = /\w+\s\d{2},\s\d{4}/;
var testStrings = [
	'September 29, 1972', 'February 99, 0001', 'June 04, 3000'
];

for (i = 0, length = testStrings.length; i < length; i += 1) {
	var testString = testStrings[i];

	if (!regExp.test(testString)) {
		throw `Test ${regExp} was not satisfied.`;
	}
}

regExp = /\d\w|\w\d/;
testStrings = [
	'A52', 'd747', '27x', 'v2'
];

for (i = 0, length = testStrings.length; i < length; i += 1) {
	var testString = testStrings[i];

	if (!regExp.test(testString)) {
		throw `Test ${regExp} was not satisfied.`;
	}
}
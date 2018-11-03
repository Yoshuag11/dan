var i;
var length;
var answer;
var testString;
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
// A
var regExp = /^[a-zA-Z]+\s\d{2},\s\d{4}$/;
var testStrings = [
	'September 29, 1972', 'February 99, 0001', 'June 04, 3000'
];

for (i = 0, length = testStrings.length; i < length; i += 1) {
	testString = testStrings[i];

	if (!regExp.test(testString)) {
		throw `Test ${regExp} was not satisfied for string "${testStrings[i]}".`;
	}
}

// B
regExp = /(?<=\d)[a-zA-Z]|[a-zA-Z](?=\d)/;
testStrings = ['A52', 'd747', '27x', 'v2'];

for (i = 0, length = testStrings.length; i < length; i += 1) {
	answer = testStrings[i].match(regExp);

	if (!answer) {
		throw `Test ${regExp} was not satisfied for string "${testStrings[i]}".`;
	}
}

// C
regExp = /^[a-zA-Z]+\.(?:java|cpp|txt)$/;
testStrings = ['test.java', 'program.cpp', 'newReport.txt'];

for (i = 0, length = testStrings.length; i < length; i += 1) {
	answer = testStrings[i].match(regExp);

	if (!answer) {
		throw `Test ${regExp} was not satisfied for string "${testStrings[i]}".`;
	}
}

// D
regExp = /^(.)(.).\2\1$/;
testStrings = ['abcba', '12321', '_1a1_'];

for (i = 0, length = testStrings.length; i < length; i += 1) {
	answer = testStrings[i].match(regExp);

	if (!answer) {
		throw `Test ${regExp} was not satisfied for string "${testStrings[i]}".`;
	}
}

// E
regExp = /\b[b-yB-Y]+\b/g;
testString = 'Bee zapp Crow Eagle Zorro mouse Ape you';
answer = testString.match(regExp);

if (!answer) {
	throw `Test ${regExp} was not satisfied for string "${testStrings[i]}".`;
}

// F
regExp = /<(\w+)[^>]*>.*?<\/\1>/g;
// regExp = /<(\w+)[^>]*>.*?<\/\1>(?(?=.*?<\/\1>).*?<\/\1>)/g;
testString = 'Is <b>4 < -1/12</b> true? The <b>answer</b> will <em>surprise</em> you.';
answer = testString.match(regExp);

if (!answer) {
	throw `Test ${regExp} was not satisfied for string "${testStrings[i]}".`;
}

// 3
// A
function cyclically (candidate) {
	var character;
	var result = '';
	var number = /\d/;
	var length;
	var numberCount = '';
	var i;

	for (i = 0, length = candidate.length; i < length; i += 1) {
		character = candidate[i];

		if (number.test(character)) {
			numberCount += character;
		} else {
			if (numberCount) {
				result += +numberCount + 1;
				numberCount = '';
			}
			if (character === 'z') {
				result += 'a';
			} else if (character === 'Z') {
				result += 'A';
			} else {
				result += String.fromCharCode(character.charCodeAt() + 1);
			}
		}
	}

	if (numberCount) {
		result += +numberCount + 1;
		numberCount = '';
	}
	return result;
};

// answer = cyclically('aBc');
// answer = cyclically('xyz');
// answer = cyclically('aK89');

// B
var twitterHashTags = (function () {
	var hasTagPrefix = 'https://twitter.com/search?q=%23';
	return function (text, words) {
		var i;
		var length;
		var word;

		for (i = 0, length = words.length; i < length; i += 1) {
			word = words[i];

			/**
			 * check that words are not that lengthy (Twitter handles
			 * maximum length of 15 characters).
			 */
			if (word.length > 15) {
				continue;
			}

			text = text.replace(word, `<a href="${hasTagPrefix}${word}">#${word}</a>`)
		}
		return text;
	};
})();

// answer = twitterHashTags('Today news.', ['news']);
// console.log(answer);

// C
function matchPalindromes (words) {
	var results = [];
	var word;
	var wordLength;
	var length;
	var middle;
	var regex;
	var j;
	var i;

	for (i = 0, length = words.length; i < length; i += 1) {
		word = words[i];
		wordLength = word.length;

		if (wordLength === 1) {
			results.push(word);
			continue;
		}

		middle = Math.floor(wordLength / 2);
		regex = word.substring(0, middle) + (wordLength % 2 ? '.' : '');

		for (j = middle - 1; j >= 0; j -= 1) {
			regex += regex[j];
		}

		regex = new RegExp(regex);

		if (regex.test(word)) {
			results.push(word);
			continue;
		}
	}
	return results;
}

// answer = matchPalindromes(['bbcacbb', 'bb', 'a', 'dan', 'danielleinad']);

// Optional
var toLeetSpeak = (function () {
	var codes = {
		l: '1',
		e: '3',
		a: '4',
		t: '7',
		d: 'D',
		n: 'N',
		s: '$',
		p: '|>',
		k: '|<',
	};
	return function (input) {
		var character;
		var length;
		var result = '';
		var code;
		var i;

		input = input.toLowerCase();

		for (i = 0, length = input.length; i < length; i += 1) {
			character = input[i];
			code = codes[character];
			result += code ? code : character;
		}
		return result;
	};
})();

answer = toLeetSpeak('LEET SPEAK');
answer = toLeetSpeak('Leet Speak');
answer = toLeetSpeak('dan');
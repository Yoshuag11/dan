var isPalindrome = function (text) {
	if (text.length <= 1) return true;
	if (text.charAt(0) !== text.charAt(text.length -1)) return false;
	return isPalindrome(text.substring(1, text.length - 1));
};

// console.log(isPalindrome('hoh'));
// console.log(isPalindrome('hooh'));
// console.log(isPalindrome('casaasac'));
// console.log(isPalindrome('nodeseoesedon'));

var global = this;

var sillyFunction = function(recursed) {
	this == global ? console.log('Global scope as expected.') :
		console.log('Where my Global scope went!')
	if (!recursed) { return arguments.callee(true); }
	if (this !== global) {
		console.log('This is: ' + this);
	} else {
		console.log('This is the global.');
	}
}

sillyFunction();

/* Approach to detect whether a value is a function */
function isFunction (fn) {
	return Object.prototype.toString.call(fn) === '[object Function]';
}
	
}
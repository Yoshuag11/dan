// Example of passing a function as argument
function useless (callback) { return callback(); };
// Testing "useless" function
var text = 'Domo arigato!';
assert(
	useless(function () { return text; }) === text,
	`The useless function works! ${text}`);
function consonantCounter(string) {
	var count = 0;
	var regex = /[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]/;

	for (var i = 0; i < string.length; i += 1) {
		if (regex.test(string[i])) {
			count += 1;
		}
	}
	return count;
}
var mySort = (function () {
	function merge (left, right, type) {
		var result = [];
		var leftIndex = 0;
		var rightIndex = 0;
		var lengthL = left.length;
		var lengthR = right.length;
		var leftCount;
		var rightCount;
		var leftItem;
		var rightItem;
		var comparison;
		var leftLength;
		var rightLength;

		function mergeLeft () {
			result.push(left[leftIndex]);
			leftIndex += 1;
		}
		function mergeRight () {
			result.push(right[rightIndex]);
			rightIndex += 1;
		}

		while (leftIndex < lengthL && rightIndex < lengthR) {
			leftItem = left[leftIndex];
			rightItem = right[rightIndex];

			switch (type) {
				// descending
				case 1:
					comparison = leftItem.localeCompare(rightItem);
					comparison = comparison > 0 ? -1 :
						comparison < 0 ? 1 :  comparison;
					break;
				// length ascending
				case 2:
					leftLength = leftItem.length;
					rightLength = rightItem.length;
					comparison = leftLength > rightLength ? 1 :
						leftLength < rightLength ? -1 : 0; 
					break;
				// length descending
				case 3:
					leftLength = leftItem.length;
					rightLength = rightItem.length;
					comparison = leftLength > rightLength ? -1 :
						leftLength < rightLength ? 1 : 0; 
					break;
				// consonants ascending
				case 4:
					leftCount = consonantCounter(leftItem);
					rightCount = consonantCounter(rightItem);
					comparison = leftCount > rightCount ? 1 :
						leftCount < rightCount ? -1 : 0; 
					break;
				// consonants descending
				case 5:
					leftCount = consonantCounter(leftItem);
					rightCount = consonantCounter(rightItem);
					comparison = leftCount > rightCount ? -1 :
						leftCount < rightCount ? 1 : 0; 
					break;
				default:
					comparison = leftItem.localeCompare(rightItem);
			}

			if (comparison > 0) {
				mergeRight();
			} else if (comparison < 0) {
				mergeLeft();
			} else {
				mergeLeft();
				mergeRight();
			}
		}

		if (leftIndex <= lengthL - 1) {
			result = result.concat(left.slice(leftIndex));
		} else if (rightIndex <= lengthR - 1) {
			result = result.concat(right.slice(rightIndex));
		}
		return result;
	}
	return function sort(array, type) {
		var length = array.length;
		if (length === 1) {
			return array;
		}
		var middle = Math.floor(length / 2);
		var left = sort(array.slice(0, middle), type);
		var right = sort(array.slice(middle), type);
		return merge(left, right, type);
	};

})();

var array = ['eduardo', 'daniel', 'gameros', 'fernanda', 'kasandra',
	'hector', 'gameros'];
var type = 'descendant';
let g = mySort(array);
g = mySort(array, 1);
g = mySort(array, 2);
g = mySort(array, 3);
g = mySort(array, 4);
g = mySort(array, 5);

// 2
function limitFunc (fn, num) {
	var count = 0;
	return function () {
		if (count === num) {
			return;
		}

		count += 1;
		fn.apply(this, arguments);
	};
}

function test () {
	console.log('DAN');
}

// var limited = limitFunc(test, 4);
// limited();
// limited();
// limited();
// limited();
// limited();
// limited();
// limited();

// 3
// HTMLElement.prototype.applyStyle = function (color, fontSize, bgColor) {
// 	// Reference to style element object
// 	var style = this.style;
// 	style.color = color || 'blue';
// 	style.fontSize = fontSize || '1.2em';
// 	style.backgroundColor = bgColor || 'pink';
// }

// 4
function copyProp (objA, objB, propertiesToCopy) {
	var specifiedProperties = propertiesToCopy && propertiesToCopy.length;
	var idx;

	for (var i in objB) {
		if (objB.hasOwnProperty(i)) {
			if (specifiedProperties > 0) {
				idx = propertiesToCopy.indexOf(i);

				if (idx >= 0) {
					objA[i] = objB[i];
					propertiesToCopy.splice(idx, 1);
				}
			} else {
				objA[i] = objB[i];
			}
		}
	}
}

// 5
function hybrid (thing) {
	var tmp = +thing;
	var regex = /[aeiouAEIOU]/;
	var lnRegex = /[eE]/;
	var numbersRegex = /[0-9]/;
	var count = 0;
	var length;
	var i;

	if (!isNaN(tmp)) {
		if (lnRegex.test(tmp)) {
			tmp = Math.log(tmp);
		}

		tmp = tmp.toString();
		length = tmp.length;

		for (i = 0; i < length; i += 1) {
			if (numbersRegex.test(tmp[i])) {
				count += 1;
			}
		}

	} else if (typeof thing === 'string') {
		length = thing.length;

		for (i = 0; i < length; i += 1) {
			if (regex.test(thing[i])) {
				count += 1;
			}
		}
	}
	return count;
}

// g = hybrid(3);
// g = hybrid('-121.82999575930009');
// g = hybrid(-121.82999575930009);
// g = hybrid(1.23e-53);
// g = hybrid('1.23e-53');
// g = hybrid('3');
// g = hybrid('canada');
// g = hybrid('aeiou');
// g = hybrid('pajaro caripocapote');

// 6
function countTreeElements () {}
function Element (parent) {}
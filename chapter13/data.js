
(function () {
	var cache = {};
	var guidCounter = 1;
	var expando = 'data' + new Date().getTime();

	this.getData = function (elem) {
		var guid = elem[expando];

		if (!guid) {
			guid = elem[expando] = guidCounter += 1;
			cache[guid] = {};
		}
		return cache[guid];
	};
	this.removeData = function (elem) {
		var guid = elem[expando];

		if (!guid) {
			return;
		}

		delete cache[guid];

		try {
			delete elem[expando];
		} catch (e) {
			if (elem.removeAttribute) {
				elem.removeAttribute[expando];
			}
		}
	};
})();
(function () {
	var numClicks = 0;
	document.addEventListener('click', function () {
		alert(++numClicks);
	}, false);
})();

// Shorter names
(function (v) {
	Object.extend(v, {
		href: v._getAttr,
		src: v._getAttr,
		type: v._getAttr,
		action: v._getAttrNode,
		src: v._getAttr
		// and so on...
	});
})(Element.attributeTranslations.read.values);
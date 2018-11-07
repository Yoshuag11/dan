function isEventSupported (eventName) {
	var element = document.createElement('div');
	var isSupported;

	eventName = 'on' + eventName;
	isSupported = (eventName in element);

	if (!isSupported) {
		element.setAttribute(eventName, 'return;');
		isSupported = typeof element[eventNamne] === 'function';
	}

	element = null;
	return isSupported;
}
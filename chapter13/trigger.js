function triggerEvent (elem, event) {
	var elemData = getData(elem);
	var parent = elem.parentNode || elem.ownerDocument;

	if (typeof event === 'string') {
		event = { type: event, target: elem };
	}

	event = fixEvent(event);

	if (elemData.dispatcher) {
		elemData.dispatcher.call(elem, event);
	}
	if (parent && !event.isPropagationStopped()) {
		triggerEvent(parent, event);
	} else if (!parent && !event.isDefaultPrevented()) {
		var targetData = getData(event.target);

		if (event.target[event.type]) {
			targetData.disabled = true;

			event.target[event.type]();

			targetData.disabled = false;
		}
	}
}
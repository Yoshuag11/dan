(function () {
	var nextGuid = 1;

	this.addEvent = function (elem, type, fn) {
		var data = getData(elem);

		if (!data.handlers) {
			data.handlers = {};
		}
		if (!data.handlers[type]) {
			data.handlers[type] = [];
		}

		if (!fn.guid) {
			fn.guid = nextGuid++;
		}

		data.handlers[type].push(fn);

		if (!data.dispatcher) {
			data.disabled = false;
			data.dispatcher = function (event) {
				if (data.disabled) {
					return;
				}

				event = fixEvent(event);

				var handlers = data.handlers[event.type];

				if (handlers) {
					for (var n = 0; n < handlers.length; n += 1) {
						handlers[n].call(elem, event);
					}
				}
			}
		}
		if (data.handlers[type].length === 1) {
			if (document.addEventListener) {
				elem.addEventListener(
					type === 'focusin' ? 'focus' :
					  type === 'focusout' ? 'blur' : type,
					data.dispatcher,
					type === 'focusin' || type === 'focusout');
			} else if (document.attachEvent) {
				elem.attachEvent('on' + type, data.dispatcher);
			}
		}
	}
})();
this.removeEvent = function (elem, type, fn) {
	var data = getData(elem);

	if (!data.handlers) {
		return;
	}

	var removeType = function (t) {
		data.handlers[t] = [];
		tidyUp(elem, t);
	};

	if (!type) {
		for (var t in data.handlers) {
			removeType(t);
		}
		return;
	}

	var handlers = data.handlers[type];

	if (!handlers) {
		return;
	}
	if (!fn) {
		removeType(type);
		return;
	}
	if (fn.guid) {
		for (var n = 0; n < handlers.length; n += 1) {
			if (handlers[n].guid === fn.guid) {
				handlers.splice(n--, 1);
			}
		}
	}

	tidyUp(elem, type);
};
function tidyUp (elem, type) {
	function isEmpty (object) {
		for (var prop in object) {
			return false;
		}
		return true;
	}

	var data = getData(elem);

	if (data.handlers[type].length === 0) {
		delete data.handlers[type];

		if (document.removeEventListener) {
			elem.removeEventListener(
				type === 'focusin' ? 'focus' :
				  type === 'focusout' ? 'blur' : type,
				data.dispatcher,
				type === 'focusin' || type === 'focusout');
		} else if (document.detachEvent) {
			elem.detachEvent('on' + type, data.dispatcher);
		}
	}
	if (isEmpty(data.handlers)) {
		delete data.handlers;
		delete data.dispatcher;
	}
	if (isEmpty(data)) {
		removeData(elem);
	}
}
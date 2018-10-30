// 1
function convertToRgb (hexColor) {
	var pattern = /(\w{2})(\w{2})(\w{2})/g;
	var rgbColor;

	function toDecimal(hexadecimal) {
		return parseInt(hexadecimal, 16);
	}

	hexColor.replace(pattern, function (all, col1, col2, col3) {
		rgbColor = `rgb(${toDecimal(col1)}, ${toDecimal(col2)}, ` +
			`${toDecimal(col3)})`;
		return '';
	});
	return rgbColor;
}

// var rgbColor = convertToRgb('#3020ff');

// 2
var transformUSDateFormat = (function () {
	var pattern = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
	var globalLanguage;
	var languageHandler;
	var noZeroPattern = /^0/;
	var formatedDate;
	var holidays = {
		fr: {
			24: 'Lundi de Pâques'
		},
		us: {
			14: 'April fools day'
		}
	}
	var languageHandlers = {
		fr: {
			title: 'French-FR',
			connector (all, day, month, year) {
				languageHandlers.us.convert(month, day, year);
			},
			convert (all, month, day, year) {
				var holiday = holidays.fr[day.replace(noZeroPattern, '') +
						month.replace(noZeroPattern, '')];
				holiday = holiday ? ` (${holiday})` : '';
				formatedDate += `${this.title}: ${day}/${month}/${year}${holiday}`;
			}
		},
		us: {
			title: 'English-US',
			convert (month, day, year) {
				var holiday = holidays.us[day.replace(noZeroPattern, '') +
						month.replace(noZeroPattern, '')];
				holiday = holiday ? ` (${holiday})` : '';
				formatedDate += `${this.title}: ${month}/${day}/${year}${holiday}`;
			}
		}
	};
	return function (date, language, toEnglish) {
		if (!toEnglish && !pattern.test(date)) {
			throw 'Wrong date format';
		}

		globalLanguage = language.toLowerCase();
		languageHandler = languageHandlers[globalLanguage];

		if (toEnglish) {
			formatedDate = `${languageHandler.title}: ${date} → `;
			date.replace(
				languageHandler.pattern || pattern, languageHandler.connector);
		} else {
			formatedDate = `${languageHandlers.us.title}: ${date} → `;
			date.replace(pattern, languageHandler.convert.bind(languageHandler));
		}
		return formatedDate;
	};
})();
// /* US to french: april/second/2022 */
// var newDate = transformUSDateFormat('04/02/2022', 'fr');
// /* US to french: april/third/2022 */
// newDate = transformUSDateFormat('4/3/2018', 'fr');
// /*French to US: first/april/2014 */
// newDate = transformUSDateFormat('1/4/2014', 'fr', true);
// /*French to US (with two-digit format): first/april/2014 */
// newDate = transformUSDateFormat('01/04/2014', 'fr', true);
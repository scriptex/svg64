(function (root, factory) {
	if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
	// @ts-ignore
	else if (typeof define === 'function' && define.amd) define(['svg64'], factory);
	else if (typeof exports === 'object') exports['svg64'] = factory();
	else root['svg64'] = factory();
})(this, function () {
	/**
	 * Code modified from http://www.webtoolkit.info/
	 **/
	var Base64 = {
		characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		encode: function (input) {
			var output = '';
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;

			input = Base64.utf8Encode(input);

			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output =
					output +
					this.characters.charAt(enc1) +
					this.characters.charAt(enc2) +
					this.characters.charAt(enc3) +
					this.characters.charAt(enc4);
			}

			return output;
		},
		utf8Encode: function (string) {
			string = string.replace(/\r\n/g, '\n');
			var utftext = '';

			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if (c > 127 && c < 2048) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}

			return utftext;
		}
	};

	var PREFIX = 'data:image/svg+xml;base64,';

	/**
	 * Detect the type of the provided SVG
	 *
	 * @param  {string | SVGElement} input
	 *
	 * @return {string}
	 */
	var detectInputType = function (input) {
		if (typeof input === 'string') {
			return 'string';
		}

		if (typeof SVGElement !== 'undefined' && input instanceof SVGElement) {
			return 'element';
		}
	};

	/**
	 * Convert SVGElement to base64
	 *
	 * @param  {SVGElement} element
	 *
	 * @return {string}
	 */
	var convertElement = function (element) {
		var XMLS = new XMLSerializer();
		var svg = XMLS.serializeToString(element);

		return getBase64(svg);
	};

	/**
	 * Get the base64 representation of an SVG string or element
	 *
	 * @param  {string} svg - Serialized SVG element or SVG string
	 *
	 * @return {string}
	 */
	var getBase64 = function (svg) {
		return PREFIX + Base64.encode(svg);
	};

	/**
	 * Actually convert the provided SVG
	 *
	 * @param  {string | SVGElement} svg
	 *
	 * @return {string}
	 */
	return function (svg) {
		var type = detectInputType(svg);

		switch (type) {
			case 'string':
				return getBase64(svg);

			case 'element':
				return convertElement(svg);

			default:
				return svg;
		}
	};
});

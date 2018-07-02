/**
 * External dependencies
 */
const btoa = require('btoa');

/**
 * base64 prefix
 */
const PREFIX = 'data:image/svg+xml;base64,';

/**
 * Detect the type of the provided SVG
 *
 * @param  {String|SVGElement} input
 *
 * @return {String}
 */
const detectInputType = input => {
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
 * @return {String}
 */
const convertElement = element => {
	const XMLS = new XMLSerializer();
	const svg = XMLS.serializeToString(element);

	return getBase64(svg);
};

/**
 * Get the base64 representation of an SVG string or element
 *
 * @param  {Strong} svg - Serialized SVG element or SVG string
 *
 * @return {String}
 */
const getBase64 = svg => `${PREFIX}${btoa(svg)}`;

/**
 * Actually convert the provided SVG
 *
 * @param  {String|SVGElement} svg
 *
 * @return {String}
 */
const SVG64 = svg => {
	const type = detectInputType(svg);

	switch (type) {
		case 'string':
			return getBase64(svg);

		case 'element':
			return convertElement(svg);

		default:
			return svg;
	}
};

exports.default = SVG64;

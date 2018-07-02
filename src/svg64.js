const btoa = require('btoa');
const PREFIX = 'data:image/svg+xml;base64,';

const detectInputType = input => {
	if (typeof input === 'string') {
		return 'string';
	}

	if (typeof SVGElement !== 'undefined' && input instanceof SVGElement) {
		return 'element';
	}

	if (typeof input.name === 'string') {
		return 'file';
	}
};

const convertElement = element => {
	const XMLS = new XMLSerializer();
	const svg = XMLS.serializeToString(element);

	return getBase64(svg);
};

const getBase64 = svg => `${PREFIX}${btoa(svg)}`;

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

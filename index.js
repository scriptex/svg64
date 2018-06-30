const PREFIX = 'data:image/svg+xml;base64,';

const detectInputType = input => {
	if ( typeof input === 'string' ) {
		return 'string';
	}

	if ( input instanceof HTMLElement ) {
		return 'element';
	}

	if ( typeof input.name === 'string' ) {
		return 'file';
	}
}

const convertElement = element => {
	const XMLS = new XMLSerializer();
	const svg = XMLS.serializeToString(element);

	return getBase64(svg);
}

const convertFile = file => {
	const svg = readFileSync(file);

	return getBase64(svg);
}

const getBase64 = svg => `${PREFIX}${btoa(svg)}`;

const convertToBase64 = svg => {
	const type = detectInputType(svg);

	switch (type) {
		case 'string': 
			return getBase64(svg);

		case 'element':
			return convertElement(svg);

		case 'file':
			return convertFile(svg);

		default:
			return svg;
	}
}
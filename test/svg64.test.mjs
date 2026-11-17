import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

import packageSvg64 from 'svg64';
import svg64, { convertElement, detectInputType, encode, getBase64, utf8Encode } from '../dist/svg64.modern.js';

const PREFIX = 'data:image/svg+xml;base64,';
const require = createRequire(import.meta.url);

const withGlobals = (overrides, callback) => {
	const descriptors = new Map(
		Object.keys(overrides).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)])
	);

	try {
		for (const [key, value] of Object.entries(overrides)) {
			if (value === undefined) {
				delete globalThis[key];
			} else {
				Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
			}
		}

		return callback();
	} finally {
		for (const [key, descriptor] of descriptors) {
			if (descriptor) {
				Object.defineProperty(globalThis, key, descriptor);
			} else {
				delete globalThis[key];
			}
		}
	}
};

test('utf8Encode preserves ASCII and encodes the UTF-8 byte-length boundaries', () => {
	const input = '\0\u007f\u0080\u07ff\u0800\u20ac\uffff';

	assert.deepEqual(Buffer.from(utf8Encode(input), 'latin1'), Buffer.from(input, 'utf8'));
});

test('utf8Encode handles supplementary and unpaired surrogate characters', () => {
	const input = 'é 中 😀 \ud800\r\nnext';
	const bytes = Buffer.from(utf8Encode(input), 'latin1');

	assert.deepEqual(bytes, Buffer.from(input.replace(/\r\n/g, '\n'), 'utf8'));
});

test('encode matches standard Base64 vectors for every padding case', () => {
	for (const [input, expected] of [
		['', ''],
		['f', 'Zg=='],
		['fo', 'Zm8='],
		['foo', 'Zm9v'],
		['foob', 'Zm9vYg=='],
		['fooba', 'Zm9vYmE='],
		['foobar', 'Zm9vYmFy']
	]) {
		assert.equal(encode(input), expected);
	}
});

test('encode Base64-encodes multibyte and normalized newline text', () => {
	const input = '<svg><text>😀</text></svg>';

	assert.equal(encode(input), Buffer.from(input, 'utf8').toString('base64'));

	const withNewlines = 'first\r\nsecond';

	assert.equal(encode(withNewlines), Buffer.from('first\nsecond', 'utf8').toString('base64'));
});

test('svg64 and getBase64 add the data URL prefix for empty and non-empty strings', () => {
	for (const input of ['', '<svg><text>hello</text></svg>']) {
		const expected = PREFIX + Buffer.from(input, 'utf8').toString('base64');

		assert.equal(getBase64(input), expected);
		assert.equal(svg64(input), expected);
		assert.equal(detectInputType(input), 'string');
	}

	const input = '<svg><text>one\r\ntwo</text></svg>';

	assert.equal(svg64(input), PREFIX + Buffer.from(input.replace(/\r\n/g, '\n'), 'utf8').toString('base64'));
});

test('SVG elements are detected, serialized, and encoded', () => {
	const serialized = '<svg><text>😀</text></svg>';
	const expected = PREFIX + Buffer.from(serialized, 'utf8').toString('base64');

	class MockSVGElement {}

	const element = new MockSVGElement();

	let serializationCount = 0;

	class MockXMLSerializer {
		serializeToString(input) {
			assert.equal(input, element);
			serializationCount++;
			return serialized;
		}
	}

	withGlobals({ SVGElement: MockSVGElement, XMLSerializer: MockXMLSerializer }, () => {
		assert.equal(detectInputType(element), 'element');
		assert.equal(convertElement(element), expected);
		assert.equal(serializationCount, 1);
		assert.equal(svg64(element), expected);
		assert.equal(serializationCount, 2);
	});
});

test('unsupported inputs are not detected and are returned unchanged by svg64', () => {
	const input = { notAnSvg: true };

	withGlobals({ SVGElement: undefined }, () => {
		assert.equal(detectInputType(input), undefined);
		assert.equal(svg64(input), input);
	});
});

test('package default export is callable from ESM and TypeScript-compatible CommonJS', () => {
	const input = '<svg><text>hello</text></svg>';
	const expected = PREFIX + Buffer.from(input, 'utf8').toString('base64');
	const commonJSExport = require('svg64');
	const defaultImport = commonJSExport.__esModule ? commonJSExport : { default: commonJSExport };

	assert.equal(packageSvg64(input), expected);
	assert.equal(typeof commonJSExport, 'function');
	assert.equal(commonJSExport(input), expected);
	assert.equal(commonJSExport.default, commonJSExport);
	assert.equal(typeof defaultImport.default, 'function');
	assert.equal(defaultImport.default(input), expected);
	assert.equal(commonJSExport.encode(input), encode(input));
});

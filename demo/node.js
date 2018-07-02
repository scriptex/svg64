const SVG64 = require('../src/svg64').default;
const { readFileSync } = require('fs');

const svg = readFileSync('./demo/loader.svg', 'utf-8');
const result = SVG64(svg);

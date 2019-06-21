const svg64 = require('../dist/svg64');
const { readFileSync } = require('fs');

const svg = readFileSync('./loader.svg', 'utf-8');
const result = svg64(svg);

console.log(result);

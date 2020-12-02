const { resolve } = require('path');
const { readFileSync } = require('fs');

const svg64 = require('../dist/svg64');

const svg = readFileSync(resolve(__dirname, 'loader.svg'), 'utf-8');
const result = svg64(svg);

console.log(result);

'use strict';

const bundle = require('./dist/svg64.cjs');
const svg64 = bundle.default;

Object.assign(svg64, bundle);
Object.defineProperty(svg64, '__esModule', { value: true });

module.exports = svg64;

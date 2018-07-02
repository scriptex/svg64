[![GitHub stars](https://img.shields.io/github/stars/scriptex/svg64.svg?style=social&label=Stars)](https://github.com/scriptex/svg64)
[![GitHub forks](https://img.shields.io/github/forks/scriptex/svg64.svg?style=social&label=Fork)](https://github.com/scriptex/svg64/network#fork-destination-box)
[![GitHub release](https://img.shields.io/github/release/scriptex/svg64.svg)](https://github.com/scriptex/svg64/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/scriptex/svg64.svg)](https://github.com/scriptex/svg64/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/svg64.svg)](https://github.com/scriptex/svg64/commits/master)
[![Github file size](https://img.shields.io/github/size/scriptex/svg64/dist/svg64.min.js.svg)](https://github.com/scriptex/svg64)
[![Build Status](https://travis-ci.org/scriptex/svg64.svg?branch=master)](https://travis-ci.org/scriptex/svg64)
[![npm](https://img.shields.io/npm/dt/svg64.svg)](https://www.npmjs.com/package/svg64)
[![npm](https://img.shields.io/npm/v/svg64.svg)](https://www.npmjs.com/package/svg64)
[![license](https://img.shields.io/github/license/scriptex/svg64.svg)](https://github.com/scriptex/svg64)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/scriptex/svg64/README.md)](https://github.com/scriptex/svg64/)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/scriptex/svg64/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/scriptex/svg64/graphs/commit-activity)
[![Greenkeeper badge](https://badges.greenkeeper.io/scriptex/svg64.svg)](https://greenkeeper.io/)

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/scriptex/)

# SVG64

Convert SVG to base64 anywhere

## About

If you, like me, are using lots of SVGs when developing, you might have come to a point where you need your SVG used as background image or embedded in your javascript file. The only way to do this is to convert your SVG file to a base64 string and then use it where needed. This package does exactly this - it converts SVGs to base64.

This package works in a browser and in a Node environment. Please read along to understand how.

## Install

```sh
npm i svg64
```

or

```sh
yarn add svg64
```

or

just download this repository and use the files located in `dist` folder.

## Usage

### In a browser:

```javascript
// This is your SVG DOM element
const svg = document.getElementById('svg');

// This is your DOM element that needs SVG background image
const demo = document.getElementById('demo');

// This is your SVG in base64 representation
const base64fromSVG = SVG64(svg);

// Add the base64 image as a background to your element
demo.style.backgroundImage = `url(${base64fromSVG})`;
```

### In Node:

```javascript
// Require svg64
const SVG64 = require('../src/svg64').default;

// Import `readFileSync` from the file system module
const { readFileSync } = require('fs');

// Read your SVG file's contents
const svg = readFileSync('./demo/loader.svg', 'utf-8');

// This is your SVG in base64 representation
const base64fromSVG = SVG64(svg);
```

## Demo

There is a simple demo illustrating how the SVG64 library works in browser.

Check it out [here](https://github.com/scriptex/svg64/blob/master/demo/index.html)

There is a simple demo illustrating how the SVG64 library works in Node.

Check it out [here](https://github.com/scriptex/svg64/blob/master/demo/node.js)

## LICENSE

MIT

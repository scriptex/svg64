[![GitHub release](https://img.shields.io/github/release/scriptex/svg64.svg)](https://github.com/scriptex/svg64/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/scriptex/svg64.svg)](https://github.com/scriptex/svg64/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/svg64.svg)](https://github.com/scriptex/svg64/commits/master)
[![Github file size](https://img.shields.io/github/size/scriptex/svg64/dist/svg64.js.svg)](https://github.com/scriptex/svg64)
[![Build Status](https://travis-ci.com/scriptex/svg64.svg?branch=master)](https://travis-ci.com/scriptex/svg64)
[![npm](https://img.shields.io/npm/dt/svg64.svg)](https://www.npmjs.com/package/svg64)
[![npm](https://img.shields.io/npm/v/svg64.svg)](https://www.npmjs.com/package/svg64)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/scriptex/svg64/README.md)](https://github.com/scriptex/svg64/)

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

just download this repository and use the files located in `dist` folder

or unclude it from unpkg.com

```html
<script src="https://unpkg.com/svg64"></script>
```

## Usage

### In a browser:

```javascript
// This is your SVG DOM element
const svg = document.getElementById('svg');

// This is your DOM element that needs SVG background image
const demo = document.getElementById('demo');

// This is your SVG in base64 representation
const base64fromSVG = window.svg64(svg);

// Add the base64 image as a background to your element
demo.style.backgroundImage = `url(${base64fromSVG})`;
```

### In Node:

```javascript
// Require svg64
const svg64 = require('svg64');

// Import `readFileSync` from the file system module
const { readFileSync } = require('fs');

// Read your SVG file's contents
const svg = readFileSync('./file.svg', 'utf-8');

// This is your SVG in base64 representation
const base64fromSVG = svg64(svg);
```

## Demo

There is a simple demo illustrating how the SVG64 library works in browser.

Check it out [here](https://github.com/scriptex/svg64/blob/master/demo/index.html)

There is a simple demo illustrating how the SVG64 library works in Node.

Check it out [here](https://github.com/scriptex/svg64/blob/master/demo/node.js)

## Support this project

[![Tweet](https://img.shields.io/badge/Tweet-Share_this_repository-blue.svg?style=flat-square&logo=twitter&color=38A1F3)](https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20software%20project%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex%2Fsvg64&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome)
[![Donate](https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?style=flat-square&logo=paypal&color=222d65)](https://www.paypal.me/scriptex)
[![Become a Patron](https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?style=flat-square&logo=patreon&color=e64413)](https://www.patreon.com/atanas)

## LICENSE

MIT

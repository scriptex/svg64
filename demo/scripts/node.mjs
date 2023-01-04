import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

import svg64 from '../dist/svg64.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svg = readFileSync(resolve(__dirname, '..', 'assets', 'loader.svg'), 'utf-8');
const result = svg64(svg);

console.log(result);

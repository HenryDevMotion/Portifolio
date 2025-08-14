#!/usr/bin/env node

import { ecoMe } from '../src/eco-me.js';

const args = process.argv.slice(2).join(' ');
ecoMe(args);
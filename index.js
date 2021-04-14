#!/usr/bin/env node
import { execSync } from 'child_process';
import { rmdirSync, readFileSync, writeFileSync } from 'fs';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
    .locale('en')
    .option('remove', {
        alias: ['r'],
        type: 'boolean',
        description: 'Remove .git folder',
    })
    .option('init', {
        alias: ['i'],
        type: 'boolean',
        description: 'Git init',
    })
    .argv;

execSync('git clone https://github.com/sharo-jef/node-template .');
if (argv.remove) {
    rmdirSync('.git', { recursive: true });
}
if (argv.init) {
    execSync('rm -rf .git');
    execSync('git init');
}
execSync('npm i');

const p = JSON.parse(readFileSync('package.json', 'utf-8'));
p.name = process.cwd().split(/\/|\\\\/g).pop();
writeFileSync('package.json', JSON.stringify(p, null, 4));

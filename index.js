#!/usr/bin/env node
import { execSync } from 'child_process';

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
    execSync('rm -rf .git');
}
if (argv.init) {
    execSync('rm -rf .git');
    execSync('git init');
}
execSync('npm i');

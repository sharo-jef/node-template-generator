#!/usr/bin/env node
import { execSync } from 'child_process';
import { rmSync, readFileSync, writeFileSync, mkdirSync, renameSync, readdirSync } from 'fs';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
    .locale('en')
    .option('init', {
        alias: ['i'],
        type: 'boolean',
        description: 'Git init',
    })
    .argv;
try {
    mkdirSync('./tmp');
} catch {
    console.error('Generation failed.')
    process.exit(1);
}
execSync('git clone https://github.com/sharo-jef/node-template ./tmp');
try {
    rmSync('./tmp/.git', { recursive: true, force: true });
    readdirSync('./tmp')
        .forEach(file => renameSync(`./tmp/${file}`, `./${file}`));
    rmSync('./tmp', { recursive: true, force: true });
} catch {}
if (argv.init) {
    try {
        rmSync('.git', { recursive: true, force: true });
    } catch {}
    execSync('git init');
}
execSync('npm i');

const p = JSON.parse(readFileSync('package.json', 'utf-8'));
p.name = process.cwd().split(/\/|\\/g).pop();
p.description = process.cwd().split(/\/|\\/g).pop();
writeFileSync('package.json', JSON.stringify(p, null, 4));

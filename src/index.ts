#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import yargs from 'yargs/yargs';

const argv = yargs(process.argv.slice(2))
  .option('input', {
    type: 'string',
    alias: 'i',
    describe: 'Specific the input folder',
  })
  .option('output', {
    type: 'string',
    alias: 'o',
    describe: 'Specific the output folder',
  })
  .option('width', {
    type: 'number',
    alias: 'w',
    describe: 'Width for photo to be resized',
  })
  .demandOption(['input'], 'Please specify the input folder')
  .help()
  .parseSync();

const input = `${argv.input}`;
const output = argv.output ? `${argv.output}` : `${argv.input}/resized_photos`;
const width = argv.width ? argv.width : 1000;

const format = 'jpeg';

// check for input and output folders
if (!fs.existsSync(input)) {
  fs.mkdirSync(input);
}
if (!fs.existsSync(output)) {
  fs.mkdirSync(output);
}

// read the files in the input directory
fs.readdir(input, (err: Error | null, files: string[]) => {
  if (err) {
    console.log('There was an error reading files from the input folder');
  }
  const inputCount = fs.readdirSync(input).length;
  let currentCount = 0;

  files.forEach((file) => {
    const extension = path.extname(file);
    const baseFilename = path.basename(file, extension);
    const inputFile = `${input}/${file}`;
    const outputFile = `${output}/${baseFilename}`;

    sharp(inputFile)
      .toFormat(format)
      .resize(width, width, { fit: 'inside' })
      .toFile(`${outputFile}-w${width}.${format}`)
      .then(() => {
        currentCount += 1;
        console.log(
          `Successfully created ${currentCount} of ${inputCount}: ${outputFile}-w${width}.${format}`,
        );
      })
      .catch((error: Error) => {
        console.log(error);
      });
  });
});

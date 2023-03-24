#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const yargs = require('yargs/yargs');

const argv = yargs(process.argv.slice(2))
  .option('input', {
    alias: 'i',
    describe: 'Specific the input folder',
  })
  .option('output', {
    alias: 'o',
    describe: 'Specific the output folder',
  })
  .option('width', {
    alias: 'w',
    describe: 'Width for photo to be resized',
  })
  .demandOption(['input'], 'Please specify the input folder')
  .help().argv;

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
fs.readdir(input, async (err: Error, files: string[]) => {
  if (err) {
    console.log('There was an error reading files from the input folder');
  }
  const inputCount = fs.readdirSync(input).length;
  let currentCount = 0;

  for (const file of files) {
    const extension = path.extname(file);
    const baseFilename = path.basename(file, extension);
    const inputFile = `${input}/${file}`;
    const outputFile = `${output}/${baseFilename}`;

    await sharp(inputFile)
      .toFormat(format)
      .resize(width, width, { fit: 'inside' })
      .toFile(`${outputFile}-w${width}.${format}`)
      .then(() => {
        currentCount++;
        console.log(
          `Successfully created ${currentCount} of ${inputCount}: ${outputFile}-w${width}.${format}`,
        );
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
});

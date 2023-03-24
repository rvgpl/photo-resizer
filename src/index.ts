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
  .demandOption(['input'], 'Please specify the input folder')
  .help().argv;

const input = `${argv.input}/`;
const output = argv.output ? `${argv.output}/` : `${argv.input}/resized_photos/`;

const sizes = [1200];
const formats = ['jpeg'];

// check for input and output folders
if (!fs.existsSync(input)) {
  fs.mkdirSync(input);
}
if (!fs.existsSync(output)) {
  fs.mkdirSync(output);
}

// read the files in the input directory
fs.readdir(input, (err: Error, files: string[]) => {
  if (err) {
    console.log('There was an error reading files from the input folder');
  }
  const inputCount = fs.readdirSync(input).length;
  const totalCount = sizes.length * formats.length * inputCount;
  let currentCount = 0;

  files.forEach(async (file) => {
    let extension = path.extname(file);
    let baseFilename = path.basename(file, extension);
    let inputFile = `${input}${file}`;
    let outputFile = `${output}${baseFilename}`;

    sizes.map((size) => {
      formats.map((format) => {
        sharp(inputFile)
          .toFormat(format)
          .resize(size, size, { fit: 'inside' })
          .toFile(`${outputFile}-w${size}.${format}`)
          .then(() => {
            currentCount++;
            console.log(
              `Successfully created ${currentCount} of ${totalCount}: ${outputFile}-w${size}.${format}`,
            );
          })
          .catch((err: Error) => {
            console.log(err);
          });
      });
    });
  });
});

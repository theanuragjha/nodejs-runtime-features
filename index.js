/**
 * Node.js Runtime Features — Streams, Buffers & the File System
 */

const fs = require('fs');
const path = require('path');

// Absolute, OS-safe path to the sample file
const INPUT = path.join(__dirname, 'sample-data.txt');
const OUTPUT = path.join(__dirname, 'sample-copy.txt');

// PART 1: read the whole file into memory
function readWholeFile() {
  fs.readFile(INPUT, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`readFile: loaded ${data.length} bytes into memory at once`);
  });
}

// PART 2: stream the file and pipe it to a writable stream
function streamFile() {
  const readable = fs.createReadStream(INPUT);
  const writable = fs.createWriteStream(OUTPUT);

  readable.pipe(writable);

  writable.on('finish', () => {
    console.log('stream: finished copying via 64KB chunks (peak memory stays flat)');
  });
}

/*
PART 3 - Explanation

fs.readFile loads the entire file into memory before the callback runs, so memory usage grows with the size of the file. A stream reads and writes the file in small chunks, so only a small portion is kept in memory at any moment. This keeps peak memory usage almost flat even for very large files.
*/

// Run both examples
readWholeFile();
streamFile();
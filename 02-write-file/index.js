const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/02-write-file.txt';
const exitCommand = '.exit';
const message = 'Goodbye!';

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Welcome! Enter text or type ".exit" to quit.');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input === exitCommand) {
    console.log(message);
    rl.close();
  } else {
    writeStream.write(input + '\n');
  }
});

rl.on('close', () => {
  writeStream.end();
});

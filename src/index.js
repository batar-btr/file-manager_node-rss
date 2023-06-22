import { argv } from 'process'
import { stdout } from 'process';
import * as url from 'url';
import * as path from 'path';
import * as readline from 'node:readline/promises';
import {
  stdin as input,
  stdout as output,
} from 'node:process';
import invalidInput from './utils/invalid-input.js';

let userName;

const greetingsMessage = 'Welcome to the File Manager, Username!';
const goodbyeMessage = '\nThank you for using File Manager, Username, goodbye!';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export let __currentDir = __dirname;

const commands = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress', '.exit'];

const showGreetings = name => greetingsMessage.replace('Username', name) + '\n';
const showGoodbye = name => goodbyeMessage.replace('Username', name) + '\n';
const showDirectory = path => `You are currently in ${path}\n`;



try {
  userName = argv[2].split('=')[1];
  stdout.write(showGreetings(userName));
  stdout.write(showDirectory(__dirname));
} catch (error) {
  console.log('Enter valid start command: "npm run start -- --username=your_username" ');
}

const rl = readline.createInterface({ input, output });

rl.on('line', data => {
  const command = data.split(' ')[0];
  if (commands.includes(command)) {
    stdout.write( showDirectory(__currentDir));
  } else {
    invalidInput();
  }
});
rl.on('close', () => stdout.write(showGoodbye(userName)));


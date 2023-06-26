import { argv } from 'process'
import { stdout } from 'process';
import * as url from 'url';
import { homedir } from 'os';
import * as readline from 'node:readline/promises';
import {
  stdin as input,
  stdout as output,
} from 'node:process';
import invalidInput from './utils/invalid-input.js';
import up from './nwd/up.js';
import cd from './nwd/cd.js';
import ls from './nwd/ls.js';
import cat from './basic/cat.js';
import add from './basic/add.js';
import rn from './basic/rename.js';
import cp from './basic/cp.js';
import mv from './basic/mv.js';
import rm from './basic/rm.js';
import os from './os/os.js';
import hash from './hash/hash.js';
import compress from './zip/compress.js';
import decompress from './zip/decompress.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export let __currentDir = homedir();

const startApp = async () => {
  let userName;

  const greetingsMessage = 'Welcome to the File Manager, Username!';
  const goodbyeMessage = '\nThank you for using File Manager, Username, goodbye!';
  const commands = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress', '.exit'];

  const showGreetings = name => greetingsMessage.replace('Username', name) + '\n';
  const showGoodbye = name => goodbyeMessage.replace('Username', name) + '\n';
  const showDirectory = path => `You are currently in ${path}\n`;

  try {
    userName = argv[2].split('=')[1];
    stdout.write(showGreetings(userName));
    stdout.write(showDirectory(__currentDir));
  } catch (error) {
    console.log('Enter valid start command: "npm run start -- --username=your_username" ');
  }

  const rl = readline.createInterface({ input, output });

  rl.on('line', async data => {
    const [command, ...args] = data.split(' ');
    if (commands.includes(command)) {
      switch (command) {
        case 'up':
          __currentDir = up(__currentDir);
          break;
        case 'cd':
          __currentDir = await cd(args, __currentDir);
          break;
        case 'ls':
          await ls(__currentDir, ...args);
          break;
        case 'cat':
          await cat(__currentDir, ...args);
          break;
        case 'add':
          await add(__currentDir, ...args);
          break;
        case 'rn':
          await rn(__currentDir, ...args);
          break;
        case 'cp':
          await cp(__currentDir, ...args);
          break;
        case 'mv':
          await mv(__currentDir, ...args);
          break;
        case 'rm':
          await rm(__currentDir, ...args);
          break;
        case 'os':
          await os(__currentDir, ...args);
          break;
        case 'hash':
          await hash(__currentDir, ...args);
          break;
        case 'compress':
          await compress(__currentDir, ...args);
          break;
        case 'decompress':
          await decompress(__currentDir, ...args);
          break;
        case '.exit': {
          rl.close();
          return;
        }
      }
      stdout.write(showDirectory(__currentDir));
    } else {
      invalidInput();
    }
  });
  rl.on('close', () => stdout.write(showGoodbye(userName)));
}

startApp();

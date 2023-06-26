import { argv } from 'process'
import { homedir } from 'os';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import invalidInput from './utils/invalid-input.js';
import * as commands from './commands/index.js';


const startApp = async () => {

  let __currentDir = homedir();

  const showGreetings = name => `Welcome to the File Manager, ${name}!`;
  const showGoodbye = name => `Thank you for using File Manager, ${name}, goodbye!`;
  const showDirectory = path => `You are currently in ${path}\n`;

  try {
    let userName = argv[2].split('=')[1];
    console.log(showGreetings(userName));
    console.log(showDirectory(__currentDir));

    const rl = readline.createInterface({ input, output });

    rl.on('line', async data => {

      const [command, ...args] = data.split(' ');

      if (Object.keys(commands).includes(command)) {

        if (command === 'up' || command === 'cd') {
          __currentDir = await commands[command](__currentDir, ...args);
        } else {
          await commands[command](__currentDir, ...args);
        }

        console.log(showDirectory(__currentDir));

      } else if (command === '.exit') {
        rl.close();
        return;
      } else {
        invalidInput();
      }
    });

    rl.on('close', () => console.log(showGoodbye(userName)));
    
  } catch (error) {
    console.log('Enter valid start command: "npm run start -- --username=your_username" ');
  }
}

startApp();

import * as OS from 'os';
import operationFailed from '../utils/operation-failed.js';

export default async function os(currentDir, command) {
  try {
    switch (command) {
      case '--EOL':
        console.log(`Default system End-Of-Line: ${JSON.stringify(OS.EOL)}`);
        break;
      case '--cpus':
        console.log(OS.cpus().map(({ model, speed }) => ({ model, speed })));
        break;
      case '--homedir':
        console.log(OS.homedir());
        break;
      case '--username':
        const { username } = OS.userInfo();
        console.log(`System username: ${username}`);
        break;
      case '--architecture': {
        console.log(`CPU architecture: ${OS.arch()}`);
        break;
      }
      default:
        operationFailed();
        break;
    }
  } catch {
    operationFailed();
  }
}
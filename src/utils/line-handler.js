import { stdout } from 'process';
import { __currentDir } from '..';

const lineHandler = data => {
  stdout.write( __currentDir + '\n');
  stdout.write(data + '\n');
}

export default lineHandler;
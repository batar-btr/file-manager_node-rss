import { createReadStream } from 'fs';
import path from 'path';
import operationFailed from '../utils/operation-failed.js';

export default async function cat(data, currentDir) {
  return new Promise((res) => {
    let arg = data.split(' ')[1];
    console.log(arg);
    const filepath = path.resolve(currentDir, arg);
    console.log(filepath);
    
      const readableStream = createReadStream(filepath, { encoding: 'utf-8' });

      readableStream.on('data', chunk => console.log(chunk));

      readableStream.on('error', () => {
        operationFailed();
        res(currentDir);
      });
      readableStream.on('end', () => res(currentDir));
    
  })
}
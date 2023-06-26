import { createReadStream } from 'fs';
import path from 'path';
import operationFailed from '../utils/operation-failed.js';

export default async function cat(currentDir, pathToFile) {
  return new Promise((res) => {

    const filepath = path.resolve(currentDir, pathToFile);

    const readableStream = createReadStream(filepath, { encoding: 'utf-8' });

    readableStream.on('data', chunk => console.log(chunk));

    readableStream.on('error', () => {
      operationFailed();
      res();
    });
    readableStream.on('end', () => res());

  })
}
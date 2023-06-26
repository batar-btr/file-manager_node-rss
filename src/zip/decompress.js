import { resolve, parse } from 'path'
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import operationFailed from '../utils/operation-failed.js';
import { pipeline } from 'stream/promises';

export default async function decompress(currentDir, from, to) {
  try {
    const pathFrom = resolve(currentDir, from);
    const { name } = parse(pathFrom);
    const pathTo = resolve(currentDir, to, name);

    const readStream = createReadStream(pathFrom);
    const writeStrem = createWriteStream(pathTo);
    const brotliDecompress = createBrotliDecompress();

    await pipeline(readStream, brotliDecompress, writeStrem);
    console.log(`File decompress to ${pathTo}`);

  } catch {
    operationFailed()
  }
}
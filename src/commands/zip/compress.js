import { resolve, parse } from 'path'
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import operationFailed from '../../utils/operation-failed.js';
import { pipeline } from 'stream/promises';

export default async function compress(currentDir, from, to) {
  try {
    const pathFrom = resolve(currentDir, from);
    const { base } = parse(pathFrom);
    const pathTo = resolve(currentDir, to, base + '.br');
    console.log(pathTo);

    const readStream = createReadStream(pathFrom, { encoding: 'utf-8' });
    const writeStrem = createWriteStream(pathTo);
    const brotliCompress = createBrotliCompress();

    await pipeline(readStream, brotliCompress, writeStrem);
    console.log(`File compress to ${pathTo}`);

  } catch {
    operationFailed()
  }
}
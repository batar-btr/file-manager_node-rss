import path from 'path';
import { createReadStream, createWriteStream, rm } from 'fs'
import operationFailed from '../utils/operation-failed.js';

export default async function mv(currentDir, from, to) {
  return new Promise(res => {
    try {
      const pathFrom = path.resolve(currentDir, from);
      const { base } = path.parse(pathFrom);
      const pathTo = path.resolve(currentDir, to, base);

      const streamFrom = createReadStream(pathFrom);
      const streamTo = createWriteStream(pathTo);

      streamFrom.on('error', operationFailed);
      streamTo.on('error', operationFailed);

      streamTo.on('finish', () => {
        console.log(`the file moved to ${pathTo}`);
        rm(pathFrom, err => {
          if(err) operationFailed();
          res();
        });
      });

      streamFrom.pipe(streamTo);

    } catch {
      operationFailed();
    }
  })
}
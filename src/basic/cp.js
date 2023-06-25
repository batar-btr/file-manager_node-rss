import path from 'path'
import { copyFile, createReadStream, createWriteStream } from 'fs';
import operationFailed from '../utils/operation-failed.js';

export default async function cp(currentDir, from, to) {
  return new Promise(res => {
    try {
      const pathFrom = path.resolve(currentDir, from);
      const { base } = path.parse(pathFrom);
      const pathTo = path.resolve(currentDir, to, base);

      const streamFrom = createReadStream(pathFrom);
      const streamTo = createWriteStream(pathTo);

      streamTo.on('finish', () => {
        console.log(`the file was copied to ${pathTo}`);
        res()
      });

      streamFrom.pipe(streamTo);

    } catch {
      operationFailed();
    }
  })

}
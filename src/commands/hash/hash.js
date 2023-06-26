import path from 'path';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import operationFailed from '../../utils/operation-failed.js';

export default async function hash(currentDir, pathToFile) {
  try {
    const data = await readFile(path.resolve(currentDir, pathToFile), 'utf-8');
    const hash = createHash('sha256').update(data).digest('hex');
    console.log(hash);

  } catch (error) {
    operationFailed()
  }
}
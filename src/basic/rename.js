import path from 'path';
import { rename } from 'fs/promises';
import operationFailed from '../utils/operation-failed.js';

export default async function rn(currentDir, pathToFile, newFilename) {
  try {
    const oldFile = path.join(currentDir, pathToFile);
    const newFile = path.join(currentDir, newFilename);
    await rename(oldFile, newFile);
  } catch {
    operationFailed();
  }
}
import path from 'path';
import { rm as remove } from 'node:fs/promises';
import operationFailed from '../utils/operation-failed.js';

export default async function rm(currentDir, pathToFile) {
  try {
    const pathToRemove = path.resolve(currentDir, pathToFile);
    await remove(pathToRemove);
    console.log('File removed');
  } catch {
    operationFailed();
  }
}
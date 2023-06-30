import { writeFile } from 'node:fs/promises';
import path from 'path';
import operationFailed from '../../utils/operation-failed.js';

export default async function add(currentDir, filename) {
  
  try {
    const filePath = path.join(currentDir, filename);
    await writeFile(filePath, '');
    console.log('File added!')
  } catch (error) {
    operationFailed();
  }
}
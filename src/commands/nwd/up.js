import path from 'path';
import operationFailed from '../../utils/operation-failed.js';

export default async function up(currentDir) {
  try {
    const { root } = path.parse(currentDir);
    const rootPath = path.join(root);
    if (rootPath === currentDir) {
      return currentDir;
    } else {
      return path.join(currentDir, '..');
    }
  } catch(error) {
    console.log(error)
    operationFailed();
  }
}
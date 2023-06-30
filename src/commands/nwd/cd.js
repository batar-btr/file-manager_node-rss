import path from 'path';
import isExist from '../../utils/is-exist.js';
import operationFailed from '../../utils/operation-failed.js';

export default async function cd(currentDir, pathTo) {
  try {
    const newDir = path.resolve(currentDir, pathTo);

    const isFolderExist = await isExist(newDir);
    if (isFolderExist) {
      return newDir;
    } else {
      operationFailed();
      return currentDir;
    }

  } catch {
    operationFailed();
  }
}
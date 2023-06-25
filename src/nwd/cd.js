import path from 'path';
import isExist from '../utils/is-exist.js';
import operationFailed from '../utils/operation-failed.js';

export default async function cd(args, currentDir) {
  const pathArg = args?.[0];
  const newDir = path.resolve(currentDir, pathArg);
  
  const isFolderExist = await isExist(newDir);

  if (isFolderExist) {
    return newDir;
  } else {
    operationFailed();
    return currentDir;
  }
}
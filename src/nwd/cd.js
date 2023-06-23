import path from 'path';
import isExist from '../utils/is-exist.js';
import operationFailed from '../utils/oeration-failed.js';

export default async function cd(data, currentDir) {
  const pathArg = `${data.split(' ')?.[1]}`;
  const newDir = path.resolve(currentDir, pathArg);
  
  const isFolderExist = await isExist(newDir);
  
  if (isFolderExist) {
    return newDir;
  } else {
    operationFailed();
    return currentDir;
  }
}
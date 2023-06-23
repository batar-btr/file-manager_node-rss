import { __currentDir } from '../index.js';
import path from 'path';

export default function up(str) {
  const { root } = path.parse(str);
  const rootPath = path.join(root);
  if(rootPath === str) {
    return str;
  } else {
    return path.join(str, '..');
  }
}
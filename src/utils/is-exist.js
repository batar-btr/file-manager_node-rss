import {access} from 'node:fs/promises';

const isExist = async path => await access(path)
  .then(() => true)
  .catch(() => false);

export default isExist;
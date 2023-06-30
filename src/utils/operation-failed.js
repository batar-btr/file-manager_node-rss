import { stdout } from 'process';

export default function operationFailed() {
  stdout.write('Operation Failed\n');
}
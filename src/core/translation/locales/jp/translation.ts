import general from './general.json';
import layout from './layout.json';
import verification from './verification.json';

export function generateTranslationFile() {
  return Object.assign({}, layout, general, verification);
}

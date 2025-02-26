import general from './general.json';
import layout from './layout.json';

export function generateTranslationFile() {
  return Object.assign({}, layout, general);
}

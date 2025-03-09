import general from './general.json';
import home from './home.json';
import intro from './intro.json';
import layout from './layout.json';
import projects from './projects.json';
import verification from './verification.json';

export function generateTranslationFile() {
  return Object.assign({}, layout, general, intro, home, verification, projects);
}

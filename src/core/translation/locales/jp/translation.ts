import general from './general.json';
import home from './home.json';
import intro from './intro.json';
import layout from './layout.json';
import projectCategories from './projectCategories.json';
import projects from './projects.json';
import refer from './refer.json';
import settings from './settings.json';
import socialCauses from './socialCauses.json';

export function generateTranslationFile() {
  return Object.assign({}, layout, general, intro, home, projects, settings, socialCauses, projectCategories, refer);
}

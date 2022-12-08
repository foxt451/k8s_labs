import { PRESET } from './enums/presets';
import * as pug from 'pug';

const templatesRoot = 'assets/templates';

export const pugCompilers: Record<PRESET, pug.compileTemplate> = {
  [PRESET.TASK_DEADLINE_COMING]: pug.compileFile(
    `${templatesRoot}/DEADLINE_SOON.pug`,
  ),
};

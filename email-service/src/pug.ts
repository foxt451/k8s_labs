import { PRESET } from './enums/presets';
import * as path from 'path';
import * as pug from 'pug';

const templatesRoot = 'assets/templates';

export const pugCompilers: Record<PRESET, pug.compileTemplate> = {
  [PRESET.TASK_DEADLINE_COMING]: pug.compileFile(
    path.resolve(__dirname, `${templatesRoot}/DEADLINE_SOON.pug`),
  ),
};

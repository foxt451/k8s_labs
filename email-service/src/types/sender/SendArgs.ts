import { PRESET } from 'src/enums/presets';

export type SendArgs = {
  [PRESET.TASK_DEADLINE_COMING]: {
    deadlineDateIso: string;
    taskName: string;
  };
};

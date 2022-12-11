import { PRESET } from 'src/enums/presets';
import { SendArgs } from './SendArgs';

export type SendEventPayload<T extends PRESET> = {
  receivers: string[];
  preset: T;
  args: SendArgs[T];
};

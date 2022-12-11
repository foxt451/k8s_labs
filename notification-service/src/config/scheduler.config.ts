import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface SchedulerConfig {
  dbUrl: string;
}

const schedulerConfiguration = registerAs(
  'scheduler',
  (): SchedulerConfig => ({
    dbUrl: process.env.JOB_QUEUE_DB_URL,
  }),
);

export const schedulerConfigSchema = Joi.object({
  JOB_QUEUE_DB_URL: Joi.string().required(),
});

export default schedulerConfiguration;

import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface KafkaConfig {
  brokerUrl: string;
  emailQueueTopic: string;
  taskQueueTopic: string;
}

const kafkaConfiguration = registerAs(
  'kafka',
  (): KafkaConfig => ({
    brokerUrl: process.env.BROKER_URL,
    emailQueueTopic: process.env.EMAIL_QUEUE_TOPIC,
    taskQueueTopic: process.env.TASK_QUEUE_TOPIC,
  }),
);

export const kafkaConfigSchema = Joi.object({
  BROKER_URL: Joi.string().required(),
  EMAIL_QUEUE_TOPIC: Joi.string().required(),
  TASK_QUEUE_TOPIC: Joi.string().required(),
});

export default kafkaConfiguration;

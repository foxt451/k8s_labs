import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface KafkaConfig {
  brokerUrl: string;
  topic: string;
}

const kafkaConfiguration = registerAs(
  'kafka',
  (): KafkaConfig => ({
    brokerUrl: process.env.BROKER_URL,
    topic: process.env.KAFKA_TOPIC,
  }),
);

export const kafkaConfigSchema = Joi.object({
  BROKER_URL: Joi.string().required(),
  KAFKA_TOPIC: Joi.string().required(),
});

export default kafkaConfiguration;

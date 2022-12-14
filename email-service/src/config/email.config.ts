import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface EMailConfig {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  userTitle: string;
}

const emailConfiguration = registerAs(
  'email',
  (): EMailConfig => ({
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    userTitle: process.env.EMAIL_USER_TITLE,
  }),
);

export const emailConfigSchema = Joi.object({
  EMAIL_AUTH_USER: Joi.string().required(),
  EMAIL_AUTH_PASS: Joi.string().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_USER_TITLE: Joi.string().required(),
});

export default emailConfiguration;

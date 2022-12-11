import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface CredentialsResolutionConfig {
  authServiceUrl: string;
}

const credResolutionConfiguration = registerAs(
  'credres',
  (): CredentialsResolutionConfig => ({
    authServiceUrl: process.env.AUTH_SVC_URL,
  }),
);

export const credResolutionConfigSchema = Joi.object({
  AUTH_SVC_URL: Joi.string().required(),
});

export default credResolutionConfiguration;

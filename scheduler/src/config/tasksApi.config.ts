import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export enum TasksApiEndpoint {
  GET_ALL,
  TEST_INIT_DELAY,
  TEST_TEST_DELAY,
}

interface TasksApiConfig {
  baseUrl: string;
  mock: boolean;
  endpoints: Record<TasksApiEndpoint, string>;
}

const tasksApiConfiguration = registerAs(
  'tasksApi',
  (): TasksApiConfig => ({
    baseUrl: process.env.TASKS_API_BASE_URL || 'http://tasks-service',
    endpoints: {
      [TasksApiEndpoint.GET_ALL]: '/tasks',
      [TasksApiEndpoint.TEST_INIT_DELAY]: '/test/initDelay',
      [TasksApiEndpoint.TEST_TEST_DELAY]: '/test/testDelay',
    },
    mock: process.env.TASKS_API_MOCK === 'true',
  }),
);

export const tasksApiSchema = Joi.object({
  TASKS_API_BASE_URL: Joi.string().uri(),
});

@Injectable()
export class TasksApiConfigService {
  constructor(
    @Inject(tasksApiConfiguration.KEY)
    public config: ConfigType<typeof tasksApiConfiguration>,
  ) {}

  getEndpointUrl(endpoint: TasksApiEndpoint): string {
    return `${this.config.baseUrl}${this.config.endpoints[endpoint]}`;
  }
}

export default tasksApiConfiguration;

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  TasksApiConfigService,
  TasksApiEndpoint,
} from 'src/config/tasksApi.config';

@Injectable()
export class TestService {
  constructor(
    private readonly httpService: HttpService,
    private readonly tasksApiConfig: TasksApiConfigService,
  ) {}

  public async testTasks(): Promise<void> {
    const endpoint = this.tasksApiConfig.getEndpointUrl(
      TasksApiEndpoint.TEST_TEST_DELAY,
    );
    await firstValueFrom(this.httpService.get(endpoint));
  }

  public async initDelayToTasks(): Promise<void> {
    const endpoint = this.tasksApiConfig.getEndpointUrl(
      TasksApiEndpoint.TEST_INIT_DELAY,
    );
    await firstValueFrom(this.httpService.get(endpoint));
  }
}

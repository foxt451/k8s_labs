import { HttpModule, HttpService } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { TasksApiConfigService } from 'src/config/tasksApi.config';
import { DI_TOKENS } from 'src/di-tokens';
import { BasicSchedulingAlgorithmService } from './basic-scheduling-algorithm.service';
import { SchedulerController } from './scheduler.controller';
import { SchedulerMockService } from './scheduler.mock.service';
import { ISchedulerService, SchedulerService } from './scheduler.service';

export const schedulerService: Provider<ISchedulerService> = {
  provide: DI_TOKENS.schedulerService,
  useFactory: (
    tasksApiConfig: TasksApiConfigService,
    httpService: HttpService,
    basicAlgo: BasicSchedulingAlgorithmService,
  ) => {
    if (tasksApiConfig.config.mock) {
      return new SchedulerMockService(basicAlgo);
    }
    return new SchedulerService(tasksApiConfig, httpService, basicAlgo);
  },
  inject: [TasksApiConfigService, HttpService, BasicSchedulingAlgorithmService],
};

@Module({
  imports: [HttpModule],
  providers: [
    TasksApiConfigService,
    schedulerService,
    BasicSchedulingAlgorithmService,
  ],
  controllers: [SchedulerController],
})
export class SchedulerModule {}

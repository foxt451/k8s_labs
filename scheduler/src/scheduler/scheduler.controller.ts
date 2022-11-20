import { Controller, Get, Headers, Inject } from '@nestjs/common';
import { Request } from 'express';
import { DI_TOKENS } from 'src/di-tokens';
import { ISchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(
    @Inject(DI_TOKENS.schedulerService)
    private schedulerService: ISchedulerService,
  ) {}

  @Get('/')
  async calculateSchedule(@Headers('authorization') authToken: string) {
    const data = await this.schedulerService.scheduleRemoteTasks(authToken);
    return data;
  }
}

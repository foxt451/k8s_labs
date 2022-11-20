import { Injectable } from '@nestjs/common';
import { ScheduleUnitDto } from 'src/dto/scheduleUnitDto';
import { TaskDto } from 'src/dto/taskDto';
import { BasicSchedulingAlgorithmService } from './basic-scheduling-algorithm.service';
import { mockTasks } from './mock-tasks';
import { ISchedulerService } from './scheduler.service';

@Injectable()
export class SchedulerMockService implements ISchedulerService {
  constructor(
    private readonly basicSchedulingAlgo: BasicSchedulingAlgorithmService,
  ) {}
  async scheduleRemoteTasks(): Promise<ScheduleUnitDto[]> {
    return this.basicSchedulingAlgo.scheduleTasks(
      await this.retrieveCurrentTasks(),
    );
  }
  private readonly tasks: TaskDto[] = mockTasks;

  private async retrieveCurrentTasks(): Promise<TaskDto[]> {
    return this.tasks;
  }
}

import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {
  TasksApiConfigService,
  TasksApiEndpoint,
} from 'src/config/tasksApi.config';
import { ScheduleUnitDto } from 'src/dto/scheduleUnitDto';
import { TaskDto } from 'src/dto/taskDto';
import { BasicSchedulingAlgorithmService } from './basic-scheduling-algorithm.service';
import { AxiosError } from 'axios';

export interface ISchedulerService {
  scheduleRemoteTasks(authToken: string): Promise<ScheduleUnitDto[]>;
}

@Injectable()
export class SchedulerService implements ISchedulerService {
  constructor(
    private readonly tasksApiConfig: TasksApiConfigService,
    private readonly httpService: HttpService,
    private readonly basicSchedulingAlgo: BasicSchedulingAlgorithmService,
  ) {}

  async scheduleRemoteTasks(authToken: string): Promise<ScheduleUnitDto[]> {
    return this.basicSchedulingAlgo.scheduleTasks(
      await this.retrieveCurrentTasks(authToken),
    );
  }

  public async retrieveCurrentTasks(authToken: string): Promise<TaskDto[]> {
    const endpoint = this.tasksApiConfig.getEndpointUrl(
      TasksApiEndpoint.GET_ALL,
    );
    const { data } = await firstValueFrom(
      this.httpService
        .get<TaskDto[]>(endpoint, {
          headers: {
            authorization: authToken,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response.status === HttpStatus.UNAUTHORIZED) {
              throw new UnauthorizedException('Incorrect token');
            }
            throw error;
          }),
        ),
    );
    return data;
  }
}

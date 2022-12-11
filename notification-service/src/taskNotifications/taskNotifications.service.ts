import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import kafkaConfiguration from 'src/config/kafka.config';
import { EmailResolutionService } from 'src/credentials-resolution-services/email-resolution-service.service';
import { PRESET } from 'src/enums/presets';
import {
  SchedulerService,
  SCHEDULE_NAME,
  SCHEDULE_TYPE,
} from 'src/scheduler/scheduler.service';
import { SendEventPayload } from 'src/types/sender/SendEventPayload';
import { TaskTopicItem } from 'src/types/tasks/TaskTopicItem';

@Injectable()
export class TaskNotificationsService {
  private readonly logger = new Logger(TaskNotificationsService.name);
  private readonly DEADLINE_NOTIFICATION_OFFSET_SEC = 60 * 60 * 24;

  constructor(
    private scheduler: SchedulerService,
    @Inject('KAFKA_CLIENT') private kafkaClient: ClientKafka,
    @Inject(kafkaConfiguration.KEY)
    private kafkaConfig: ConfigType<typeof kafkaConfiguration>,
    private emailResolutionService: EmailResolutionService,
  ) {
    this.scheduler.defineAction<TaskTopicItem>(async (task) => {
      this.kafkaClient.emit<
        never,
        SendEventPayload<PRESET.TASK_DEADLINE_COMING>
      >(this.kafkaConfig.emailQueueTopic, {
        receivers: [
          await this.emailResolutionService.resolveEmailByUID(task.task.userId),
        ],
        args: {
          deadlineDateIso: task.task.dueDate,
          taskName: task.task.title,
        },
        preset: PRESET.TASK_DEADLINE_COMING,
      });
    }, SCHEDULE_NAME.DEADLINE_NOTIFICATION);
  }

  public async scheduleDeadlineNotification(payload: TaskTopicItem) {
    this.logger.log(
      `Scheduling a deadline email for task with id: ${payload.task.id}`,
    );
    await this.scheduler.scheduleTask<
      SCHEDULE_NAME.DEADLINE_NOTIFICATION,
      TaskTopicItem
    >(
      SCHEDULE_NAME.DEADLINE_NOTIFICATION,
      payload,
      new Date(
        new Date(payload.task.dueDate).getTime() -
          this.DEADLINE_NOTIFICATION_OFFSET_SEC * 1000,
      ),
      SCHEDULE_TYPE.ONCE,
    );
  }
}

import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TaskNotificationsService } from './taskNotifications.service';
import { config } from 'dotenv';
import { TaskTopicItem } from 'src/types/tasks/TaskTopicItem';

config();

@Controller('taskNotifications')
export class TaskNotificationsController {
  private readonly logger = new Logger(TaskNotificationsController.name);

  constructor(private taskNotificationsService: TaskNotificationsService) {}

  @EventPattern(process.env.TASK_QUEUE_TOPIC)
  async scheduleDeadlineEmail(payload: TaskTopicItem) {
    this.logger.log(
      `Received an operation for task with id ${payload.task.id}: ${payload.op}`,
    );
    await this.taskNotificationsService.scheduleDeadlineNotification(payload);
  }
}

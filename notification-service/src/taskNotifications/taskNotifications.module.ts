import { Module } from '@nestjs/common';
import { EmailResolutionModule } from 'src/credentials-resolution-services/email-resolution.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { SchedulerModule } from 'src/scheduler/scheduler.module';
import { TaskNotificationsController } from './taskNotifications.controller';
import { TaskNotificationsService } from './taskNotifications.service';

@Module({
  providers: [TaskNotificationsService],
  controllers: [TaskNotificationsController],
  imports: [SchedulerModule, EmailResolutionModule, KafkaModule],
})
export class TaskNotificationsModule {}

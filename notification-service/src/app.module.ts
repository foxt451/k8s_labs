import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import kafkaConfiguration, { kafkaConfigSchema } from './config/kafka.config';
import schedulerConfiguration, {
  schedulerConfigSchema,
} from './config/scheduler.config';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TaskNotificationsModule } from './taskNotifications/taskNotifications.module';
import { HttpModule } from '@nestjs/axios';
import credResolutionConfiguration, {
  credResolutionConfigSchema,
} from './config/credentialsResolution.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        kafkaConfiguration,
        schedulerConfiguration,
        credResolutionConfiguration,
      ],
      validationSchema: kafkaConfigSchema
        .concat(schedulerConfigSchema)
        .concat(credResolutionConfigSchema),
      isGlobal: true,
    }),
    SchedulerModule,
    TaskNotificationsModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

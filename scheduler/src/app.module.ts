import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import tasksApiConfiguration, {
  tasksApiSchema,
} from './config/tasksApi.config';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [tasksApiConfiguration],
      validationSchema: tasksApiSchema,
    }),
    SchedulerModule,
  ],
  controllers: [],
})
export class AppModule {}

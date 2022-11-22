import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TasksApiConfigService } from 'src/config/tasksApi.config';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [HttpModule],
  controllers: [TestController],
  providers: [TestService, TasksApiConfigService],
})
export class TestModule {}

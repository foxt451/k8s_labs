import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  private readonly TEST_HITS = 100;

  constructor(private testService: TestService) {}

  @Get('/tasks')
  async testRequestToTasks() {
    const startTime = new Date().getTime();
    let resultMS = 0;
    const testRequest = async () => {
      await this.testService.testTasks();
      resultMS += new Date().getTime() - startTime;
    };
    const allTests: Promise<void>[] = [];
    for (let i = 0; i < this.TEST_HITS; i++) {
      allTests.push(testRequest());
    }
    await Promise.all(allTests);
    return resultMS / this.TEST_HITS / 1000;
  }

  @Get('/tasksDelay')
  async delayTasks() {
    await this.testService.initDelayToTasks();
    return 'delay inited!';
  }
}

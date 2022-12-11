import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import schedulerConfiguration from 'src/config/scheduler.config';
import { Agenda } from '@hokify/agenda';

export enum SCHEDULE_NAME {
  DEADLINE_NOTIFICATION = 'DEADLINE_NOTIFICATION',
}

export enum SCHEDULE_TYPE {
  ONCE,
}

@Injectable()
export class SchedulerService implements OnModuleInit {
  private mongoURl: string;
  private agenda: Agenda;

  constructor(
    @Inject(schedulerConfiguration.KEY)
    private schedulerConfig: ConfigType<typeof schedulerConfiguration>,
  ) {
    this.mongoURl = schedulerConfig.dbUrl;
    const agenda = new Agenda({ db: { address: this.mongoURl } });
    this.agenda = agenda;
  }

  public defineAction<T>(
    action: (jobData: T) => Promise<void>,
    name: SCHEDULE_NAME,
  ) {
    this.agenda.define<T>(name, (job) => action(job.attrs.data));
  }

  public async onModuleInit() {
    await this.agenda.start();
  }

  public async scheduleTask<T extends SCHEDULE_NAME, Data>(
    task: T,
    args: Data,
    interval: string | Date,
    scheduleType: SCHEDULE_TYPE,
  ) {
    if (scheduleType === SCHEDULE_TYPE.ONCE) {
      this.agenda.schedule<Data>(interval, task, args);
    }
  }
}

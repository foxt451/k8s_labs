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

type ExtendedJobData<T> = {
  cancellationKey: string;
  data: T;
};

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
    this.agenda.define<ExtendedJobData<T>>(name, (job) =>
      action(job.attrs.data.data),
    );
  }

  public async onModuleInit() {
    await this.agenda.start();
  }

  public async scheduleTask<T extends SCHEDULE_NAME, Data>(
    task: T,
    args: Data,
    interval: string | Date,
    scheduleType: SCHEDULE_TYPE,
    cancellationKey = 'default',
  ) {
    if (scheduleType === SCHEDULE_TYPE.ONCE) {
      await this.agenda.schedule<ExtendedJobData<Data>>(interval, task, {
        data: args,
        cancellationKey,
      });
    }
  }

  public async cancelTask<T extends SCHEDULE_NAME>(
    name: T,
    cancellationKey: string | null,
  ) {
    await this.agenda.cancel({
      name,
      ...(cancellationKey !== null
        ? {
            data: {
              cancellationKey,
            },
          }
        : {}),
    });
  }
}

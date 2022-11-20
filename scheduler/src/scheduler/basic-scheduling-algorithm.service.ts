import { Injectable } from '@nestjs/common';
import { ScheduleUnitDto } from 'src/dto/scheduleUnitDto';
import { TaskDto } from 'src/dto/taskDto';

// most simple algo
// smoothly distributes tasks up to deadline with equal slots, aribtrarily splitting tasks
// prefers as wide gaps as possible
// will pick the closest deadline and distribute it first
// then take further deadlines
@Injectable()
export class BasicSchedulingAlgorithmService {
  public scheduleTasks(tasks: TaskDto[]): ScheduleUnitDto[] {
    const sortedByDeadline = [...tasks].sort((a, b) => {
      if (a.dueDate === null) {
        return 1;
      }
      if (b.dueDate === null) {
        return -1;
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    const executionStartDate = new Date();
    type RelativeUnit = Omit<ScheduleUnitDto, 'executionStart'> & {
      executionStartOffsetMins: number;
    };
    const resultRelative: RelativeUnit[] = [];
    const tasksWithoutDeadline: TaskDto[] = [];
    const areUnitsOverlapping = (unit1: RelativeUnit, unit2: RelativeUnit) => {
      return (
        (unit1.executionStartOffsetMins <
          unit2.executionStartOffsetMins + unit2.executionDurationMins &&
          unit1.executionStartOffsetMins + unit1.executionDurationMins >
            unit2.executionStartOffsetMins) ||
        (unit2.executionStartOffsetMins <
          unit1.executionStartOffsetMins + unit1.executionDurationMins &&
          unit2.executionStartOffsetMins + unit2.executionDurationMins >
            unit1.executionStartOffsetMins)
      );
    };
    for (const task of sortedByDeadline) {
      if (task.dueDate === null) {
        tasksWithoutDeadline.push(task);
        continue;
      }
      // distribute the task smoothly without overlapping existing units
      const resolutionDurationMins = 60;
      const timeLeftMins =
        (new Date(task.dueDate).getTime() - executionStartDate.getTime()) /
        1000 /
        60;
      const unitsToFit = Math.ceil(task.durationMins / resolutionDurationMins);
      const searchGapMultiplier = Math.floor(
        Math.max(timeLeftMins / (unitsToFit * resolutionDurationMins), 1),
      );

      for (let i = 0; i < unitsToFit; i++) {
        const unitStartTimeOffsetMins =
          i * resolutionDurationMins * searchGapMultiplier;
        // fit the unit, potentially by moving sideways to find an empty schedule slot
        let actualUnitStartTimeOffsetMins = unitStartTimeOffsetMins;
        const currentUnit: RelativeUnit = {
          executionDurationMins: Math.min(
            resolutionDurationMins,
            task.durationMins,
          ),
          executionStartOffsetMins: actualUnitStartTimeOffsetMins,
          taskId: task.id,
        };
        let offendingUnit = resultRelative.find((unit) =>
          areUnitsOverlapping(unit, currentUnit),
        );
        while (offendingUnit !== undefined) {
          const isCurrentOffsetLeft =
            actualUnitStartTimeOffsetMins <= unitStartTimeOffsetMins;
          const willCurrentOffsetBeLeft =
            !isCurrentOffsetLeft &&
            unitStartTimeOffsetMins -
              (actualUnitStartTimeOffsetMins - unitStartTimeOffsetMins) -
              resolutionDurationMins >=
              0;
          if (willCurrentOffsetBeLeft) {
            if (!isCurrentOffsetLeft) {
              actualUnitStartTimeOffsetMins =
                unitStartTimeOffsetMins -
                (actualUnitStartTimeOffsetMins - unitStartTimeOffsetMins) -
                resolutionDurationMins;
            } else {
              actualUnitStartTimeOffsetMins -= resolutionDurationMins;
            }
          } else {
            if (isCurrentOffsetLeft) {
              actualUnitStartTimeOffsetMins =
                unitStartTimeOffsetMins -
                (actualUnitStartTimeOffsetMins - unitStartTimeOffsetMins) +
                resolutionDurationMins;
            } else {
              actualUnitStartTimeOffsetMins += resolutionDurationMins;
            }
          }
          currentUnit.executionStartOffsetMins = actualUnitStartTimeOffsetMins;
          offendingUnit = resultRelative.find((unit) =>
            areUnitsOverlapping(unit, currentUnit),
          );
        }
        // found a spot to fit this in
        resultRelative.push(currentUnit);
      }
    }
    return resultRelative.map<ScheduleUnitDto>((relative) => ({
      ...relative,
      executionStart: new Date(
        executionStartDate.getTime() +
          relative.executionStartOffsetMins * 60 * 1000,
      ),
    }));
  }
}

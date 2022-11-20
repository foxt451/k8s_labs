import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  loadSchedule,
  ScheduleStatus,
} from "../../../store/slices/schedule-slice";
import ScheduleUnit from "./ScheduleUnit";

const Schedule = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.schedule.status);
  const units = useAppSelector((state) => state.schedule.scheduleUnits);
  console.log(units);

  return (
    <main>
      <Button onClick={() => dispatch(loadSchedule())}>
        {status === ScheduleStatus.IDLE ? "Schedule" : "Reschedule"}
      </Button>
      {status === ScheduleStatus.LOADED && (
        <Stack gap={2} className="my-2">
          {units.map((unit) => (
            <ScheduleUnit
              key={`${unit.taskId}/${unit.executionDurationMins}/${unit.executionStart}`}
              unit={unit}
            />
          ))}
        </Stack>
      )}
    </main>
  );
};

export default Schedule;

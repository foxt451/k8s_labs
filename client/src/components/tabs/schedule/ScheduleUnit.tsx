import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { useAppSelector } from "../../../hooks/redux";
import { ScheduleUnitDto } from "../../../types/tasks/ScheduleUnitDto";

type Props = {
  unit: ScheduleUnitDto;
};

const ScheduleUnit: FC<Props> = ({ unit }) => {
  const relatedTask = useAppSelector((state) =>
    state.tasks.tasks.find((task) => task.id === unit.taskId)
  );
  if (!relatedTask) {
    return null;
  }
  return (
    <Card>
      <Card.Header>
        <>
          Start working at: {new Date(unit.executionStart).toDateString()}{" "}
          {new Date(unit.executionStart).toLocaleTimeString()}
        </>
      </Card.Header>
      <Card.Body>
        <Card.Title>Task: {relatedTask.title}</Card.Title>
        <Card.Subtitle></Card.Subtitle>
        <Card.Text>work for {unit.executionDurationMins} mins</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ScheduleUnit;

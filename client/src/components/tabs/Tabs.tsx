import React, { ReactNode, useState } from "react";
import { Stack } from "react-bootstrap";
import Schedule from "./schedule/Schedule";
import Tab from "./Tab";
import TasksPage from "./task-list/TasksPage";

type TabInfo = {
  title: string;
  component: ReactNode;
};

enum ETab {
  Tasks = 'tasks',
  Schedule = 'schedule',
}
type TabList = Record<ETab, TabInfo>;

const tabs: TabList = {
  [ETab.Tasks]: {
    component: <TasksPage />,
    title: "Tasks",
  },
  [ETab.Schedule]: {
    component: <Schedule />,
    title: "Schedule",
  },
};

const Tabs = () => {
  const [curTab, setCurTab] = useState<ETab>(ETab.Tasks);
  return (
    <>
      <Stack direction="horizontal" gap={2} className="my-2">
        {Object.entries(tabs).map(([key, value]) => (
          <Tab
            isActive={(key as ETab) === curTab}
            key={key}
            title={value.title}
            onClick={() => setCurTab(key as ETab)}
          />
        ))}
      </Stack>
      {tabs[curTab].component}
    </>
  );
};

export default Tabs;

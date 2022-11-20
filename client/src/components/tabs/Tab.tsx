import React, { FC } from "react";
import { Button } from "react-bootstrap";

type Props = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const Tab: FC<Props> = ({ title, onClick, isActive }) => {
  return (
    <Button onClick={onClick} variant={isActive ? "primary" : "secondary"}>
      {title}
    </Button>
  );
};

export default Tab;

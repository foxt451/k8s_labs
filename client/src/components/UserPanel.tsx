import React, { FC } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useAppDispatch } from "../hooks/redux";
import { logout } from "../store/slices/auth-slice";
import { User } from "../types/auth/User";

type Props = {
  user: User;
};

const UserPanel: FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <Row>
      <Col xs="auto">
        <Badge bg="secondary">{user.email}</Badge>
      </Col>
      <Col>
        <Button
          onClick={() => {
            onLogout();
          }}
        >
          Logout
        </Button>
      </Col>
    </Row>
  );
};

export default UserPanel;

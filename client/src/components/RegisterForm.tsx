import React, { FC } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/redux";
import { register as regAction } from "../store/slices/auth-slice";

type Inputs = {
  email: string;
  password: string;
};

type Props = {
  onLoginClick: () => void;
};

const RegisterForm: FC<Props> = ({ onLoginClick }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(regAction(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs="auto">
          <Form.Group className="mb-3" as={Row} controlId="loginEmail">
            <Form.Label column xs="auto">
              Email address
            </Form.Label>
            <Col>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" as={Row} controlId="loginPassword">
            <Form.Label column xs="auto">
              Password
            </Form.Label>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="link" onClick={onLoginClick}>
            Login
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;

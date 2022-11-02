import React, { ReactNode, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserPanel from "./UserPanel";

enum Action {
  LOGIN,
  REGISTER,
}

const Header = () => {
  const [action, setAction] = useState(Action.LOGIN);
  const user = useAppSelector((state) => state.auth.user);
  let component: ReactNode;
  if (user) {
    component = <UserPanel user={user} />;
  } else if (action === Action.LOGIN) {
    component = (
      <LoginForm
        onRegisterClick={() => {
          setAction(Action.REGISTER);
        }}
      />
    );
  } else {
    component = (
      <RegisterForm
        onLoginClick={() => {
          setAction(Action.LOGIN);
        }}
      />
    );
  }
  return component;
};

export default Header;

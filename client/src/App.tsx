import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/redux";
import Tabs from "./components/tabs/Tabs";

function App() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Container className="py-3">
      <Header />
      {user && <Tabs />}
    </Container>
  );
}

export default App;

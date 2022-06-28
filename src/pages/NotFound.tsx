import React from "react";
import { Container, Col } from "react-bootstrap";

const NotFound: React.FC = () => (
  <Container>
    <Col className="justify-content-center" xl={12}>
      <h1 style={{ fontSize: 72, textAlign: "center" }}>404</h1>
      <h1 style={{ fontSize: 72, textAlign: "center" }}>NOT FOUND!</h1>
      <img src=""></img>
    </Col>
  </Container>
);

export default NotFound;

import React from "react";
import { Col, Container } from "react-bootstrap";
import NavBar from "../components/navbar";
import List from "../components/list";
const Home: React.FC = (Props) => {
  const [t, setT] = React.useState(null);

  return (
    <Container>
      <Col xl={12}>
        <NavBar />
        <Container>
          <Col>
            <List />
          </Col>
        </Container>
      </Col>
    </Container>
  );
};

export default Home;

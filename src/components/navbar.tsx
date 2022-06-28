import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavBar: React.FC = () => {
  const [t, setT] = React.useState();

  return (
    <Container className="mb-4">
      <Navbar bg="light" expand="xxl">
        <Container>
          <Navbar.Brand className="btn btn-warning" href="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/register">Cadastrar</Nav.Link>
              <Nav.Link className="btn btn-success" href="/send-messages">
                Enviar Mensagens
              </Nav.Link>
              <Nav.Link href="/pdf-reader">Leitor de PDF</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};
export default NavBar;

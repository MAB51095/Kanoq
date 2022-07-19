import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Kanoq</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/Work">Work</Nav.Link>
            <Nav.Link href="/Income">Income</Nav.Link>
            <NavDropdown title="Manage" id="manage-nav-dropdown">
              <NavDropdown.Item href="/Clients">Clients</NavDropdown.Item>
              <NavDropdown.Item href="/Tailors">Tailors</NavDropdown.Item>
              <NavDropdown.Item href="/Products">Products</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#/AppConfig">App Config</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

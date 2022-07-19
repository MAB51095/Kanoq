import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" className="p-100" fixed="bottom">
      <Container>Copyright</Container>
    </Navbar>
  );
}

export default Footer;

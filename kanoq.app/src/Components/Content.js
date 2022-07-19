import React from "react";
import { Card, Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Clients from "../Pages/Clients";
import Products from "../Pages/Products";
import Tailors from "../Pages/Tailors";

function Content() {
  return (
    <Container className="mt-5" fluid>
      <Routes>
        <Route path="/Clients" element={<Clients />} />
        <Route path="/Tailors" element={<Tailors />} />
        <Route path="/Products" element={<Products />} />
      </Routes>
    </Container>
  );
}

export default Content;

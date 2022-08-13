import React from "react";
import { Card, Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Clients from "../Pages/Clients";
import Income from "../Pages/Income";
import Products from "../Pages/Products";
import Tailors from "../Pages/Tailors";

function Content() {
  return (
    <Container
      className="content"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Routes>
        <Route path="/Clients" element={<Clients />} />
        <Route path="/Tailors" element={<Tailors />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Income" element={<Income />} />
      </Routes>
    </Container>
  );
}

export default Content;

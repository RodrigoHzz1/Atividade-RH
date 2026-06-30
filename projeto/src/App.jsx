import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa usando o nome real do ficheiro detetado no teu explorador
import Navbar from "./components/Navbar.jsx"; 
import Clientes from "./pages/Clientes.jsx"; 
import Funcionarios from "./pages/Funcionarios.jsx"; 
import Home from "./pages/Home.jsx"; 

export default function App() {
  return (
    <Router>
      <Navbar /> 
      <main style={{ minHeight: 'calc(100vh - 70px)', backgroundColor: '#0f172a' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
        </Routes>
      </main>
    </Router>
  );
} 
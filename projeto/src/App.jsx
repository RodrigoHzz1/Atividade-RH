import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes estruturais
import Navbar from "./components/Navbar.jsx"; 
import Footer from "./components/Footer.jsx"; // Certifique-se de criar este arquivo na pasta components

// Páginas do sistema
import Clientes from "./pages/Clientes.jsx"; 
import Funcionarios from "./pages/Funcionarios.jsx"; 
import Home from "./pages/Home.jsx"; 

export default function App() {
  return (
    <Router>
      {/* Container principal estruturado com Flexbox */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0f172a' }}>
        
        {/* Barra de Navegação no topo */}
        <Navbar /> 

        {/* Área de conteúdo que empurra o rodapé para baixo se houver poucos dados na tela */}
        <main style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
          </Routes>
        </main>

        {/* Rodapé fixado na base com os créditos */}
        <Footer />
        
      </div>
    </Router>
  );
}
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const obterEstiloLink = (caminho) => {
    const estaAtivo = location.pathname === caminho;
    return {
      color: estaAtivo ? '#38bdf8' : '#94a3b8',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '0.95rem',
      padding: '0.6rem 1rem',
      borderRadius: '6px',
      backgroundColor: estaAtivo ? '#1e293b' : 'transparent',
      transition: 'all 0.2s ease-in-out',
    };
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem 3rem',
      backgroundColor: '#0f172a',
      borderBottom: '1px solid #1e293b',
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ 
          width: '18px', 
          height: '18px', 
          borderRadius: '50%', 
          border: '3px solid #38bdf8', 
          borderTopColor: 'transparent',
          transform: 'rotate(45deg)'
        }}></div>
        <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff', fontFamily: 'sans-serif' }}>
          NEXUS <span style={{ color: '#38bdf8', fontWeight: '300' }}>ERP</span>
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to="/" style={obterEstiloLink('/')}>Dashboard</Link>
        <Link to="/clientes" style={obterEstiloLink('/clientes')}>Clientes</Link>
        <Link to="/funcionarios" style={obterEstiloLink('/funcionarios')}>Funcionários</Link>
      </div>
    </nav>
  );
}
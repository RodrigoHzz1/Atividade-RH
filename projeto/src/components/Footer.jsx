import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1e293b',
      borderTop: '1px solid #334155',
      padding: '1.5rem',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <p style={{
        margin: 0,
        color: '#94a3b8',
        fontSize: '0.9rem',
        fontFamily: 'sans-serif',
        letterSpacing: '0.5px'
      }}>
        🚀 Desenvolvido por <span style={{ color: '#22c55e', fontWeight: '600' }}>Juan França</span> & <span style={{ color: '#22c55e', fontWeight: '600' }}>Rodrigo Costa</span>
      </p>
      <p style={{
        margin: '4px 0 0 0',
        color: '#64748b',
        fontSize: '0.75rem',
        fontFamily: 'sans-serif'
      }}>
        &copy; {new Date().getFullYear()} - Nexus ERP. Todos os direitos reservados.
      </p>
    </footer>
  );
}
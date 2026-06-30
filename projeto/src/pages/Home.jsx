import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'center', color: '#fff' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Painel de Controlo Operacional</h1>
      <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>Bem-vindo ao centro de gestão integrada da TechNexus Solutions.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }}>
        
        {/* Card Clientes */}
        <div style={{ backgroundColor: '#1e293b', padding: '2.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', fontSize: '1.5rem', marginTop: 0 }}>Módulo de Clientes</h3>
          <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Registe parceiros comerciais, atualize dados cadastrais e faça a manutenção da base de dados ativa.</p>
          <button onClick={() => navigate('/clientes')} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
            Gerir Clientes →
          </button>
        </div>

        {/* Card Recursos Humanos */}
        <div style={{ backgroundColor: '#1e293b', padding: '2.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#22c55e', fontSize: '1.5rem', marginTop: 0 }}>Recursos Humanos</h3>
          <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Organize contratações, atribua funções e controle a divisão de setores internos da empresa.</p>
          <button onClick={() => navigate('/funcionarios')} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
            Gerir Equipe →
          </button>
        </div>

      </div>
    </div>
  );
}
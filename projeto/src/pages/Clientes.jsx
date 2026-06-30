import React, { useState, useEffect } from 'react';
// Importação corrigida para apontar para o teu arquivo api.js real
import { clienteService } from '../service/api'; 

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', cpf: '' });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    setCarregando(true);
    setErro('');
    try {
      const dados = await clienteService.listar();
      setClientes(dados);
    } catch (err) {
      setErro('Erro ao carregar dados do servidor de base de dados.');
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      if (editandoId) {
        // Envia o ID para a URL do método PUT do Java e o formulário atualizado no corpo
        await clienteService.editar(editandoId, form);
        setEditandoId(null);
      } else {
        await clienteService.cadastrar(form);
      }
      setForm({ nome: '', email: '', telefone: '', cpf: '' });
      carregarClientes();
    } catch (err) {
      setErro('Operação recusada. Confirme as regras e exclusividade do CPF.');
    }
  };

  const iniciarEdicao = (cliente) => {
    setEditandoId(cliente.id);
    setForm({ nome: cliente.nome, email: cliente.email, telefone: cliente.telefone, cpf: cliente.cpf });
  };

  const deletarCliente = async (id) => {
    if (window.confirm('Tens a certeza de que desejas apagar este registo?')) {
      try {
        await clienteService.excluir(id);
        carregarClientes();
      } catch (err) {
        setErro('Erro ao tentar apagar. Confirme se o método DELETE está ativo no Java.');
      }
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.85rem', color: '#fff' }}>Módulo de Clientes</h2>
        <p style={{ color: '#94a3b8' }}>Gestão de parceiros comerciais da TechNexus Solutions.</p>
      </div>

      {erro && <div style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>⚠️ {erro}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2.5rem' }}>
        
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ margin: 0, color: editandoId ? '#f59e0b' : '#38bdf8' }}>
            {editandoId ? 'Atualizar Dados' : 'Novo Registo'}
          </h3>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>Nome Completo</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>Telefone</label>
            <input type="text" name="telefone" value={form.telefone} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>CPF</label>
            <input type="text" name="cpf" value={form.cpf} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: editandoId ? '#d97706' : '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              {editandoId ? 'Atualizar' : 'Salvar'}
            </button>
            {editandoId && (
              <button type="button" onClick={() => { setEditandoId(null); setForm({ nome: '', email: '', telefone: '', cpf: '' }); }} style={{ padding: '0.75rem', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#334155', color: '#38bdf8' }}>
                <th style={{ padding: '1rem' }}>Cliente</th>
                <th style={{ padding: '1rem' }}>CPF</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>A ler os dados da base de dados...</td></tr>
              ) : clientes.length === 0 ? (
                <tr><td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Nenhum registo retornado do Java.</td></tr>
              ) : (
                clientes.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: '#fff', fontWeight: '500' }}>{c.nome}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{c.email} | {c.telefone}</div>
                    </td>
                    <td style={{ padding: '1rem', color: '#cbd5e1', fontFamily: 'monospace' }}>{c.cpf}</td>
                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button onClick={() => iniciarEdicao(c)} style={{ padding: '0.4rem 0.75rem', backgroundColor: 'transparent', color: '#f59e0b', border: '1px solid #d97706', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Editar</button>
                      <button onClick={() => deletarCliente(c.id)} style={{ padding: '0.4rem 0.75rem', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #b91c1c', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Excluir</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
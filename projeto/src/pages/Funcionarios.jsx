import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../service/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(null); // Controla edição via e-mail já que o DTO não traz ID
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', setor: '', cargo: '' });

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    setCarregando(true);
    setErro('');
    try {
      const dados = await funcionarioService.listar();
      setFuncionarios(dados);
    } catch (err) {
      setErro('Erro ao carregar os funcionários do servidor backend.');
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
      if (editandoEmail) {
        // Encontra o funcionário correspondente para atualizar
        await funcionarioService.editar(editandoEmail, form);
        setEditandoEmail(null);
      } else {
        await funcionarioService.cadastrar(form);
      }
      setForm({ nome: '', email: '', telefone: '', setor: '', cargo: '' });
      carregarFuncionarios();
    } catch (err) {
      setErro('Operação recusada. Verifique as regras ou se o e-mail já pertence a outro usuário.');
    }
  };

  const iniciarEdicao = (func) => {
    setEditandoEmail(func.email);
    setForm({ nome: func.nome, email: func.email, telefone: func.telefone, setor: func.setor, cargo: func.cargo });
  };

  const deletarFuncionario = async (func) => {
    if (window.confirm(`Tem certeza de que deseja remover o colaborador ${func.nome}?`)) {
      try {
        // Envia o identificador correto para o delete
        await funcionarioService.excluir(func.id || func.email); 
        carregarFuncionarios();
      } catch (err) {
        setErro('Erro ao tentar excluir. Como o DTO não fornece o ID, certifique-se de que a rota aceita o e-mail ou ajuste o FuncionarioResponseDTO no Java para incluir o ID.');
      }
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.85rem', color: '#fff' }}>Recursos Humanos</h2>
        <p style={{ color: '#94a3b8' }}>Gestão de colaboradores internos da equipe.</p>
      </div>

      {erro && <div style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>⚠️ {erro}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2.5rem' }}>
        
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '8px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ margin: 0, color: editandoEmail ? '#f59e0b' : '#22c55e' }}>
            {editandoEmail ? 'Atualizar Colaborador' : 'Cadastrar Funcionário'}
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
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>Setor</label>
            <input type="text" name="setor" value={form.setor} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>Cargo</label>
            <input type="text" name="cargo" value={form.cargo} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: editandoEmail ? '#d97706' : '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              {editandoEmail ? 'Atualizar' : 'Salvar'}
            </button>
            {editandoEmail && (
              <button type="button" onClick={() => { setEditandoEmail(null); setForm({ nome: '', email: '', telefone: '', setor: '', cargo: '' }); }} style={{ padding: '0.75rem', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#334155', color: '#22c55e' }}>
                <th style={{ padding: '1rem' }}>Funcionário</th>
                <th style={{ padding: '1rem' }}>Setor / Cargo</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Carregando dados...</td></tr>
              ) : funcionarios.length === 0 ? (
                <tr><td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Nenhum funcionário cadastrado.</td></tr>
              ) : (
                funcionarios.map((f, index) => (
                  <tr key={f.email || index} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: '#fff', fontWeight: '500' }}>{f.nome}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{f.email} | Tel: {f.telefone}</div>
                    </td>
                    <td style={{ padding: '1rem', color: '#cbd5e1' }}>
                      <span style={{ backgroundColor: '#0f172a', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{f.setor}</span>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>{f.cargo}</div>
                    </td>
                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                      <button onClick={() => iniciarEdicao(f)} style={{ padding: '0.4rem 0.75rem', backgroundColor: 'transparent', color: '#f59e0b', border: '1px solid #d97706', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Editar</button>
                      <button onClick={() => deletarFuncionario(f)} style={{ padding: '0.4rem 0.75rem', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #b91c1c', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Excluir</button>
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
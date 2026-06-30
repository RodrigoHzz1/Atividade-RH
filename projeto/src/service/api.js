import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Endereço da API Java do teu parceiro
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exportação explícita para evitar o erro "does not provide an export named 'clienteService'"
export const clienteService = {
  listar: async () => {
    const response = await api.get('/clientes');
    return response.data;
  },
  cadastrar: async (dados) => {
    const response = await api.post('/clientes', dados);
    return response.data;
  },
  editar: async (id, dados) => {
    const response = await api.put(`/clientes/${id}`, dados);
    return response.data;
  },
  excluir: async (id) => {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  },
};

export const funcionarioService = {
  listar: async () => {
    const response = await api.get('/funcionarios');
    return response.data;
  },
  cadastrar: async (dados) => {
    const response = await api.post('/funcionarios', dados);
    return response.data;
  },
  editar: async (id, dados) => {
    const response = await api.put(`/funcionarios/${id}`, dados);
    return response.data;
  },
  excluir: async (id) => {
    const response = await api.delete(`/funcionarios/${id}`);
    return response.data;
  },
};
package Atividade_RH.Service;

import Atividade_RH.DTO.ClienteRequestDTO;
import Atividade_RH.DTO.ClienteResponseDTO;
import Atividade_RH.Model.ClienteModel;
import Atividade_RH.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public List<ClienteResponseDTO> listarTodos() {
        return repository
                .findAll()
                .stream()
                .map(c -> new ClienteResponseDTO(
                        c.getId(), // <-- CORREÇÃO: Enviando o ID para a listagem
                        c.getNome(),
                        c.getEmail(),
                        c.getTelefone(),
                        c.getCpf()
                ))
                .toList();
    }

    public ClienteResponseDTO salvarCliente(ClienteRequestDTO dto) {
        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Cliente já cadastrado com este E-mail");
        }

        if (repository.findByCpf(dto.getCpf()).isPresent()) {
            throw new RuntimeException("Cliente já cadastrado com este CPF");
        }

        ClienteModel novoCliente = new ClienteModel();
        novoCliente.setNome(dto.getNome());
        novoCliente.setEmail(dto.getEmail());
        novoCliente.setTelefone(dto.getTelefone());
        novoCliente.setCpf(dto.getCpf());

        // O JPA gera o ID automaticamente ao salvar no banco
        repository.save(novoCliente);

        // CORREÇÃO: Passando o ID gerado para o construtor do DTO
        return new ClienteResponseDTO(
                novoCliente.getId(), // <-- CORREÇÃO
                novoCliente.getNome(),
                novoCliente.getEmail(),
                novoCliente.getTelefone(),
                novoCliente.getCpf()
        );
    }

    public void deletarCliente(Long id) {
        ClienteModel cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        repository.delete(cliente);
    }

    public ClienteResponseDTO atualizarCliente(Long id, ClienteRequestDTO dto) {
        // 1. Busca o cliente que será editado
        ClienteModel clienteExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // 2. CORREÇÃO DO ERRO: Valida se o E-mail já pertence a OUTRO cliente
        Optional<ClienteModel> clienteComEmail = repository.findByEmail(dto.getEmail());
        if (clienteComEmail.isPresent() && clienteComEmail.get().getId() != id) {
            throw new RuntimeException("Este E-mail já está em uso por outro cliente");
        }

        // 3. CORREÇÃO DO ERRO: Valida se o CPF já pertence a OUTRO cliente
        Optional<ClienteModel> clienteComCpf = repository.findByCpf(dto.getCpf());
        if (clienteComCpf.isPresent() && clienteComCpf.get().getId() != id) {
            throw new RuntimeException("Este CPF já está em uso por outro cliente");
        }

        // 4. Se passou pelas validações, atualiza com segurança
        clienteExistente.setNome(dto.getNome());
        clienteExistente.setEmail(dto.getEmail());
        clienteExistente.setTelefone(dto.getTelefone());
        clienteExistente.setCpf(dto.getCpf());

        repository.save(clienteExistente);

        // CORREÇÃO: Passando o ID existente para o construtor do DTO
        return new ClienteResponseDTO(
                clienteExistente.getId(), // <-- CORREÇÃO
                clienteExistente.getNome(),
                clienteExistente.getEmail(),
                clienteExistente.getTelefone(),
                clienteExistente.getCpf()
        );
    }
}
package Atividade_RH.Service;

import Atividade_RH.DTO.FuncionarioRequestDTO; // Adicionado import que faltava
import Atividade_RH.DTO.FuncionarioResponseDTO;
import Atividade_RH.Model.FuncionarioModel;
import Atividade_RH.Repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository repository;

    // READ - Listar todos os funcionários
    public List<FuncionarioResponseDTO> listarTodos() {
        return repository
                .findAll()
                .stream()
                .map(f -> new FuncionarioResponseDTO(
                        f.getNome(),
                        f.getEmail(),
                        f.getSetor(),
                        f.getCargo() // Alterado de salario para cargo
                ))
                .toList();
    }

    // READ - Buscar um funcionário específico por ID
    public FuncionarioResponseDTO buscarPorId(Long id) {
        FuncionarioModel funcionario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));

        return new FuncionarioResponseDTO(
                funcionario.getNome(),
                funcionario.getEmail(),
                funcionario.getSetor(),
                funcionario.getCargo() // Alterado de salario para cargo
        );
    }

    // CREATE - Salvar funcionário com validações de E-mail e CPF
    public void salvarFuncionario(FuncionarioRequestDTO dto) {
        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Funcionário já cadastrado com este e-mail");
        }

        if (repository.findByCpf(dto.getCpf()).isPresent()) {
            throw new RuntimeException("Funcionário já cadastrado com este CPF");
        }

        FuncionarioModel novoFuncionario = new FuncionarioModel();
        novoFuncionario.setNome(dto.getNome());
        novoFuncionario.setEmail(dto.getEmail());
        novoFuncionario.setCpf(dto.getCpf());
        novoFuncionario.setTelefone(dto.getTelefone());
        novoFuncionario.setSetor(dto.getSetor());
        novoFuncionario.setCargo(dto.getCargo()); // Alterado de salario para cargo

        repository.save(novoFuncionario);
    }

    // UPDATE - Atualizar dados do funcionário
    public FuncionarioResponseDTO atualizarFuncionario(Long id, FuncionarioRequestDTO dto) {
        FuncionarioModel funcionarioExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));

        repository.findByEmail(dto.getEmail()).ifPresent(f -> {
            if (!f.getId().equals(id)) {
                throw new RuntimeException("Este e-mail já está sendo usado por outro funcionário");
            }
        });

        repository.findByCpf(dto.getCpf()).ifPresent(f -> {
            if (!f.getId().equals(id)) {
                throw new RuntimeException("Este CPF já está sendo usado por outro funcionário");
            }
        });

        funcionarioExistente.setNome(dto.getNome());
        funcionarioExistente.setEmail(dto.getEmail());
        funcionarioExistente.setCpf(dto.getCpf());
        funcionarioExistente.setTelefone(dto.getTelefone());
        funcionarioExistente.setSetor(dto.getSetor());
        funcionarioExistente.setCargo(dto.getCargo()); // Alterado de salario para cargo

        repository.save(funcionarioExistente);

        return new FuncionarioResponseDTO(
                funcionarioExistente.getNome(),
                funcionarioExistente.getEmail(),
                funcionarioExistente.getSetor(),
                funcionarioExistente.getCargo() // Alterado de salario para cargo
        );
    }

    // DELETE - Deletar funcionário por ID
    public void deletarFuncionario(Long id) {
        FuncionarioModel funcionario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));

        repository.delete(funcionario);
    }
}
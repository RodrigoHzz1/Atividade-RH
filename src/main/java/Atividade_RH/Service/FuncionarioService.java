package Atividade_RH.Service;

import Atividade_RH.Dto.FuncionarioRequestDTO;
import Atividade_RH.Dto.FuncionarioResponseDTO;
import Atividade_RH.Model.FuncionarioModel;
import Atividade_RH.Repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository repository;

    public List<FuncionarioResponseDTO> listarTodos() {
        return repository
                .findAll()
                .stream()
                .map(f -> new FuncionarioResponseDTO(
                        f.getNome(),
                        f.getTelefone(),
                        f.getEmail(),
                        f.getCargo(),
                        f.getSetor()
                ))
                .toList();
    }

    public FuncionarioResponseDTO salvarFuncionario(FuncionarioRequestDTO dto) {
        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Funcionário já cadastrado com este E-mail");
        }

        FuncionarioModel novoFuncionario = new FuncionarioModel();
        novoFuncionario.setNome(dto.getNome());
        novoFuncionario.setTelefone(dto.getTelefone());
        novoFuncionario.setEmail(dto.getEmail());
        novoFuncionario.setCargo(dto.getCargo());
        novoFuncionario.setSetor(dto.getSetor());

        repository.save(novoFuncionario);

        return new FuncionarioResponseDTO(
                novoFuncionario.getNome(),
                novoFuncionario.getTelefone(),
                novoFuncionario.getEmail(),
                novoFuncionario.getCargo(),
                novoFuncionario.getSetor()
        );
    }

    public void deletarFuncionario(Long id) {
        FuncionarioModel funcionario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        repository.delete(funcionario);
    }

    public FuncionarioResponseDTO atualizarFuncionario(Long id, FuncionarioRequestDTO dto) {
        // 1. Busca o funcionário que vai ser editado
        FuncionarioModel funcionarioExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        // 2. CORREÇÃO CRÍTICA: Ignora o próprio ID para permitir a edição do e-mail original
        Optional<FuncionarioModel> funcionarioComEmail = repository.findByEmail(dto.getEmail());
        if (funcionarioComEmail.isPresent() && funcionarioComEmail.get().getId() != id) {
            throw new RuntimeException("Este E-mail já está em uso por outro funcionário");
        }

        // 3. Atualiza os dados de forma segura
        funcionarioExistente.setNome(dto.getNome());
        funcionarioExistente.setTelefone(dto.getTelefone());
        funcionarioExistente.setEmail(dto.getEmail());
        funcionarioExistente.setCargo(dto.getCargo());
        funcionarioExistente.setSetor(dto.getSetor());

        repository.save(funcionarioExistente);

        return new FuncionarioResponseDTO(
                funcionarioExistente.getNome(),
                funcionarioExistente.getTelefone(),
                funcionarioExistente.getEmail(),
                funcionarioExistente.getCargo(),
                funcionarioExistente.getSetor()
        );
    }
}
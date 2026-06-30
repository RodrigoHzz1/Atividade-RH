package Atividade_RH.Repository;

import Atividade_RH.Model.FuncionarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FuncionarioRepository extends JpaRepository<FuncionarioModel, Long> {
    Optional<FuncionarioModel> findByEmail(String email);
    Optional<FuncionarioModel> findByCpf(String cpf);
}
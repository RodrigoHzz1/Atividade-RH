package Atividade_RH.Repository;

import Atividade_RH.Model.ClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteModel, Long> {

    Optional<ClienteModel> findByEmail(String email);

    Optional<ClienteModel> findByCpf(String cpf);
}
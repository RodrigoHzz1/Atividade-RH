package Atividade_RH.Controller;

import Atividade_RH.DTO.FuncionarioRequestDTO;
import Atividade_RH.DTO.FuncionarioResponseDTO;
import Atividade_RH.Service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "*") // Permite o consumo do Front-end sem bloqueios CORS
public class FuncionarioController {

    @Autowired
    private FuncionarioService service;

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDTO>> listarTodos() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@RequestBody FuncionarioRequestDTO dto) {
        // CORREÇÃO: Captura o objeto retornado pelo service contendo o novo ID
        FuncionarioResponseDTO funcionarioSalvo = service.salvarFuncionario(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "Mensagem", "Funcionário cadastrado com sucesso",
                        "id", funcionarioSalvo.getId()
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizar(@PathVariable Long id, @RequestBody FuncionarioRequestDTO dto) {
        // CORREÇÃO: Captura o objeto atualizado pelo service para evitar erros de compilação
        FuncionarioResponseDTO funcionarioAtualizado = service.atualizarFuncionario(id, dto);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of(
                        "Mensagem", "Funcionário atualizado com sucesso",
                        "id", funcionarioAtualizado.getId()
                ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletar(@PathVariable Long id) {
        service.deletarFuncionario(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("Mensagem", "Funcionário deletado com sucesso"));
    }
}
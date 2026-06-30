package Atividade_RH.Controller;

import Atividade_RH.DTO.ClienteRequestDTO;
import Atividade_RH.DTO.ClienteResponseDTO;
import Atividade_RH.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*") // Permite o consumo do Front-end sem bloqueios CORS
public class ClienteController {

    @Autowired
    private ClienteService service;

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listarTodos() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@RequestBody ClienteRequestDTO dto) {
        // CORREÇÃO: Captura o objeto retornado pelo service de forma limpa
        ClienteResponseDTO clienteSalvo = service.salvarCliente(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "Mensagem", "Cliente cadastrado com sucesso",
                        "id", clienteSalvo.getId()
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizar(@PathVariable Long id, @RequestBody ClienteRequestDTO dto) {
        // CORREÇÃO: Captura o objeto atualizado pelo service para evitar incompatibilidade
        ClienteResponseDTO clienteAtualizado = service.atualizarCliente(id, dto);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of(
                        "Mensagem", "Cliente atualizado com sucesso",
                        "id", clienteAtualizado.getId()
                ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletar(@PathVariable Long id) {
        service.deletarCliente(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("Mensagem", "Cliente deletado com sucesso"));
    }
}
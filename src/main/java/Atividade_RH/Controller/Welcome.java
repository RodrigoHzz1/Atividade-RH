package Atividade_RH.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/")
public class Welcome {
    @GetMapping("/")
    public Map<String, String> welcome() {
        return Map.of(
                "mensagem", "Bem-vindo à API da Atividade Pontuada!");


    }


    @GetMapping("/dev")
    public Map<String, String> devInfo() {
        return Map.of(
                "desenvolvedores", "BackEnd:Rodrigo Costa// FrontEnd:Juan França"
        );
    }
}


package Atividade_RH.DTO;

public class ClienteResponseDTO {

    private Long id; // <-- CORREÇÃO: O ID agora é exposto para o Frontend
    private String nome;
    private String email;
    private String telefone;
    private String cpf;

    public ClienteResponseDTO() {
    }

    public ClienteResponseDTO(Long id, String nome, String email, String telefone, String cpf) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
}
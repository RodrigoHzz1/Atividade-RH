package Atividade_RH.Dto;

public class FuncionarioResponseDTO {

    private String nome;
    private String telefone;
    private String email;
    private String cargo;
    private String setor;

    public FuncionarioResponseDTO() {
    }

    public FuncionarioResponseDTO(String nome, String telefone, String email, String cargo, String setor) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.cargo = cargo;
        this.setor = setor;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getSetor() { return setor; }
    public void setSetor(String setor) { this.setor = setor; }
}
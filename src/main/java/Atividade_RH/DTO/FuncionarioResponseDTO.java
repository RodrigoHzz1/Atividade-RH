package Atividade_RH.DTO;

public class FuncionarioResponseDTO {
    private String nome;
    private String email;
    private String setor;
    private String cargo; // Alterado de salario para cargo

    public FuncionarioResponseDTO() {
    }

    public FuncionarioResponseDTO(String nome, String email, String setor, String cargo) {
        this.nome = nome;
        this.email = email;
        this.setor = setor;
        this.cargo = cargo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
}
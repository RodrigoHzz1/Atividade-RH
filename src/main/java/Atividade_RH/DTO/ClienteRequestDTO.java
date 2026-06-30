package Atividade_RH.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ClienteRequestDTO {

        @NotBlank(message = "O nome é obrigatório")
        @Size(max = 200, message = "O nome deve ter no máximo 200 caracteres")
        private String nome;

        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "Insira um e-mail válido")
        private String email;

        @NotBlank(message = "O telefone é obrigatório")
        private String telefone;

        @NotBlank(message = "O CPF é obrigatório")
        private String cpf;

        public ClienteRequestDTO() {
        }

        public ClienteRequestDTO(String nome, String email, String telefone, String cpf) {
                this.nome = nome;
                this.email = email;
                this.telefone = telefone;
                this.cpf = cpf;
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

        public String getTelefone() {
                return telefone;
        }

        public void setTelefone(String telefone) {
                this.telefone = telefone;
        }

        public String getCpf() {
                return cpf;
        }

        public void setCpf(String cpf) {
                this.cpf = cpf;
        }
}
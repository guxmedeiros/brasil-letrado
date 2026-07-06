package br.com.brasilletrado.dto;

import jakarta.validation.constraints.NotBlank;

public class EducadorDTO {

    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    private String email;
    private String telefone;
    private String formacao;

    public EducadorDTO() {}

    public EducadorDTO(Long id, String nome, String email, String telefone, String formacao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.formacao = formacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getFormacao() {
        return formacao;
    }

    public void setFormacao(String formacao) {
        this.formacao = formacao;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String nome;
        private String email;
        private String telefone;
        private String formacao;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder nome(String nome) {
            this.nome = nome;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder telefone(String telefone) {
            this.telefone = telefone;
            return this;
        }

        public Builder formacao(String formacao) {
            this.formacao = formacao;
            return this;
        }

        public EducadorDTO build() {
            return new EducadorDTO(id, nome, email, telefone, formacao);
        }
    }
}

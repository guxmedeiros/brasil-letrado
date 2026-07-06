package br.com.brasilletrado.dto;

import br.com.brasilletrado.model.NivelAlfabetizacao;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class AlunoDTO {

    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    private LocalDate dataNascimento;
    private String telefone;
    private NivelAlfabetizacao nivelAlfabetizacao;
    private Long turmaId;
    private String turmaNome;

    public AlunoDTO() {}

    public AlunoDTO(Long id, String nome, LocalDate dataNascimento, String telefone, NivelAlfabetizacao nivelAlfabetizacao, Long turmaId, String turmaNome) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.nivelAlfabetizacao = nivelAlfabetizacao;
        this.turmaId = turmaId;
        this.turmaNome = turmaNome;
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

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public NivelAlfabetizacao getNivelAlfabetizacao() {
        return nivelAlfabetizacao;
    }

    public void setNivelAlfabetizacao(NivelAlfabetizacao nivelAlfabetizacao) {
        this.nivelAlfabetizacao = nivelAlfabetizacao;
    }

    public Long getTurmaId() {
        return turmaId;
    }

    public void setTurmaId(Long turmaId) {
        this.turmaId = turmaId;
    }

    public String getTurmaNome() {
        return turmaNome;
    }

    public void setTurmaNome(String turmaNome) {
        this.turmaNome = turmaNome;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String nome;
        private LocalDate dataNascimento;
        private String telefone;
        private NivelAlfabetizacao nivelAlfabetizacao;
        private Long turmaId;
        private String turmaNome;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder nome(String nome) {
            this.nome = nome;
            return this;
        }

        public Builder dataNascimento(LocalDate dataNascimento) {
            this.dataNascimento = dataNascimento;
            return this;
        }

        public Builder telefone(String telefone) {
            this.telefone = telefone;
            return this;
        }

        public Builder nivelAlfabetizacao(NivelAlfabetizacao nivelAlfabetizacao) {
            this.nivelAlfabetizacao = nivelAlfabetizacao;
            return this;
        }

        public Builder turmaId(Long turmaId) {
            this.turmaId = turmaId;
            return this;
        }

        public Builder turmaNome(String turmaNome) {
            this.turmaNome = turmaNome;
            return this;
        }

        public AlunoDTO build() {
            return new AlunoDTO(id, nome, dataNascimento, telefone, nivelAlfabetizacao, turmaId, turmaNome);
        }
    }
}

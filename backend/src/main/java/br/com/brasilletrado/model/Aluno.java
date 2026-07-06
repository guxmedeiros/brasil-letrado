package br.com.brasilletrado.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private LocalDate dataNascimento;
    private String telefone;

    @Enumerated(EnumType.STRING)
    private NivelAlfabetizacao nivelAlfabetizacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "turma_id")
    private Turma turma;

    public Aluno() {}

    public Aluno(Long id, String nome, LocalDate dataNascimento, String telefone, NivelAlfabetizacao nivelAlfabetizacao, Turma turma) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.nivelAlfabetizacao = nivelAlfabetizacao;
        this.turma = turma;
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

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
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
        private Turma turma;

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

        public Builder turma(Turma turma) {
            this.turma = turma;
            return this;
        }

        public Aluno build() {
            return new Aluno(id, nome, dataNascimento, telefone, nivelAlfabetizacao, turma);
        }
    }
}

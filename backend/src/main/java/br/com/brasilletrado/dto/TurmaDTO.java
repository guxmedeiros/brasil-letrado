package br.com.brasilletrado.dto;

import br.com.brasilletrado.model.Turno;
import jakarta.validation.constraints.NotBlank;

public class TurmaDTO {

    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    private Turno turno;
    private String diasSemana;
    private Integer capacidadeMaxima;
    private Long educadorId;
    private String educadorNome;
    private Long quantidadeAlunos;

    public TurmaDTO() {}

    public TurmaDTO(Long id, String nome, Turno turno, String diasSemana, Integer capacidadeMaxima, Long educadorId, String educadorNome, Long quantidadeAlunos) {
        this.id = id;
        this.nome = nome;
        this.turno = turno;
        this.diasSemana = diasSemana;
        this.capacidadeMaxima = capacidadeMaxima;
        this.educadorId = educadorId;
        this.educadorNome = educadorNome;
        this.quantidadeAlunos = quantidadeAlunos;
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

    public Turno getTurno() {
        return turno;
    }

    public void setTurno(Turno turno) {
        this.turno = turno;
    }

    public String getDiasSemana() {
        return diasSemana;
    }

    public void setDiasSemana(String diasSemana) {
        this.diasSemana = diasSemana;
    }

    public Integer getCapacidadeMaxima() {
        return capacidadeMaxima;
    }

    public void setCapacidadeMaxima(Integer capacidadeMaxima) {
        this.capacidadeMaxima = capacidadeMaxima;
    }

    public Long getEducadorId() {
        return educadorId;
    }

    public void setEducadorId(Long educadorId) {
        this.educadorId = educadorId;
    }

    public String getEducadorNome() {
        return educadorNome;
    }

    public void setEducadorNome(String educadorNome) {
        this.educadorNome = educadorNome;
    }

    public Long getQuantidadeAlunos() {
        return quantidadeAlunos;
    }

    public void setQuantidadeAlunos(Long quantidadeAlunos) {
        this.quantidadeAlunos = quantidadeAlunos;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String nome;
        private Turno turno;
        private String diasSemana;
        private Integer capacidadeMaxima;
        private Long educadorId;
        private String educadorNome;
        private Long quantidadeAlunos;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder nome(String nome) {
            this.nome = nome;
            return this;
        }

        public Builder turno(Turno turno) {
            this.turno = turno;
            return this;
        }

        public Builder diasSemana(String diasSemana) {
            this.diasSemana = diasSemana;
            return this;
        }

        public Builder capacidadeMaxima(Integer capacidadeMaxima) {
            this.capacidadeMaxima = capacidadeMaxima;
            return this;
        }

        public Builder educadorId(Long educadorId) {
            this.educadorId = educadorId;
            return this;
        }

        public Builder educadorNome(String educadorNome) {
            this.educadorNome = educadorNome;
            return this;
        }

        public Builder quantidadeAlunos(Long quantidadeAlunos) {
            this.quantidadeAlunos = quantidadeAlunos;
            return this;
        }

        public TurmaDTO build() {
            return new TurmaDTO(id, nome, turno, diasSemana, capacidadeMaxima, educadorId, educadorNome, quantidadeAlunos);
        }
    }
}

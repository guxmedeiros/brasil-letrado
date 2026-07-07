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

@Entity
@Table(name = "turma")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private Turno turno;

    private String diasSemana;
    private Integer capacidadeMaxima;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "educador_id")
    private Educador educador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    public Turma() {}

    public Turma(Long id, String nome, Turno turno, String diasSemana, Integer capacidadeMaxima, Educador educador, Instituicao instituicao) {
        this.id = id;
        this.nome = nome;
        this.turno = turno;
        this.diasSemana = diasSemana;
        this.capacidadeMaxima = capacidadeMaxima;
        this.educador = educador;
        this.instituicao = instituicao;
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

    public Educador getEducador() {
        return educador;
    }

    public void setEducador(Educador educador) {
        this.educador = educador;
    }

    public Instituicao getInstituicao() {
        return instituicao;
    }

    public void setInstituicao(Instituicao instituicao) {
        this.instituicao = instituicao;
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
        private Educador educador;
        private Instituicao instituicao;

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

        public Builder educador(Educador educador) {
            this.educador = educador;
            return this;
        }

        public Builder instituicao(Instituicao instituicao) {
            this.instituicao = instituicao;
            return this;
        }

        public Turma build() {
            return new Turma(id, nome, turno, diasSemana, capacidadeMaxima, educador, instituicao);
        }
    }
}

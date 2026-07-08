package br.com.brasilletrado.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Converter
class DiaSemanaListConverter implements AttributeConverter<List<DiaSemana>, String> {
    private static final String DELIMITER = ",";

    // Mapeamento de nomes comuns para os valores do enum
    private static final java.util.Map<String, DiaSemana> NOME_PARA_ENUM = new java.util.HashMap<>();
    static {
        NOME_PARA_ENUM.put("segunda", DiaSemana.SEGUNDA);
        NOME_PARA_ENUM.put("segunda-feira", DiaSemana.SEGUNDA);
        NOME_PARA_ENUM.put("terça", DiaSemana.TERCA);
        NOME_PARA_ENUM.put("terca", DiaSemana.TERCA);
        NOME_PARA_ENUM.put("terça-feira", DiaSemana.TERCA);
        NOME_PARA_ENUM.put("quarta", DiaSemana.QUARTA);
        NOME_PARA_ENUM.put("quarta-feira", DiaSemana.QUARTA);
        NOME_PARA_ENUM.put("quinta", DiaSemana.QUINTA);
        NOME_PARA_ENUM.put("quinta-feira", DiaSemana.QUINTA);
        NOME_PARA_ENUM.put("sexta", DiaSemana.SEXTA);
        NOME_PARA_ENUM.put("sexta-feira", DiaSemana.SEXTA);
        NOME_PARA_ENUM.put("sábado", DiaSemana.SABADO);
        NOME_PARA_ENUM.put("sabado", DiaSemana.SABADO);
        NOME_PARA_ENUM.put("domingo", DiaSemana.DOMINGO);
        // Também aceitamos os próprios nomes do enum
        for (DiaSemana d : DiaSemana.values()) {
            NOME_PARA_ENUM.put(d.name().toLowerCase(), d);
        }
    }

    @Override
    public String convertToDatabaseColumn(List<DiaSemana> attribute) {
        if (attribute == null || attribute.isEmpty()) {
            return "";
        }
        return attribute.stream()
                .map(DiaSemana::name)
                .collect(Collectors.joining(DELIMITER));
    }

    @Override
    public List<DiaSemana> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return Arrays.stream(dbData.split(DELIMITER))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> {
                    String chave = s.toLowerCase().trim();
                    DiaSemana dia = NOME_PARA_ENUM.get(chave);
                    if (dia == null) {
                        // Tenta procurar por nome exato (case-insensitive)
                        for (DiaSemana d : DiaSemana.values()) {
                            if (d.name().equalsIgnoreCase(s)) {
                                return d;
                            }
                        }
                        return null; // Ignora valores desconhecidos
                    }
                    return dia;
                })
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toList());
    }
}

@Entity
@Table(name = "turma")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private Turno turno;

    @Convert(converter = DiaSemanaListConverter.class)
    @Column(name = "dias_semana")
    private List<DiaSemana> diasSemana = new ArrayList<>();

    private Integer capacidadeMaxima;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "educador_id")
    private Educador educador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    public Turma() {}

    public Turma(Long id, String nome, Turno turno, List<DiaSemana> diasSemana, Integer capacidadeMaxima, Educador educador, Instituicao instituicao) {
        this.id = id;
        this.nome = nome;
        this.turno = turno;
        this.diasSemana = diasSemana != null ? diasSemana : new ArrayList<>();
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

    public List<DiaSemana> getDiasSemana() {
        return diasSemana;
    }

    public void setDiasSemana(List<DiaSemana> diasSemana) {
        this.diasSemana = diasSemana != null ? diasSemana : new ArrayList<>();
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
        private List<DiaSemana> diasSemana = new ArrayList<>();
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

        public Builder diasSemana(List<DiaSemana> diasSemana) {
            this.diasSemana = diasSemana != null ? diasSemana : new ArrayList<>();
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

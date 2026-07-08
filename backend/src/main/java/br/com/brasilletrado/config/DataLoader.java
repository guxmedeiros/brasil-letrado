package br.com.brasilletrado.config;

import br.com.brasilletrado.model.Aluno;
import br.com.brasilletrado.model.DiaSemana;
import br.com.brasilletrado.model.Educador;
import br.com.brasilletrado.model.Instituicao;
import br.com.brasilletrado.model.NivelAlfabetizacao;
import br.com.brasilletrado.model.Turma;
import br.com.brasilletrado.model.Turno;
import br.com.brasilletrado.repository.AlunoRepository;
import br.com.brasilletrado.repository.EducadorRepository;
import br.com.brasilletrado.repository.InstituicaoRepository;
import br.com.brasilletrado.repository.TurmaRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@org.springframework.context.annotation.Profile("!test")
public class DataLoader implements CommandLineRunner {

    private static final String[] DDD = {"11", "21", "31", "41", "51", "61", "71", "81", "85", "47"};

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private EducadorRepository educadorRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (instituicaoRepository.count() == 0) {
            // Create only 3 institutions total
            List<Instituicao> instituicoes = criarInstituicoes();
            
            // The first institution is the main one - attach all educators and students to it
            Instituicao instituicaoPadrao = instituicoes.get(0);
            
            // Create 5 educators total for the main institution
            List<Educador> educadores = criarEducadores(instituicaoPadrao);
            
            // Create 3 turmas
            List<Turma> turmas = criarTurmas(instituicaoPadrao, educadores);
            
            // Create 25 alunos total
            criarAlunos(instituicaoPadrao, turmas);
        } else {
            Instituicao instituicaoPadrao = instituicaoRepository.findByEmail("contato@sementesdosaber.org").orElse(null);
            if (instituicaoPadrao != null && !passwordEncoder.matches("123456", instituicaoPadrao.getSenha())) {
                instituicaoPadrao.setSenha(passwordEncoder.encode("123456"));
                instituicaoRepository.save(instituicaoPadrao);
            }
        }
    }

    private List<Instituicao> criarInstituicoes() {
        List<Instituicao> instituicoes = new ArrayList<>();
        String[][] dadosInstituicoes = {
            {"ONG Sementes do Saber", "contato@sementesdosaber.org", "12.345.678/0001-90"},
            {"Instituto Alfabetizar é Viver", "contato@alfabetizareviver.org", "98.765.432/0001-10"},
            {"Associação Letras e Vida", "contato@letrasdevida.org", "11.223.344/0001-55"}
        };

        for (String[] dados : dadosInstituicoes) {
            Instituicao instituicao = Instituicao.builder()
                    .nome(dados[0])
                    .email(dados[1])
                    .senha(passwordEncoder.encode("123456"))
                    .cnpj(dados[2])
                    .build();
            instituicoes.add(instituicaoRepository.save(instituicao));
        }
        return instituicoes;
    }

    private List<Educador> criarEducadores(Instituicao instituicao) {
        List<Educador> educadores = new ArrayList<>();
        String[][] dadosEducadores = {
            {"Maria Silva", "Licenciatura em Letras"},
            {"João Santos", "Pedagogia"},
            {"Ana Costa", "Licenciatura em Educação de Jovens e Adultos"},
            {"Carlos Oliveira", "Pedagogia"},
            {"Beatriz Lima", "Licenciatura em Letras"}
        };

        for (int i = 0; i < dadosEducadores.length; i++) {
            String nome = dadosEducadores[i][0];
            String formacao = dadosEducadores[i][1];
            String slug = nome.toLowerCase()
                    .replace(" ", ".")
                    .replace("ã", "a")
                    .replace("á", "a")
                    .replace("â", "a")
                    .replace("é", "e")
                    .replace("í", "i")
                    .replace("ó", "o")
                    .replace("ô", "o")
                    .replace("ú", "u")
                    .replace("ç", "c");

            Educador educador = Educador.builder()
                    .nome(nome)
                    .email(slug + "@" + instituicao.getEmail().replace("contato@", "").replace(".org", ""))
                    .telefone(telefoneCelular(i))
                    .formacao(formacao)
                    .fotoUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=" + nome.replace(" ", ""))
                    .instituicao(instituicao)
                    .build();
            educadores.add(educadorRepository.save(educador));
        }
        return educadores;
    }

    private List<Turma> criarTurmas(Instituicao instituicao, List<Educador> educadores) {
        List<Turma> turmas = new ArrayList<>();
        
        Turma turma1 = Turma.builder()
                .nome("Turma Alfa")
                .turno(Turno.MANHA)
                .diasSemana(List.of(DiaSemana.SEGUNDA, DiaSemana.QUARTA, DiaSemana.SEXTA))
                .capacidadeMaxima(10)
                .educador(educadores.get(0))
                .instituicao(instituicao)
                .build();
        turmas.add(turmaRepository.save(turma1));
        
        Turma turma2 = Turma.builder()
                .nome("Turma Beta")
                .turno(Turno.NOITE)
                .diasSemana(List.of(DiaSemana.TERCA, DiaSemana.QUINTA))
                .capacidadeMaxima(10)
                .educador(educadores.get(1))
                .instituicao(instituicao)
                .build();
        turmas.add(turmaRepository.save(turma2));
        
        Turma turma3 = Turma.builder()
                .nome("Turma Gama")
                .turno(Turno.TARDE)
                .diasSemana(List.of(DiaSemana.SEGUNDA, DiaSemana.TERCA, DiaSemana.QUARTA))
                .capacidadeMaxima(10)
                .educador(educadores.get(2))
                .instituicao(instituicao)
                .build();
        turmas.add(turmaRepository.save(turma3));
        
        return turmas;
    }

    private void criarAlunos(Instituicao instituicao, List<Turma> turmas) {
        String[][] dadosAlunos = {
            {"José da Silva", "1965", "03", "15", "INICIANTE"},
            {"Maria dos Santos", "1972", "07", "22", "INTERMEDIARIO"},
            {"Antônio Costa", "1958", "11", "08", "AVANCADO"},
            {"Francisco Oliveira", "1969", "04", "30", "INICIANTE"},
            {"Ana Souza", "1975", "09", "12", "INTERMEDIARIO"},
            {"Joana Pereira", "1962", "01", "25", "INICIANTE"},
            {"Pedro Almeida", "1980", "06", "18", "AVANCADO"},
            {"Carlos Fernandes", "1955", "12", "05", "INTERMEDIARIO"},
            {"Paula Ribeiro", "1978", "08", "03", "INICIANTE"},
            {"Lucas Gonçalves", "1967", "10", "20", "INTERMEDIARIO"},
            {"Mariana Carvalho", "1963", "02", "14", "INICIANTE"},
            {"Rafael Nunes", "1971", "05", "09", "AVANCADO"},
            {"Juliana Araújo", "1959", "08", "27", "INTERMEDIARIO"},
            {"Fernando Farias", "1974", "11", "11", "INICIANTE"},
            {"Amanda Cardoso", "1966", "03", "03", "INTERMEDIARIO"},
            {"Diego Moreira", "1982", "07", "19", "INICIANTE"},
            {"Isabela Barbosa", "1957", "10", "01", "AVANCADO"},
            {"Gustavo Pires", "1970", "01", "10", "INTERMEDIARIO"},
            {"Letícia Azevedo", "1964", "04", "23", "INICIANTE"},
            {"Ricardo Sousa", "1977", "09", "15", "INTERMEDIARIO"},
            {"Camila Lopes", "1961", "06", "07", "AVANCADO"},
            {"Eduardo Mendes", "1973", "12", "28", "INICIANTE"},
            {"Larissa Freitas", "1956", "02", "18", "INTERMEDIARIO"},
            {"Daniel Correia", "1968", "07", "04", "INICIANTE"},
            {"Patrícia Gomes", "1979", "11", "22", "AVANCADO"}
        };

        int[] alunosPorTurma = distribuirAlunosPorTurma(turmas.size(), dadosAlunos.length);
        int alunoIndex = 0;

        for (int turmaIndex = 0; turmaIndex < turmas.size(); turmaIndex++) {
            Turma turma = turmas.get(turmaIndex);
            for (int j = 0; j < alunosPorTurma[turmaIndex]; j++) {
                if (alunoIndex >= dadosAlunos.length) break;
                String[] dados = dadosAlunos[alunoIndex];
                alunoRepository.save(Aluno.builder()
                        .nome(dados[0])
                        .dataNascimento(LocalDate.of(
                                Integer.parseInt(dados[1]),
                                Integer.parseInt(dados[2]),
                                Integer.parseInt(dados[3])))
                        .telefone(telefoneCelular(alunoIndex + 3))
                        .nivelAlfabetizacao(NivelAlfabetizacao.valueOf(dados[4]))
                        .turma(turma)
                        .instituicao(instituicao)
                        .build());
                alunoIndex++;
            }
        }
    }

    private int[] distribuirAlunosPorTurma(int totalTurmas, int totalAlunos) {
        int[] alunosPorTurma = new int[totalTurmas];
        int restantes = totalAlunos;
        for (int i = 0; i < totalTurmas; i++) {
            int turmasRestantes = totalTurmas - i;
            int media = (int) Math.ceil((double) restantes / turmasRestantes);
            alunosPorTurma[i] = media;
            restantes -= media;
        }
        return alunosPorTurma;
    }

    private String telefoneCelular(int seed) {
        String ddd = DDD[seed % DDD.length];
        int prefixo = 90000 + (seed * 137) % 10000;
        int sufixo = 1000 + (seed * 251) % 9000;
        return String.format("(%s) %d-%04d", ddd, prefixo, sufixo);
    }
}

package br.com.brasilletrado.config;

import br.com.brasilletrado.model.Aluno;
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

    private static final String[] EDUCADOR_NOMES = {
        "Ana Paula Rodrigues", "Carlos Eduardo Mendes", "Fernanda Lima Souza",
        "Ricardo Alves Pereira", "Juliana Costa Nunes", "Marcos Antônio Silva",
        "Patrícia Oliveira Santos", "Roberto Ferreira Gomes", "Camila Ribeiro Almeida",
        "Diego Martins Carvalho", "Luciana Barbosa Teixeira", "Henrique Duarte Rocha",
        "Mariana Pinto Azevedo", "Felipe Cavalcanti Moura", "Beatriz Nascimento Lopes"
    };

    private static final String[] EDUCADOR_FORMACOES = {
        "Licenciatura em Pedagogia", "Especialização em Alfabetização de Adultos",
        "Letras — Português e Literatura", "Pedagogia com ênfase em Educação Popular",
        "Mestrado em Educação", "Licenciatura em Letras", "Especialização em Psicopedagogia",
        "Licenciatura em Pedagogia", "Letras — Língua Portuguesa", "Especialização em Educação de Jovens e Adultos",
        "Licenciatura em Pedagogia", "Mestrado em Linguística Aplicada",
        "Licenciatura em Letras", "Especialização em Metodologias Ativas",
        "Licenciatura em Pedagogia"
    };

    private static final String[] DDD = {"11", "21", "31", "41", "51", "61", "71", "81", "85", "47"};

    private static final String[][] TURMAS = {
        {"Alfabetização Inicial I", "MANHA", "Segunda, Quarta", "8"},
        {"Alfabetização Inicial II", "MANHA", "Terça, Quinta", "8"},
        {"Alfabetização Intermediária I", "TARDE", "Segunda, Quarta, Sexta", "8"},
        {"Alfabetização Intermediária II", "TARDE", "Terça, Quinta", "8"},
        {"Reforço de Leitura", "TARDE", "Segunda, Quarta", "6"},
        {"Alfabetização Avançada I", "NOITE", "Segunda, Quarta", "8"},
        {"Alfabetização Avançada II", "NOITE", "Terça, Quinta", "8"},
        {"Oficina de Escrita", "NOITE", "Quarta, Sexta", "6"},
        {"Letramento Digital", "MANHA", "Terça, Quinta", "6"},
        {"Preparação para Certificação", "MANHA", "Segunda, Quarta, Sexta", "6"}
    };

    private static final String[] ALUNO_NOMES = {
        "João da Silva", "Maria de Souza", "Antônio Santos", "Francisco Oliveira",
        "Sebastiana Lima", "José Ferreira", "Ana Maria Cruz", "Raimundo Alves",
        "Terezinha Barbosa", "Manoel Pereira", "Lucia Helena Rocha", "Paulo César Dias",
        "Rosa Maria Conceição", "Gilberto Nunes", "Cleide Aparecida Moura",
        "Valdemar Costa", "Norma Regina Pires", "Edson Luiz Farias", "Ivone Santos",
        "Benedito Almeida", "Sônia Regina Lopes", "Joaquim Barbosa", "Helena Ferreira",
        "Ademir Gomes", "Célia Maria Teixeira", "Osvaldo Pereira", "Marlene Souza",
        "Wilson Rodrigues", "Aparecida Nunes", "Geraldo Machado", "Neuza Oliveira",
        "Cláudio Henrique Silva", "Elza Maria Carvalho", "Sebastião Duarte",
        "Regina Célia Martins", "Luiz Carlos Azevedo", "Fátima Bernardes",
        "Márcio Antônio Ribeiro", "Vera Lúcia Campos", "Roberto Carlos Lima",
        "Denise Aparecida Freitas", "Eduardo Henrique Pinto", "Silvana Costa",
        "Milton José Barbosa", "Rosângela Ferreira", "Ailton Pereira",
        "Margarida Alves", "Cícero Antônio Gomes", "Dalva Regina Souza", "Hélio Martins"
    };

    private static final int[] ALUNO_NASCIMENTO_ANO = {
        1965, 1958, 1972, 1950, 1960, 1977, 1968, 1955, 1962, 1970,
        1963, 1957, 1966, 1974, 1959, 1971, 1964, 1969, 1976, 1953,
        1967, 1956, 1973, 1961, 1978, 1954, 1965, 1975, 1960, 1952,
        1979, 1968, 1958, 1963, 1970, 1966, 1957, 1972, 1964, 1955,
        1976, 1969, 1961, 1973, 1959, 1967, 1954, 1971, 1962, 1965
    };

    private static final int[] ALUNO_NASCIMENTO_MES = {
        4, 9, 12, 1, 8, 3, 11, 6, 7, 2,
        10, 5, 3, 8, 12, 1, 9, 4, 6, 11,
        2, 7, 10, 5, 3, 8, 12, 1, 9, 4,
        6, 11, 2, 7, 10, 5, 3, 8, 12, 1,
        9, 4, 6, 11, 2, 7, 10, 5, 3, 8
    };

    private static final int[] ALUNO_NASCIMENTO_DIA = {
        12, 20, 5, 30, 15, 22, 10, 18, 25, 14,
        8, 17, 23, 6, 19, 28, 3, 11, 27, 9,
        16, 21, 2, 13, 24, 7, 18, 29, 4, 26,
        15, 1, 22, 9, 30, 11, 6, 19, 14, 25,
        8, 17, 3, 20, 12, 28, 5, 16, 23, 10
    };

    private static final NivelAlfabetizacao[] ALUNO_NIVEIS = {
        NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE,
        NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE,
        NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE,
        NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE,
        NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE,
        NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE, NivelAlfabetizacao.INICIANTE,
        NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO,
        NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO,
        NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO,
        NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO,
        NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO,
        NivelAlfabetizacao.INTERMEDIARIO, NivelAlfabetizacao.INTERMEDIARIO,
        NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO,
        NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO,
        NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO,
        NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO,
        NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO, NivelAlfabetizacao.AVANCADO
    };

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
        if (instituicaoRepository.count() == 0 && educadorRepository.count() == 0
                && turmaRepository.count() == 0 && alunoRepository.count() == 0) {
            Instituicao instituicao = criarInstituicao();
            List<Educador> educadores = criarEducadores(instituicao);
            List<Turma> turmas = criarTurmas(instituicao, educadores);
            criarAlunos(instituicao, turmas);
        }
    }

    private Instituicao criarInstituicao() {
        Instituicao instituicao = Instituicao.builder()
                .nome("Centro de Alfabetização Brasil Letrado")
                .email("escola@brasil.org")
                .senha(passwordEncoder.encode("123456"))
                .cnpj("12.345.678/0001-90")
                .build();
        return instituicaoRepository.save(instituicao);
    }

    private List<Educador> criarEducadores(Instituicao instituicao) {
        List<Educador> educadores = new ArrayList<>();
        for (int i = 0; i < EDUCADOR_NOMES.length; i++) {
            String slug = EDUCADOR_NOMES[i].toLowerCase()
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
                    .nome(EDUCADOR_NOMES[i])
                    .email(slug + "@brasil.org")
                    .telefone(telefoneCelular(i))
                    .formacao(EDUCADOR_FORMACOES[i])
                    .fotoUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=" + EDUCADOR_NOMES[i].replace(" ", ""))
                    .instituicao(instituicao)
                    .build();
            educadores.add(educadorRepository.save(educador));
        }
        return educadores;
    }

    private List<Turma> criarTurmas(Instituicao instituicao, List<Educador> educadores) {
        List<Turma> turmas = new ArrayList<>();
        for (int i = 0; i < TURMAS.length; i++) {
            Turma turma = Turma.builder()
                    .nome(TURMAS[i][0])
                    .turno(Turno.valueOf(TURMAS[i][1]))
                    .diasSemana(TURMAS[i][2])
                    .capacidadeMaxima(Integer.parseInt(TURMAS[i][3]))
                    .educador(educadores.get(i))
                    .instituicao(instituicao)
                    .build();
            turmas.add(turmaRepository.save(turma));
        }
        return turmas;
    }

    private void criarAlunos(Instituicao instituicao, List<Turma> turmas) {
        int[] alunosPorTurma = distribuirAlunosPorTurma(turmas.size(), ALUNO_NOMES.length);

        int alunoIndex = 0;
        for (int turmaIndex = 0; turmaIndex < turmas.size(); turmaIndex++) {
            Turma turma = turmas.get(turmaIndex);
            for (int j = 0; j < alunosPorTurma[turmaIndex]; j++) {
                alunoRepository.save(Aluno.builder()
                        .nome(ALUNO_NOMES[alunoIndex])
                        .dataNascimento(LocalDate.of(
                                ALUNO_NASCIMENTO_ANO[alunoIndex],
                                ALUNO_NASCIMENTO_MES[alunoIndex],
                                ALUNO_NASCIMENTO_DIA[alunoIndex]))
                        .telefone(telefoneCelular(alunoIndex + 3))
                        .nivelAlfabetizacao(ALUNO_NIVEIS[alunoIndex])
                        .turma(turma)
                        .instituicao(instituicao)
                        .build());
                alunoIndex++;
            }
        }
    }

    private int[] distribuirAlunosPorTurma(int totalTurmas, int totalAlunos) {
        int[] capacidades = new int[totalTurmas];
        for (int i = 0; i < totalTurmas; i++) {
            capacidades[i] = Integer.parseInt(TURMAS[i][3]);
        }

        int[] alunosPorTurma = new int[totalTurmas];
        int restantes = totalAlunos;
        for (int i = 0; i < totalTurmas; i++) {
            int turmasRestantes = totalTurmas - i;
            int media = (int) Math.ceil((double) restantes / turmasRestantes);
            int alocados = Math.min(media, capacidades[i]);
            alunosPorTurma[i] = alocados;
            restantes -= alocados;
        }
        return alunosPorTurma;
    }

    private String telefoneCelular(int seed) {
        String ddd = DDD[seed % DDD.length];
        int prefixo = 90000 + (seed * 137) % 10000;
        int sufixo = 1000 + (seed * 251) % 9000;
        return String.format("(%s) 9%04d-%04d", ddd, prefixo % 10000, sufixo);
    }
}

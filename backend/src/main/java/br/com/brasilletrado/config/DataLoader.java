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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@org.springframework.context.annotation.Profile("!test")
public class DataLoader implements CommandLineRunner {

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
    public void run(String... args) throws Exception {
        if (instituicaoRepository.count() == 0 && educadorRepository.count() == 0 &&
            turmaRepository.count() == 0 && alunoRepository.count() == 0) {

            // Criar Instituição Padrão (Inquilino inicial)
            Instituicao inst = Instituicao.builder()
                    .nome("Escola Brasil Letrado")
                    .email("escola@brasil.org")
                    .senha(passwordEncoder.encode("123456"))
                    .cnpj("12.345.678/0001-90")
                    .build();
            
            instituicaoRepository.save(inst);
            
            // Seed Educadores
            Educador e1 = Educador.builder()
                    .nome("Paulo Freire")
                    .email("paulo@freire.org")
                    .telefone("(81) 99888-7766")
                    .formacao("Doutorado em Educação")
                    .fotoUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo")
                    .instituicao(inst)
                    .build();
            
            Educador e2 = Educador.builder()
                    .nome("Maria Montessori")
                    .email("maria@montessori.org")
                    .telefone("(11) 98765-4321")
                    .formacao("Pedagogia e Medicina")
                    .fotoUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=Maria")
                    .instituicao(inst)
                    .build();
            
            Educador e3 = Educador.builder()
                    .nome("Jean Piaget")
                    .email("jean@piaget.org")
                    .telefone("(21) 97654-3210")
                    .formacao("Psicologia Cognitiva")
                    .fotoUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=Jean")
                    .instituicao(inst)
                    .build();

            educadorRepository.save(e1);
            educadorRepository.save(e2);
            educadorRepository.save(e3);

            // Seed Turmas
            Turma t1 = Turma.builder()
                    .nome("Alfabetização Inicial I")
                    .turno(Turno.MANHA)
                    .diasSemana("Segunda, Quarta")
                    .capacidadeMaxima(15)
                    .educador(e1)
                    .instituicao(inst)
                    .build();

            Turma t2 = Turma.builder()
                    .nome("Alfabetização Intermediária II")
                    .turno(Turno.TARDE)
                    .diasSemana("Terça, Quinta")
                    .capacidadeMaxima(20)
                    .educador(e2)
                    .instituicao(inst)
                    .build();

            Turma t3 = Turma.builder()
                    .nome("Alfabetização Avançada III")
                    .turno(Turno.NOITE)
                    .diasSemana("Segunda, Quarta, Sexta")
                    .capacidadeMaxima(25)
                    .educador(e3)
                    .instituicao(inst)
                    .build();

            Turma t4 = Turma.builder()
                    .nome("Oficina de Leitura")
                    .turno(Turno.NOITE)
                    .diasSemana("Terça, Quinta")
                    .capacidadeMaxima(12)
                    .educador(e1)
                    .instituicao(inst)
                    .build();

            turmaRepository.save(t1);
            turmaRepository.save(t2);
            turmaRepository.save(t3);
            turmaRepository.save(t4);

            // Seed Alunos
            alunoRepository.save(Aluno.builder()
                    .nome("João da Silva")
                    .dataNascimento(LocalDate.of(1965, 4, 12))
                    .telefone("(11) 91111-2222")
                    .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                    .turma(t1)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("Maria de Souza")
                    .dataNascimento(LocalDate.of(1958, 9, 20))
                    .telefone("(11) 92222-3333")
                    .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                    .turma(t1)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("Antônio Santos")
                    .dataNascimento(LocalDate.of(1972, 12, 5))
                    .telefone("(11) 93333-4444")
                    .nivelAlfabetizacao(NivelAlfabetizacao.INTERMEDIARIO)
                    .turma(t2)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("Francisco Oliveira")
                    .dataNascimento(LocalDate.of(1950, 1, 30))
                    .telefone("(11) 94444-5555")
                    .nivelAlfabetizacao(NivelAlfabetizacao.INTERMEDIARIO)
                    .turma(t2)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("Sebastiana Lima")
                    .dataNascimento(LocalDate.of(1960, 8, 15))
                    .telefone("(11) 95555-6666")
                    .nivelAlfabetizacao(NivelAlfabetizacao.AVANCADO)
                    .turma(t3)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("José Ferreira")
                    .dataNascimento(LocalDate.of(1977, 3, 22))
                    .telefone("(11) 96666-7777")
                    .nivelAlfabetizacao(NivelAlfabetizacao.AVANCADO)
                    .turma(t3)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("Ana Maria Cruz")
                    .dataNascimento(LocalDate.of(1968, 11, 10))
                    .telefone("(11) 97777-8888")
                    .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                    .turma(t1)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("Raimundo Alves")
                    .dataNascimento(LocalDate.of(1955, 6, 18))
                    .telefone("(11) 98888-9999")
                    .nivelAlfabetizacao(NivelAlfabetizacao.INTERMEDIARIO)
                    .turma(t2)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("Terezinha Barbosa")
                    .dataNascimento(LocalDate.of(1962, 7, 25))
                    .telefone("(11) 99999-0000")
                    .nivelAlfabetizacao(NivelAlfabetizacao.AVANCADO)
                    .turma(t3)
                    .instituicao(inst)
                    .build());

            alunoRepository.save(Aluno.builder()
                    .nome("Manoel Pereira")
                    .dataNascimento(LocalDate.of(1970, 2, 14))
                    .telefone("(11) 90000-1111")
                    .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                    .turma(t4)
                    .instituicao(inst)
                    .build());
        }
    }
}

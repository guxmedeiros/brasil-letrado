package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.AlunoDTO;
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
import br.com.brasilletrado.security.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AlunoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private EducadorRepository educadorRepository;

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private Turma turmaSalva;
    private Instituicao inst;
    private String token;

    @BeforeEach
    public void setup() {
        alunoRepository.deleteAll();
        turmaRepository.deleteAll();
        educadorRepository.deleteAll();
        instituicaoRepository.deleteAll();

        inst = Instituicao.builder()
                .nome("Test Inst")
                .email("test@test.com")
                .senha(passwordEncoder.encode("password"))
                .cnpj("12.345.678/0001-90")
                .build();
        instituicaoRepository.save(inst);
        token = "Bearer " + jwtService.generateToken(inst);

        Educador e = Educador.builder().nome("Paulo Freire").instituicao(inst).build();
        Educador educador = educadorRepository.save(e);

        Turma t = Turma.builder().nome("Turma A").turno(Turno.MANHA).educador(educador).instituicao(inst).build();
        turmaSalva = turmaRepository.save(t);
    }

    @Test
    public void deveCriarAlunoComSucesso() throws Exception {
        AlunoDTO dto = AlunoDTO.builder()
                .nome("João da Silva")
                .dataNascimento(LocalDate.of(1980, 5, 10))
                .telefone("11999998888")
                .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                .turmaId(turmaSalva.getId())
                .build();

        mockMvc.perform(post("/api/alunos")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.nome", is("João da Silva")))
                .andExpect(jsonPath("$.turmaNome", is("Turma A")));
    }

    @Test
    public void naoDeveCriarAlunoSemNome() throws Exception {
        AlunoDTO dto = AlunoDTO.builder()
                .dataNascimento(LocalDate.of(1980, 5, 10))
                .build();

        mockMvc.perform(post("/api/alunos")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", is("Erro de validação")))
                .andExpect(jsonPath("$.details.nome", notNullValue()));
    }

    @Test
    public void deveListarAlunos() throws Exception {
        Aluno a = Aluno.builder()
                .nome("Maria")
                .dataNascimento(LocalDate.of(1970, 1, 1))
                .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                .turma(turmaSalva)
                .instituicao(inst)
                .build();
        alunoRepository.save(a);

        mockMvc.perform(get("/api/alunos").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].nome", is("Maria")));
    }

    @Test
    public void deveBuscarAlunoPorId() throws Exception {
        Aluno a = Aluno.builder()
                .nome("Maria")
                .dataNascimento(LocalDate.of(1970, 1, 1))
                .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                .turma(turmaSalva)
                .instituicao(inst)
                .build();
        Aluno salvo = alunoRepository.save(a);

        mockMvc.perform(get("/api/alunos/" + salvo.getId()).header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is("Maria")));
    }

    @Test
    public void deveAtualizarAluno() throws Exception {
        Aluno a = Aluno.builder()
                .nome("Maria")
                .dataNascimento(LocalDate.of(1970, 1, 1))
                .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                .turma(turmaSalva)
                .instituicao(inst)
                .build();
        Aluno salvo = alunoRepository.save(a);

        AlunoDTO updateDto = AlunoDTO.builder()
                .nome("Maria Atualizada")
                .nivelAlfabetizacao(NivelAlfabetizacao.AVANCADO)
                .turmaId(turmaSalva.getId())
                .build();

        mockMvc.perform(put("/api/alunos/" + salvo.getId())
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is("Maria Atualizada")))
                .andExpect(jsonPath("$.nivelAlfabetizacao", is("AVANCADO")));
    }

    @Test
    public void deveExcluirAluno() throws Exception {
        Aluno a = Aluno.builder()
                .nome("Maria")
                .dataNascimento(LocalDate.of(1970, 1, 1))
                .nivelAlfabetizacao(NivelAlfabetizacao.INICIANTE)
                .turma(turmaSalva)
                .instituicao(inst)
                .build();
        Aluno salvo = alunoRepository.save(a);

        mockMvc.perform(delete("/api/alunos/" + salvo.getId()).header("Authorization", token))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/alunos/" + salvo.getId()).header("Authorization", token))
                .andExpect(status().isNotFound());
    }
}

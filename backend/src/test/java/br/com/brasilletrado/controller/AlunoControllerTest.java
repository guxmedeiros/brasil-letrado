package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.AlunoDTO;
import br.com.brasilletrado.model.Aluno;
import br.com.brasilletrado.model.Educador;
import br.com.brasilletrado.model.NivelAlfabetizacao;
import br.com.brasilletrado.model.Turma;
import br.com.brasilletrado.model.Turno;
import br.com.brasilletrado.repository.AlunoRepository;
import br.com.brasilletrado.repository.EducadorRepository;
import br.com.brasilletrado.repository.TurmaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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
    private ObjectMapper objectMapper;

    private Turma turmaSalva;

    @BeforeEach
    public void setup() {
        alunoRepository.deleteAll();
        turmaRepository.deleteAll();
        educadorRepository.deleteAll();

        Educador e = Educador.builder().nome("Paulo Freire").build();
        Educador educador = educadorRepository.save(e);

        Turma t = Turma.builder().nome("Turma A").turno(Turno.MANHA).educador(educador).build();
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
                .turmaId(turmaSalva.getId())
                .build();

        mockMvc.perform(post("/api/alunos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", is("Erro de validação")))
                .andExpect(jsonPath("$.details.nome", notNullValue()));
    }

    @Test
    public void deveListarAlunos() throws Exception {
        Aluno a = Aluno.builder()
                .nome("Maria de Souza")
                .nivelAlfabetizacao(NivelAlfabetizacao.INTERMEDIARIO)
                .turma(turmaSalva)
                .build();
        alunoRepository.save(a);

        mockMvc.perform(get("/api/alunos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].nome", is("Maria de Souza")));
    }

    @Test
    public void deveBuscarAlunoPorId() throws Exception {
        Aluno a = Aluno.builder()
                .nome("Maria de Souza")
                .nivelAlfabetizacao(NivelAlfabetizacao.INTERMEDIARIO)
                .turma(turmaSalva)
                .build();
        Aluno salvo = alunoRepository.save(a);

        mockMvc.perform(get("/api/alunos/" + salvo.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is("Maria de Souza")));
    }

    @Test
    public void deveAtualizarAluno() throws Exception {
        Aluno a = Aluno.builder()
                .nome("Maria de Souza")
                .nivelAlfabetizacao(NivelAlfabetizacao.INTERMEDIARIO)
                .turma(turmaSalva)
                .build();
        Aluno salvo = alunoRepository.save(a);

        AlunoDTO updateDto = AlunoDTO.builder()
                .nome("Maria de Souza Modificada")
                .nivelAlfabetizacao(NivelAlfabetizacao.AVANCADO)
                .turmaId(turmaSalva.getId())
                .build();

        mockMvc.perform(put("/api/alunos/" + salvo.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is("Maria de Souza Modificada")))
                .andExpect(jsonPath("$.nivelAlfabetizacao", is("AVANCADO")));
    }

    @Test
    public void deveExcluirAluno() throws Exception {
        Aluno a = Aluno.builder()
                .nome("Maria de Souza")
                .nivelAlfabetizacao(NivelAlfabetizacao.INTERMEDIARIO)
                .turma(turmaSalva)
                .build();
        Aluno salvo = alunoRepository.save(a);

        mockMvc.perform(delete("/api/alunos/" + salvo.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/alunos/" + salvo.getId()))
                .andExpect(status().isNotFound());
    }
}

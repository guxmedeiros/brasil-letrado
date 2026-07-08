package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.TurmaDTO;
import br.com.brasilletrado.model.DiaSemana;
import br.com.brasilletrado.model.Educador;
import br.com.brasilletrado.model.Instituicao;
import br.com.brasilletrado.model.Turma;
import br.com.brasilletrado.model.Turno;
import java.util.List;
import br.com.brasilletrado.repository.EducadorRepository;
import br.com.brasilletrado.repository.TurmaRepository;
import br.com.brasilletrado.repository.AlunoRepository;
import br.com.brasilletrado.repository.InstituicaoRepository;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TurmaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private EducadorRepository educadorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private Educador educadorSalvo;
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
        educadorSalvo = educadorRepository.save(e);
    }

    @Test
    public void deveCriarTurmaComSucesso() throws Exception {
        TurmaDTO dto = TurmaDTO.builder()
                .nome("Turma A")
                .turno(Turno.MANHA)
                .diasSemana(List.of(DiaSemana.SEGUNDA, DiaSemana.QUARTA))
                .capacidadeMaxima(20)
                .educadorId(educadorSalvo.getId())
                .build();

        mockMvc.perform(post("/api/turmas")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.nome", is("Turma A")))
                .andExpect(jsonPath("$.educadorNome", is("Paulo Freire")));
    }

    @Test
    public void naoDeveCriarTurmaSemNome() throws Exception {
        TurmaDTO dto = TurmaDTO.builder()
                .turno(Turno.MANHA)
                .build();

        mockMvc.perform(post("/api/turmas")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", is("Erro de validação")))
                .andExpect(jsonPath("$.details.nome", notNullValue()));
    }

    @Test
    public void deveListarTurmas() throws Exception {
        Turma t = Turma.builder().nome("Turma B").turno(Turno.TARDE).educador(educadorSalvo).instituicao(inst).build();
        turmaRepository.save(t);

        mockMvc.perform(get("/api/turmas")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].nome", is("Turma B")));
    }

    @Test
    public void deveBuscarTurmaPorId() throws Exception {
        Turma t = Turma.builder().nome("Turma B").turno(Turno.TARDE).educador(educadorSalvo).instituicao(inst).build();
        Turma salva = turmaRepository.save(t);

        mockMvc.perform(get("/api/turmas/" + salva.getId())
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is("Turma B")));
    }

    @Test
    public void deveAtualizarTurma() throws Exception {
        Turma t = Turma.builder().nome("Turma B").turno(Turno.TARDE).educador(educadorSalvo).instituicao(inst).build();
        Turma salva = turmaRepository.save(t);

        TurmaDTO updateDto = TurmaDTO.builder()
                .nome("Turma B - Modificada")
                .turno(Turno.NOITE)
                .educadorId(educadorSalvo.getId())
                .build();

        mockMvc.perform(put("/api/turmas/" + salva.getId())
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is("Turma B - Modificada")))
                .andExpect(jsonPath("$.turno", is("NOITE")));
    }

    @Test
    public void deveExcluirTurma() throws Exception {
        Turma t = Turma.builder().nome("Turma B").turno(Turno.TARDE).educador(educadorSalvo).instituicao(inst).build();
        Turma salva = turmaRepository.save(t);

        mockMvc.perform(delete("/api/turmas/" + salva.getId())
                .header("Authorization", token))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/turmas/" + salva.getId())
                .header("Authorization", token))
                .andExpect(status().isNotFound());
    }
}

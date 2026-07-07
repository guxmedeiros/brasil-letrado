package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.EducadorDTO;
import br.com.brasilletrado.model.Educador;
import br.com.brasilletrado.model.Instituicao;
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
public class EducadorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EducadorRepository educadorRepository;

    @Autowired
    private TurmaRepository turmaRepository;

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
    }

    @Test
    public void deveCriarEducadorComSucesso() throws Exception {
        EducadorDTO dto = EducadorDTO.builder()
                .nome("Maria Montessori")
                .email("maria@montessori.org")
                .telefone("11988887777")
                .formacao("Pedagogia")
                .build();

        mockMvc.perform(post("/api/educadores")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.nome", is("Maria Montessori")));
    }

    @Test
    public void naoDeveCriarEducadorSemNome() throws Exception {
        EducadorDTO dto = EducadorDTO.builder()
                .email("maria@montessori.org")
                .build();

        mockMvc.perform(post("/api/educadores")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error", is("Erro de validação")))
                .andExpect(jsonPath("$.details.nome", notNullValue()));
    }

    @Test
    public void deveListarEducadores() throws Exception {
        Educador e = Educador.builder().nome("Paulo Freire").instituicao(inst).build();
        educadorRepository.save(e);

        mockMvc.perform(get("/api/educadores")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].nome", is("Paulo Freire")));
    }

    @Test
    public void deveBuscarEducadorPorId() throws Exception {
        Educador e = Educador.builder().nome("Paulo Freire").instituicao(inst).build();
        Educador salvo = educadorRepository.save(e);

        mockMvc.perform(get("/api/educadores/" + salvo.getId())
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is("Paulo Freire")));
    }

    @Test
    public void deveAtualizarEducador() throws Exception {
        Educador e = Educador.builder().nome("Paulo Freire").instituicao(inst).build();
        Educador salvo = educadorRepository.save(e);

        EducadorDTO updateDto = EducadorDTO.builder()
                .nome("Paulo Reglus Neves Freire")
                .build();

        mockMvc.perform(put("/api/educadores/" + salvo.getId())
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is("Paulo Reglus Neves Freire")));
    }

    @Test
    public void deveExcluirEducador() throws Exception {
        Educador e = Educador.builder().nome("Paulo Freire").instituicao(inst).build();
        Educador salvo = educadorRepository.save(e);

        mockMvc.perform(delete("/api/educadores/" + salvo.getId())
                .header("Authorization", token))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/educadores/" + salvo.getId())
                .header("Authorization", token))
                .andExpect(status().isNotFound());
    }
}

package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.InstituicaoDTO;
import br.com.brasilletrado.dto.LoginRequest;
import br.com.brasilletrado.dto.LoginResponse;
import br.com.brasilletrado.mapper.InstituicaoMapper;
import br.com.brasilletrado.model.Instituicao;
import br.com.brasilletrado.repository.InstituicaoRepository;
import br.com.brasilletrado.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticação", description = "Endpoints para registro e login de instituições")
public class AuthController {

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private InstituicaoMapper instituicaoMapper;

    @PostMapping("/register")
    @Operation(summary = "Registrar uma nova instituição")
    public ResponseEntity<InstituicaoDTO> register(@Valid @RequestBody InstituicaoDTO dto) {
        if (instituicaoRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }
        Instituicao instituicao = instituicaoMapper.toEntity(dto);
        instituicao.setSenha(passwordEncoder.encode(dto.getSenha()));
        Instituicao salva = instituicaoRepository.save(instituicao);
        return ResponseEntity.status(HttpStatus.CREATED).body(instituicaoMapper.toDTO(salva));
    }

    @PostMapping("/login")
    @Operation(summary = "Realizar login da instituição")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        Instituicao instituicao = instituicaoRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("E-mail ou senha incorretos"));

        if (!passwordEncoder.matches(request.getSenha(), instituicao.getSenha())) {
            throw new IllegalArgumentException("E-mail ou senha incorretos");
        }

        String token = jwtService.generateToken(instituicao);
        return ResponseEntity.ok(new LoginResponse(token, instituicao.getEmail(), instituicao.getNome()));
    }
}

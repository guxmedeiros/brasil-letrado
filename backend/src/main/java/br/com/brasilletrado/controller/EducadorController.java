package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.EducadorDTO;
import br.com.brasilletrado.mapper.EducadorMapper;
import br.com.brasilletrado.model.Educador;
import br.com.brasilletrado.repository.EducadorRepository;
import br.com.brasilletrado.repository.TurmaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/educadores")
@Tag(name = "Educadores", description = "Endpoints para gestão de educadores")
public class EducadorController {

    @Autowired
    private EducadorRepository educadorRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private EducadorMapper educadorMapper;

    @GetMapping
    @Operation(summary = "Listar todos os educadores")
    public List<EducadorDTO> listar() {
        return educadorRepository.findAll().stream()
                .map(educadorMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar educador por ID")
    public ResponseEntity<EducadorDTO> buscarPorId(@PathVariable Long id) {
        Educador educador = educadorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Educador não encontrado com o ID: " + id));
        return ResponseEntity.ok(educadorMapper.toDTO(educador));
    }

    @PostMapping
    @Operation(summary = "Cadastrar um novo educador")
    public ResponseEntity<EducadorDTO> cadastrar(@Valid @RequestBody EducadorDTO dto) {
        Educador educador = educadorMapper.toEntity(dto);
        Educador salvo = educadorRepository.save(educador);
        return ResponseEntity.status(HttpStatus.CREATED).body(educadorMapper.toDTO(salvo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar dados de um educador")
    public ResponseEntity<EducadorDTO> atualizar(@PathVariable Long id, @Valid @RequestBody EducadorDTO dto) {
        Educador educador = educadorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Educador não encontrado com o ID: " + id));

        educador.setNome(dto.getNome());
        educador.setEmail(dto.getEmail());
        educador.setTelefone(dto.getTelefone());
        educador.setFormacao(dto.getFormacao());

        Educador salvo = educadorRepository.save(educador);
        return ResponseEntity.ok(educadorMapper.toDTO(salvo));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir um educador")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        Educador educador = educadorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Educador não encontrado com o ID: " + id));

        if (turmaRepository.existsByEducadorId(id)) {
            throw new IllegalArgumentException("Não é possível excluir o educador pois ele está associado a uma ou mais turmas.");
        }

        educadorRepository.delete(educador);
        return ResponseEntity.noContent().build();
    }
}

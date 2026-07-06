package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.AlunoDTO;
import br.com.brasilletrado.mapper.AlunoMapper;
import br.com.brasilletrado.model.Aluno;
import br.com.brasilletrado.model.Turma;
import br.com.brasilletrado.repository.AlunoRepository;
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
@RequestMapping("/api/alunos")
@Tag(name = "Alunos", description = "Endpoints para gestão de alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private AlunoMapper alunoMapper;

    @GetMapping
    @Operation(summary = "Listar todos os alunos")
    public List<AlunoDTO> listar() {
        return alunoRepository.findAll().stream()
                .map(alunoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID")
    public ResponseEntity<AlunoDTO> buscarPorId(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com o ID: " + id));
        return ResponseEntity.ok(alunoMapper.toDTO(aluno));
    }

    @PostMapping
    @Operation(summary = "Cadastrar um novo aluno")
    public ResponseEntity<AlunoDTO> cadastrar(@Valid @RequestBody AlunoDTO dto) {
        Turma turma = null;
        if (dto.getTurmaId() != null) {
            turma = turmaRepository.findById(dto.getTurmaId())
                    .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada com o ID: " + dto.getTurmaId()));
        }

        Aluno aluno = alunoMapper.toEntity(dto, turma);
        Aluno salvo = alunoRepository.save(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoMapper.toDTO(salvo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar dados de um aluno")
    public ResponseEntity<AlunoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody AlunoDTO dto) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com o ID: " + id));

        Turma turma = null;
        if (dto.getTurmaId() != null) {
            turma = turmaRepository.findById(dto.getTurmaId())
                    .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada com o ID: " + dto.getTurmaId()));
        }

        aluno.setNome(dto.getNome());
        aluno.setDataNascimento(dto.getDataNascimento());
        aluno.setTelefone(dto.getTelefone());
        aluno.setNivelAlfabetizacao(dto.getNivelAlfabetizacao());
        aluno.setTurma(turma);

        Aluno salvo = alunoRepository.save(aluno);
        return ResponseEntity.ok(alunoMapper.toDTO(salvo));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir um aluno")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com o ID: " + id));

        alunoRepository.delete(aluno);
        return ResponseEntity.noContent().build();
    }
}

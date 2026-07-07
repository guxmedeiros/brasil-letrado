package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.AlunoDTO;
import br.com.brasilletrado.mapper.AlunoMapper;
import br.com.brasilletrado.model.Aluno;
import br.com.brasilletrado.model.Instituicao;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @Operation(summary = "Listar todos os alunos da instituição")
    public List<AlunoDTO> listar(@AuthenticationPrincipal Instituicao inst) {
        return alunoRepository.findAllByInstituicaoId(inst.getId()).stream()
                .map(alunoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID na instituição")
    public ResponseEntity<AlunoDTO> buscarPorId(@PathVariable Long id, @AuthenticationPrincipal Instituicao inst) {
        Aluno aluno = alunoRepository.findByIdAndInstituicaoId(id, inst.getId())
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com o ID: " + id));
        return ResponseEntity.ok(alunoMapper.toDTO(aluno));
    }

    @PostMapping
    @Operation(summary = "Cadastrar um novo aluno para a instituição")
    public ResponseEntity<AlunoDTO> cadastrar(@Valid @RequestBody AlunoDTO dto, @AuthenticationPrincipal Instituicao inst) {
        Turma turma = null;
        if (dto.getTurmaId() != null) {
            turma = turmaRepository.findByIdAndInstituicaoId(dto.getTurmaId(), inst.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada com o ID: " + dto.getTurmaId()));
        }

        Aluno aluno = alunoMapper.toEntity(dto, turma);
        aluno.setInstituicao(inst);
        Aluno salvo = alunoRepository.save(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoMapper.toDTO(salvo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar dados de um aluno da instituição")
    public ResponseEntity<AlunoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody AlunoDTO dto, @AuthenticationPrincipal Instituicao inst) {
        Aluno aluno = alunoRepository.findByIdAndInstituicaoId(id, inst.getId())
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com o ID: " + id));

        Turma turma = null;
        if (dto.getTurmaId() != null) {
            turma = turmaRepository.findByIdAndInstituicaoId(dto.getTurmaId(), inst.getId())
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
    @Operation(summary = "Excluir um aluno da instituição")
    public ResponseEntity<Void> excluir(@PathVariable Long id, @AuthenticationPrincipal Instituicao inst) {
        Aluno aluno = alunoRepository.findByIdAndInstituicaoId(id, inst.getId())
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com o ID: " + id));

        alunoRepository.delete(aluno);
        return ResponseEntity.noContent().build();
    }
}

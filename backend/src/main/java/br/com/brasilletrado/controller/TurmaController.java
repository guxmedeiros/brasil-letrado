package br.com.brasilletrado.controller;

import br.com.brasilletrado.dto.TurmaDTO;
import br.com.brasilletrado.mapper.TurmaMapper;
import br.com.brasilletrado.model.Educador;
import br.com.brasilletrado.model.Instituicao;
import br.com.brasilletrado.model.Turma;
import br.com.brasilletrado.repository.AlunoRepository;
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
@RequestMapping("/api/turmas")
@Tag(name = "Turmas", description = "Endpoints para gestão de turmas")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private EducadorRepository educadorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaMapper turmaMapper;

    @GetMapping
    @Operation(summary = "Listar todas as turmas da instituição")
    public List<TurmaDTO> listar(@AuthenticationPrincipal Instituicao inst) {
        return turmaRepository.findAllByInstituicaoId(inst.getId()).stream()
                .map(turma -> {
                    long qtd = alunoRepository.countByTurmaId(turma.getId());
                    return turmaMapper.toDTO(turma, qtd);
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar turma por ID na instituição")
    public ResponseEntity<TurmaDTO> buscarPorId(@PathVariable Long id, @AuthenticationPrincipal Instituicao inst) {
        Turma turma = turmaRepository.findByIdAndInstituicaoId(id, inst.getId())
                .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada com o ID: " + id));
        long qtd = alunoRepository.countByTurmaId(turma.getId());
        return ResponseEntity.ok(turmaMapper.toDTO(turma, qtd));
    }

    @PostMapping
    @Operation(summary = "Cadastrar uma nova turma para a instituição")
    public ResponseEntity<TurmaDTO> cadastrar(@Valid @RequestBody TurmaDTO dto, @AuthenticationPrincipal Instituicao inst) {
        Educador educador = null;
        if (dto.getEducadorId() != null) {
            educador = educadorRepository.findByIdAndInstituicaoId(dto.getEducadorId(), inst.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Educador não encontrado com o ID: " + dto.getEducadorId()));
        }

        Turma turma = turmaMapper.toEntity(dto, educador);
        turma.setInstituicao(inst);
        Turma salva = turmaRepository.save(turma);
        return ResponseEntity.status(HttpStatus.CREATED).body(turmaMapper.toDTO(salva, 0));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar dados de uma turma da instituição")
    public ResponseEntity<TurmaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody TurmaDTO dto, @AuthenticationPrincipal Instituicao inst) {
        Turma turma = turmaRepository.findByIdAndInstituicaoId(id, inst.getId())
                .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada com o ID: " + id));

        Educador educador = null;
        if (dto.getEducadorId() != null) {
            educador = educadorRepository.findByIdAndInstituicaoId(dto.getEducadorId(), inst.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Educador não encontrado com o ID: " + dto.getEducadorId()));
        }

        turma.setNome(dto.getNome());
        turma.setTurno(dto.getTurno());
        turma.setDiasSemana(dto.getDiasSemana());
        turma.setCapacidadeMaxima(dto.getCapacidadeMaxima());
        turma.setEducador(educador);

        Turma salva = turmaRepository.save(turma);
        long qtd = alunoRepository.countByTurmaId(salva.getId());
        return ResponseEntity.ok(turmaMapper.toDTO(salva, qtd));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir uma turma da instituição")
    public ResponseEntity<Void> excluir(@PathVariable Long id, @AuthenticationPrincipal Instituicao inst) {
        Turma turma = turmaRepository.findByIdAndInstituicaoId(id, inst.getId())
                .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada com o ID: " + id));

        if (alunoRepository.countByTurmaId(id) > 0) {
            throw new IllegalArgumentException("Não é possível excluir a turma pois ela possui alunos matriculados.");
        }

        turmaRepository.delete(turma);
        return ResponseEntity.noContent().build();
    }
}

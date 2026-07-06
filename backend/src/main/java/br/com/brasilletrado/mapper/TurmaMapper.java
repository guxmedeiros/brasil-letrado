package br.com.brasilletrado.mapper;

import br.com.brasilletrado.dto.TurmaDTO;
import br.com.brasilletrado.model.Educador;
import br.com.brasilletrado.model.Turma;
import org.springframework.stereotype.Component;

@Component
public class TurmaMapper {

    public TurmaDTO toDTO(Turma turma, long quantidadeAlunos) {
        if (turma == null) {
            return null;
        }
        return TurmaDTO.builder()
                .id(turma.getId())
                .nome(turma.getNome())
                .turno(turma.getTurno())
                .diasSemana(turma.getDiasSemana())
                .capacidadeMaxima(turma.getCapacidadeMaxima())
                .educadorId(turma.getEducador() != null ? turma.getEducador().getId() : null)
                .educadorNome(turma.getEducador() != null ? turma.getEducador().getNome() : null)
                .quantidadeAlunos(quantidadeAlunos)
                .build();
    }

    public Turma toEntity(TurmaDTO dto, Educador educador) {
        if (dto == null) {
            return null;
        }
        return Turma.builder()
                .id(dto.getId())
                .nome(dto.getNome())
                .turno(dto.getTurno())
                .diasSemana(dto.getDiasSemana())
                .capacidadeMaxima(dto.getCapacidadeMaxima())
                .educador(educador)
                .build();
    }
}

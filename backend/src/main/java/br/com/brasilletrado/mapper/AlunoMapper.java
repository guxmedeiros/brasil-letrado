package br.com.brasilletrado.mapper;

import br.com.brasilletrado.dto.AlunoDTO;
import br.com.brasilletrado.model.Aluno;
import br.com.brasilletrado.model.Turma;
import org.springframework.stereotype.Component;

@Component
public class AlunoMapper {

    public AlunoDTO toDTO(Aluno aluno) {
        if (aluno == null) {
            return null;
        }
        return AlunoDTO.builder()
                .id(aluno.getId())
                .nome(aluno.getNome())
                .dataNascimento(aluno.getDataNascimento())
                .telefone(aluno.getTelefone())
                .nivelAlfabetizacao(aluno.getNivelAlfabetizacao())
                .turmaId(aluno.getTurma() != null ? aluno.getTurma().getId() : null)
                .turmaNome(aluno.getTurma() != null ? aluno.getTurma().getNome() : null)
                .build();
    }

    public Aluno toEntity(AlunoDTO dto, Turma turma) {
        if (dto == null) {
            return null;
        }
        return Aluno.builder()
                .id(dto.getId())
                .nome(dto.getNome())
                .dataNascimento(dto.getDataNascimento())
                .telefone(dto.getTelefone())
                .nivelAlfabetizacao(dto.getNivelAlfabetizacao())
                .turma(turma)
                .build();
    }
}

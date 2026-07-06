package br.com.brasilletrado.mapper;

import br.com.brasilletrado.dto.EducadorDTO;
import br.com.brasilletrado.model.Educador;
import org.springframework.stereotype.Component;

@Component
public class EducadorMapper {

    public EducadorDTO toDTO(Educador educador) {
        if (educador == null) {
            return null;
        }
        return EducadorDTO.builder()
                .id(educador.getId())
                .nome(educador.getNome())
                .email(educador.getEmail())
                .telefone(educador.getTelefone())
                .formacao(educador.getFormacao())
                .build();
    }

    public Educador toEntity(EducadorDTO dto) {
        if (dto == null) {
            return null;
        }
        return Educador.builder()
                .id(dto.getId())
                .nome(dto.getNome())
                .email(dto.getEmail())
                .telefone(dto.getTelefone())
                .formacao(dto.getFormacao())
                .build();
    }
}

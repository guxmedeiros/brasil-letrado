package br.com.brasilletrado.mapper;

import br.com.brasilletrado.dto.InstituicaoDTO;
import br.com.brasilletrado.model.Instituicao;
import org.springframework.stereotype.Component;

@Component
public class InstituicaoMapper {

    public InstituicaoDTO toDTO(Instituicao instituicao) {
        if (instituicao == null) {
            return null;
        }
        return InstituicaoDTO.builder()
                .id(instituicao.getId())
                .nome(instituicao.getNome())
                .email(instituicao.getEmail())
                .cnpj(instituicao.getCnpj())
                .build();
    }

    public Instituicao toEntity(InstituicaoDTO dto) {
        if (dto == null) {
            return null;
        }
        return Instituicao.builder()
                .id(dto.getId())
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(dto.getSenha())
                .cnpj(dto.getCnpj())
                .build();
    }
}

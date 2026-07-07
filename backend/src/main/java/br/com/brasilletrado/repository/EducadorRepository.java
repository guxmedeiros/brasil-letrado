package br.com.brasilletrado.repository;

import br.com.brasilletrado.model.Educador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EducadorRepository extends JpaRepository<Educador, Long> {
    List<Educador> findAllByInstituicaoId(Long instituicaoId);
    Optional<Educador> findByIdAndInstituicaoId(Long id, Long instituicaoId);
}

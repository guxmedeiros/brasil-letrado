package br.com.brasilletrado.repository;

import br.com.brasilletrado.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    boolean existsByEducadorId(Long educadorId);
    List<Turma> findAllByInstituicaoId(Long instituicaoId);
    Optional<Turma> findByIdAndInstituicaoId(Long id, Long instituicaoId);
}

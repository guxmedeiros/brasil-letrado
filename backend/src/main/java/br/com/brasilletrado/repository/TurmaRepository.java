package br.com.brasilletrado.repository;

import br.com.brasilletrado.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    boolean existsByEducadorId(Long educadorId);
}

package br.com.brasilletrado.repository;

import br.com.brasilletrado.model.Aluno;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    long countByTurmaId(Long turmaId);
    List<Aluno> findByTurmaId(Long turmaId);
    List<Aluno> findAllByInstituicaoId(Long instituicaoId);
    Optional<Aluno> findByIdAndInstituicaoId(Long id, Long instituicaoId);
}

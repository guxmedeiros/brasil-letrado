package br.com.brasilletrado.repository;

import br.com.brasilletrado.model.Instituicao;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {
    Optional<Instituicao> findByEmail(String email);
    boolean existsByEmail(String email);
}

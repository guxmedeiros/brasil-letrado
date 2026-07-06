package br.com.brasilletrado.repository;

import br.com.brasilletrado.model.Educador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducadorRepository extends JpaRepository<Educador, Long> {
}

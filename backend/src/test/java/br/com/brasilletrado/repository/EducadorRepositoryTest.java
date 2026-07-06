package br.com.brasilletrado.repository;

import br.com.brasilletrado.model.Educador;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class EducadorRepositoryTest {

    @Autowired
    private EducadorRepository educadorRepository;

    @Test
    public void deveSalvarEducadorComSucesso() {
        Educador educador = Educador.builder()
                .nome("Paulo Freire")
                .email("paulo@freire.org")
                .build();

        Educador salvo = educadorRepository.save(educador);

        assertThat(salvo.getId()).isNotNull();
        assertThat(salvo.getNome()).isEqualTo("Paulo Freire");
    }
}

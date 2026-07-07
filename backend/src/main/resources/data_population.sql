-- Script de população do banco de dados Brasil Letrado
-- 10 Instituições, 30 Educadores, 20 Turmas e 100 Alunos

-- Desativar restrições de chave estrangeira temporariamente
SET FOREIGN_KEY_CHECKS = 0;

-- Limpar tabelas existentes (opcional, caso queira reiniciar)
TRUNCATE TABLE aluno;
TRUNCATE TABLE turma;
TRUNCATE TABLE educador;
TRUNCATE TABLE instituicao;

-- Reativar restrições de chave estrangeira temporariamente para inserir
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================
-- 1. Inserir Instituições (10)
-- =============================================
INSERT INTO instituicao (nome, email, senha, cnpj) VALUES
('ONG Sementes do Saber', 'contato@sementesdosaber.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '12.345.678/0001-90'),
('Instituto Alfabetizar é Viver', 'contato@alfabetizareviver.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '98.765.432/0001-10'),
('Associação Letras e Vida', 'contato@letrasdevida.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '11.223.344/0001-55'),
('Fundação Educação para Todos', 'contato@educacaoparatodos.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '55.444.333/0001-22'),
('ONG Caminhos da Leitura', 'contato@caminhosdaleitura.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '66.777.888/0001-33'),
('Instituto Saber e Crescer', 'contato@saberecrescer.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '99.000.111/0001-44'),
('Associação Luz do Saber', 'contato@luzdosaber.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '22.333.444/0001-66'),
('Fundação Nova Era', 'contato@novaera.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '33.444.555/0001-77'),
('ONG Esperança e Letras', 'contato@esperancaeletra.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '44.555.666/0001-88'),
('Instituto Vida e Alfabeto', 'contato@vidaealfabeto.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '77.888.999/0001-99');

-- =============================================
-- 2. Inserir Educadores (30 - 3 por instituição)
-- =============================================
INSERT INTO educador (nome, email, telefone, formacao, foto_url, instituicao_id) VALUES
-- Instituição 1
('Maria Silva', 'maria.silva@sementesdosaber.org', '(11) 98765-4321', 'Licenciatura em Letras', 'https://randomuser.me/api/portraits/women/1.jpg', 1),
('João Santos', 'joao.santos@sementesdosaber.org', '(11) 91234-5678', 'Pedagogia', 'https://randomuser.me/api/portraits/men/1.jpg', 1),
('Ana Costa', 'ana.costa@sementesdosaber.org', '(11) 99876-5432', 'Licenciatura em Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/women/2.jpg', 1),
-- Instituição 2
('Carlos Oliveira', 'carlos.oliveira@alfabetizareviver.org', '(21) 98765-1111', 'Pedagogia', 'https://randomuser.me/api/portraits/men/2.jpg', 2),
('Beatriz Lima', 'beatriz.lima@alfabetizareviver.org', '(21) 91234-2222', 'Licenciatura em Letras', 'https://randomuser.me/api/portraits/women/3.jpg', 2),
('Fernando Souza', 'fernando.souza@alfabetizareviver.org', '(21) 99876-3333', 'Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/men/3.jpg', 2),
-- Instituição 3
('Juliana Pereira', 'juliana.pereira@letrasdevida.org', '(31) 98765-4444', 'Pedagogia', 'https://randomuser.me/api/portraits/women/4.jpg', 3),
('Ricardo Almeida', 'ricardo.almeida@letrasdevida.org', '(31) 91234-5555', 'Licenciatura em História', 'https://randomuser.me/api/portraits/men/4.jpg', 3),
('Patrícia Fernandes', 'patricia.fernandes@letrasdevida.org', '(31) 99876-6666', 'Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/women/5.jpg', 3),
-- Instituição 4
('Marcos Ribeiro', 'marcos.ribeiro@educacaoparatodos.org', '(41) 98765-7777', 'Pedagogia', 'https://randomuser.me/api/portraits/men/5.jpg', 4),
('Camila Gonçalves', 'camila.goncalves@educacaoparatodos.org', '(41) 91234-8888', 'Licenciatura em Letras', 'https://randomuser.me/api/portraits/women/6.jpg', 4),
('Eduardo Martins', 'eduardo.martins@educacaoparatodos.org', '(41) 99876-9999', 'Educação Especial', 'https://randomuser.me/api/portraits/men/6.jpg', 4),
-- Instituição 5
('Isabela Rocha', 'isabela.rocha@caminhosdaleitura.org', '(51) 98765-0000', 'Pedagogia', 'https://randomuser.me/api/portraits/women/7.jpg', 5),
('Daniel Carvalho', 'daniel.carvalho@caminhosdaleitura.org', '(51) 91234-1112', 'Licenciatura em Matemática', 'https://randomuser.me/api/portraits/men/7.jpg', 5),
('Larissa Nunes', 'larissa.nunes@caminhosdaleitura.org', '(51) 99876-2223', 'Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/women/8.jpg', 5),
-- Instituição 6
('Gustavo Araújo', 'gustavo.araujo@saberecrescer.org', '(61) 98765-3334', 'Pedagogia', 'https://randomuser.me/api/portraits/men/8.jpg', 6),
('Amanda Farias', 'amanda.farias@saberecrescer.org', '(61) 91234-4445', 'Licenciatura em Ciências', 'https://randomuser.me/api/portraits/women/9.jpg', 6),
('Leonardo Cardoso', 'leonardo.cardoso@saberecrescer.org', '(61) 99876-5556', 'Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/men/9.jpg', 6),
-- Instituição 7
('Letícia Moreira', 'leticia.moreira@luzdosaber.org', '(71) 98765-6667', 'Pedagogia', 'https://randomuser.me/api/portraits/women/10.jpg', 7),
('Henrique Barbosa', 'henrique.barbosa@luzdosaber.org', '(71) 91234-7778', 'Licenciatura em Geografia', 'https://randomuser.me/api/portraits/men/10.jpg', 7),
('Renata Pires', 'renata.pires@luzdosaber.org', '(71) 99876-8889', 'Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/women/11.jpg', 7),
-- Instituição 8
('Felipe Azevedo', 'felipe.azevedo@novaera.org', '(81) 98765-9990', 'Pedagogia', 'https://randomuser.me/api/portraits/men/11.jpg', 8),
('Carolina Sousa', 'carolina.sousa@novaera.org', '(81) 91234-0001', 'Licenciatura em Letras', 'https://randomuser.me/api/portraits/women/12.jpg', 8),
('Alexandre Lopes', 'alexandre.lopes@novaera.org', '(81) 99876-1112', 'Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/men/12.jpg', 8),
-- Instituição 9
('Gabriela Mendes', 'gabriela.mendes@esperancaeletra.org', '(91) 98765-2223', 'Pedagogia', 'https://randomuser.me/api/portraits/women/13.jpg', 9),
('Diego Freitas', 'diego.freitas@esperancaeletra.org', '(91) 91234-3334', 'Licenciatura em Filosofia', 'https://randomuser.me/api/portraits/men/13.jpg', 9),
('Natália Correia', 'natalia.correia@esperancaeletra.org', '(91) 99876-4445', 'Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/women/14.jpg', 9),
-- Instituição 10
('André Gomes', 'andre.gomes@vidaealfabeto.org', '(12) 98765-5556', 'Pedagogia', 'https://randomuser.me/api/portraits/men/14.jpg', 10),
('Vanessa Teixeira', 'vanessa.teixeira@vidaealfabeto.org', '(12) 91234-6667', 'Licenciatura em Arte-Educação', 'https://randomuser.me/api/portraits/women/15.jpg', 10),
('Rodrigo Nascimento', 'rodrigo.nascimento@vidaealfabeto.org', '(12) 99876-7778', 'Educação de Jovens e Adultos', 'https://randomuser.me/api/portraits/men/15.jpg', 10);

-- =============================================
-- 3. Inserir Turmas (20 - 2 por instituição)
-- =============================================
INSERT INTO turma (nome, turno, dias_semana, capacidade_maxima, educador_id, instituicao_id) VALUES
-- Instituição 1
('Turma Alfa', 'MANHA', 'Segunda, Quarta, Sexta', 15, 1, 1),
('Turma Beta', 'NOITE', 'Terça, Quinta', 12, 2, 1),
-- Instituição 2
('Turma Gama', 'TARDE', 'Segunda, Terça, Quarta', 10, 4, 2),
('Turma Delta', 'NOITE', 'Quinta, Sexta', 14, 5, 2),
-- Instituição 3
('Turma Épsilon', 'MANHA', 'Terça, Quinta', 16, 7, 3),
('Turma Zeta', 'TARDE', 'Segunda, Quarta, Sexta', 11, 8, 3),
-- Instituição 4
('Turma Eta', 'NOITE', 'Segunda, Quinta', 13, 10, 4),
('Turma Teta', 'MANHA', 'Terça, Quarta, Sexta', 17, 11, 4),
-- Instituição 5
('Turma Iota', 'TARDE', 'Segunda, Sexta', 12, 13, 5),
('Turma Kappa', 'NOITE', 'Quarta, Quinta', 15, 14, 5),
-- Instituição 6
('Turma Lambda', 'MANHA', 'Terça, Quinta, Sexta', 14, 16, 6),
('Turma Mu', 'TARDE', 'Segunda, Quarta', 10, 17, 6),
-- Instituição 7
('Turma Nu', 'NOITE', 'Segunda, Terça, Sexta', 16, 19, 7),
('Turma Xi', 'MANHA', 'Quarta, Quinta', 13, 20, 7),
-- Instituição 8
('Turma Omicron', 'TARDE', 'Segunda, Quarta, Quinta', 15, 22, 8),
('Turma Pi', 'NOITE', 'Terça, Sexta', 11, 23, 8),
-- Instituição 9
('Turma Rho', 'MANHA', 'Segunda, Terça, Quinta', 14, 25, 9),
('Turma Sigma', 'TARDE', 'Quarta, Sexta', 12, 26, 9),
-- Instituição 10
('Turma Tau', 'NOITE', 'Segunda, Quarta', 16, 28, 10),
('Turma Upsilon', 'MANHA', 'Terça, Quinta, Sexta', 13, 29, 10);

-- =============================================
-- 4. Inserir Alunos (100 - 10 por instituição)
-- =============================================
INSERT INTO aluno (nome, data_nascimento, telefone, nivel_alfabetizacao, turma_id, instituicao_id) VALUES
-- Instituição 1
('José da Silva', '1965-03-15', '(11) 91111-1111', 'INICIANTE', 1, 1),
('Maria dos Santos', '1972-07-22', '(11) 92222-2222', 'INTERMEDIARIO', 1, 1),
('Antônio Costa', '1958-11-08', '(11) 93333-3333', 'AVANCADO', 2, 1),
('Francisco Oliveira', '1969-04-30', '(11) 94444-4444', 'INICIANTE', 1, 1),
('Ana Souza', '1975-09-12', '(11) 95555-5555', 'INTERMEDIARIO', 2, 1),
('Joana Pereira', '1962-01-25', '(11) 96666-6666', 'INICIANTE', 1, 1),
('Pedro Almeida', '1980-06-18', '(11) 97777-7777', 'AVANCADO', 2, 1),
('Carlos Fernandes', '1955-12-05', '(11) 98888-8888', 'INTERMEDIARIO', 1, 1),
('Paula Ribeiro', '1978-08-03', '(11) 99999-9999', 'INICIANTE', 2, 1),
('Lucas Gonçalves', '1967-10-20', '(11) 90000-0000', 'INTERMEDIARIO', 1, 1),
-- Instituição 2
('Mariana Carvalho', '1963-02-14', '(21) 91111-2222', 'INICIANTE', 3, 2),
('Rafael Nunes', '1971-05-09', '(21) 92222-3333', 'AVANCADO', 3, 2),
('Juliana Araújo', '1959-08-27', '(21) 93333-4444', 'INTERMEDIARIO', 4, 2),
('Fernando Farias', '1974-11-11', '(21) 94444-5555', 'INICIANTE', 3, 2),
('Amanda Cardoso', '1966-03-03', '(21) 95555-6666', 'INTERMEDIARIO', 4, 2),
('Diego Moreira', '1982-07-19', '(21) 96666-7777', 'INICIANTE', 3, 2),
('Isabela Barbosa', '1957-10-01', '(21) 97777-8888', 'AVANCADO', 4, 2),
('Gustavo Pires', '1970-01-10', '(21) 98888-9999', 'INTERMEDIARIO', 3, 2),
('Letícia Azevedo', '1964-04-23', '(21) 99999-0000', 'INICIANTE', 4, 2),
('Ricardo Sousa', '1977-09-15', '(21) 90000-1111', 'INTERMEDIARIO', 3, 2),
-- Instituição 3
('Camila Lopes', '1961-06-07', '(31) 91111-3333', 'AVANCADO', 5, 3),
('Eduardo Mendes', '1973-12-28', '(31) 92222-4444', 'INICIANTE', 5, 3),
('Larissa Freitas', '1956-02-18', '(31) 93333-5555', 'INTERMEDIARIO', 6, 3),
('Daniel Correia', '1968-07-04', '(31) 94444-6666', 'INICIANTE', 5, 3),
('Patrícia Gomes', '1979-11-22', '(31) 95555-7777', 'AVANCADO', 6, 3),
('Marcos Teixeira', '1960-05-13', '(31) 96666-8888', 'INTERMEDIARIO', 5, 3),
('Beatriz Nascimento', '1975-08-30', '(31) 97777-9999', 'INICIANTE', 6, 3),
('Carlos Lima', '1958-10-09', '(31) 98888-0000', 'INTERMEDIARIO', 5, 3),
('Ana Oliveira', '1981-03-26', '(31) 99999-1112', 'AVANCADO', 6, 3),
('João Santos', '1967-06-17', '(31) 90000-2223', 'INICIANTE', 5, 3),
-- Instituição 4
('Fernanda Costa', '1964-01-05', '(41) 91111-4444', 'INTERMEDIARIO', 7, 4),
('Roberto Silva', '1972-04-20', '(41) 92222-5555', 'INICIANTE', 7, 4),
('Aline Souza', '1959-09-14', '(41) 93333-6666', 'AVANCADO', 8, 4),
('Fábio Pereira', '1977-12-01', '(41) 94444-7777', 'INTERMEDIARIO', 7, 4),
('Renata Almeida', '1962-02-28', '(41) 95555-8888', 'INICIANTE', 8, 4),
('Leonardo Fernandes', '1970-07-11', '(41) 96666-9999', 'AVANCADO', 7, 4),
('Carla Ribeiro', '1957-10-25', '(41) 97777-0000', 'INTERMEDIARIO', 8, 4),
('André Gonçalves', '1979-05-08', '(41) 98888-1113', 'INICIANTE', 7, 4),
('Vanessa Carvalho', '1965-08-23', '(41) 99999-2224', 'INTERMEDIARIO', 8, 4),
('Rodrigo Nunes', '1973-11-16', '(41) 90000-3335', 'AVANCADO', 7, 4),
-- Instituição 5
('Juliana Araújo', '1961-03-03', '(51) 91111-5555', 'INICIANTE', 9, 5),
('Alexandre Farias', '1974-06-18', '(51) 92222-6666', 'INTERMEDIARIO', 9, 5),
('Natália Cardoso', '1956-09-02', '(51) 93333-7777', 'AVANCADO', 10, 5),
('Diego Moreira', '1969-12-17', '(51) 94444-8888', 'INICIANTE', 9, 5),
('Gabriela Barbosa', '1976-04-05', '(51) 95555-9999', 'INTERMEDIARIO', 10, 5),
('Henrique Pires', '1960-07-20', '(51) 96666-0000', 'INICIANTE', 9, 5),
('Renata Azevedo', '1980-10-03', '(51) 97777-1114', 'AVANCADO', 10, 5),
('Felipe Sousa', '1968-01-12', '(51) 98888-2225', 'INTERMEDIARIO', 9, 5),
('Carolina Lopes', '1975-04-27', '(51) 99999-3336', 'INICIANTE', 10, 5),
('André Mendes', '1959-08-10', '(51) 90000-4447', 'INTERMEDIARIO', 9, 5),
-- Instituição 6
('Vanessa Freitas', '1963-11-22', '(61) 91111-6666', 'AVANCADO', 11, 6),
('Rodrigo Correia', '1971-02-15', '(61) 92222-7777', 'INICIANTE', 11, 6),
('Letícia Gomes', '1958-05-30', '(61) 93333-8888', 'INTERMEDIARIO', 12, 6),
('Gustavo Teixeira', '1978-08-13', '(61) 94444-9999', 'INICIANTE', 11, 6),
('Isabela Nascimento', '1965-11-26', '(61) 95555-0000', 'AVANCADO', 12, 6),
('Diego Lima', '1973-02-09', '(61) 96666-1115', 'INTERMEDIARIO', 11, 6),
('Juliana Oliveira', '1962-05-24', '(61) 97777-2226', 'INICIANTE', 12, 6),
('Fernando Santos', '1979-08-07', '(61) 98888-3337', 'INTERMEDIARIO', 11, 6),
('Amanda Costa', '1957-11-20', '(61) 99999-4448', 'AVANCADO', 12, 6),
('Carlos Souza', '1970-03-04', '(61) 90000-5559', 'INICIANTE', 11, 6),
-- Instituição 7
('Ana Pereira', '1966-06-19', '(71) 91111-7777', 'INTERMEDIARIO', 13, 7),
('João Almeida', '1974-09-02', '(71) 92222-8888', 'INICIANTE', 13, 7),
('Maria Fernandes', '1959-12-17', '(71) 93333-9999', 'AVANCADO', 14, 7),
('Antônio Ribeiro', '1972-03-01', '(71) 94444-0000', 'INTERMEDIARIO', 13, 7),
('Francisco Gonçalves', '1964-06-14', '(71) 95555-1116', 'INICIANTE', 14, 7),
('Ana Carvalho', '1977-09-27', '(71) 96666-2227', 'AVANCADO', 13, 7),
('Joana Nunes', '1960-12-10', '(71) 97777-3338', 'INTERMEDIARIO', 14, 7),
('Pedro Araújo', '1975-03-25', '(71) 98888-4449', 'INICIANTE', 13, 7),
('Carlos Farias', '1958-06-08', '(71) 99999-5550', 'INTERMEDIARIO', 14, 7),
('Paula Cardoso', '1981-09-21', '(71) 90000-6661', 'AVANCADO', 13, 7),
-- Instituição 8
('Lucas Moreira', '1967-01-05', '(81) 91111-8888', 'INICIANTE', 15, 8),
('Mariana Barbosa', '1970-04-20', '(81) 92222-9999', 'INTERMEDIARIO', 15, 8),
('Rafael Pires', '1957-07-05', '(81) 93333-0000', 'AVANCADO', 16, 8),
('Juliana Azevedo', '1976-10-18', '(81) 94444-1117', 'INICIANTE', 15, 8),
('Fernando Sousa', '1963-01-31', '(81) 95555-2228', 'INTERMEDIARIO', 16, 8),
('Amanda Lopes', '1978-05-16', '(81) 96666-3339', 'INICIANTE', 15, 8),
('Diego Mendes', '1961-08-29', '(81) 97777-4440', 'AVANCADO', 16, 8),
('Isabela Freitas', '1974-12-12', '(81) 98888-5551', 'INTERMEDIARIO', 15, 8),
('Gustavo Correia', '1959-03-27', '(81) 99999-6662', 'INICIANTE', 16, 8),
('Letícia Gomes', '1972-07-10', '(81) 90000-7773', 'INTERMEDIARIO', 15, 8),
-- Instituição 9
('Ricardo Teixeira', '1965-10-23', '(91) 91111-9999', 'AVANCADO', 17, 9),
('Camila Nascimento', '1973-02-06', '(91) 92222-0000', 'INICIANTE', 17, 9),
('Eduardo Lima', '1960-05-21', '(91) 93333-1118', 'INTERMEDIARIO', 18, 9),
('Larissa Oliveira', '1979-08-04', '(91) 94444-2229', 'INICIANTE', 17, 9),
('Daniel Santos', '1966-11-17', '(91) 95555-3330', 'AVANCADO', 18, 9),
('Patrícia Costa', '1971-02-01', '(91) 96666-4441', 'INTERMEDIARIO', 17, 9),
('Marcos Souza', '1958-05-16', '(91) 97777-5552', 'INICIANTE', 18, 9),
('Beatriz Pereira', '1977-08-29', '(91) 98888-6663', 'INTERMEDIARIO', 17, 9),
('Carlos Almeida', '1964-12-12', '(91) 99999-7774', 'AVANCADO', 18, 9),
('Ana Fernandes', '1975-03-25', '(91) 90000-8885', 'INICIANTE', 17, 9),
-- Instituição 10
('João Ribeiro', '1962-06-08', '(12) 91111-0000', 'INTERMEDIARIO', 19, 10),
('Maria Gonçalves', '1970-09-21', '(12) 92222-1111', 'INICIANTE', 19, 10),
('Antônio Carvalho', '1957-12-04', '(12) 93333-2222', 'AVANCADO', 20, 10),
('Francisco Nunes', '1976-03-19', '(12) 94444-3333', 'INTERMEDIARIO', 19, 10),
('Ana Araújo', '1963-06-02', '(12) 95555-4444', 'INICIANTE', 20, 10),
('Joana Farias', '1978-09-15', '(12) 96666-5555', 'AVANCADO', 19, 10),
('Pedro Cardoso', '1961-12-28', '(12) 97777-6666', 'INTERMEDIARIO', 20, 10),
('Carlos Moreira', '1973-04-11', '(12) 98888-7777', 'INICIANTE', 19, 10),
('Paula Barbosa', '1968-07-26', '(12) 99999-8888', 'INTERMEDIARIO', 20, 10),
('Lucas Pires', '1980-10-09', '(12) 90000-9999', 'AVANCADO', 19, 10);

-- =============================================
-- Verificação dos dados inseridos
-- =============================================
SELECT 'Instituições:' AS Tabela, COUNT(*) AS Total FROM instituicao
UNION ALL
SELECT 'Educadores:', COUNT(*) FROM educador
UNION ALL
SELECT 'Turmas:', COUNT(*) FROM turma
UNION ALL
SELECT 'Alunos:', COUNT(*) FROM aluno;
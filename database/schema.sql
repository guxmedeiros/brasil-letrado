CREATE DATABASE IF NOT EXISTS brasil_letrado;

USE brasil_letrado;

-- Tabela Instituicao
CREATE TABLE IF NOT EXISTS instituicao (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  cnpj VARCHAR(50)
);

-- Tabela Educador
CREATE TABLE IF NOT EXISTS educador (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(255),
  formacao VARCHAR(255),
  foto_url VARCHAR(500),
  instituicao_id BIGINT,
  CONSTRAINT fk_educador_instituicao FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
);

-- Tabela Turma
CREATE TABLE IF NOT EXISTS turma (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  turno VARCHAR(50),
  dias_semana VARCHAR(255),
  capacidade_maxima INT,
  educador_id BIGINT,
  instituicao_id BIGINT,
  CONSTRAINT fk_turma_educador FOREIGN KEY (educador_id) REFERENCES educador(id),
  CONSTRAINT fk_turma_instituicao FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
);

-- Tabela Aluno
CREATE TABLE IF NOT EXISTS aluno (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  data_nascimento DATE,
  telefone VARCHAR(255),
  nivel_alfabetizacao VARCHAR(50),
  turma_id BIGINT,
  instituicao_id BIGINT,
  CONSTRAINT fk_aluno_turma FOREIGN KEY (turma_id) REFERENCES turma(id),
  CONSTRAINT fk_aluno_instituicao FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
);

-- Inserir Instituição
INSERT INTO instituicao (id, nome, email, senha, cnpj) VALUES 
(1, 'ONG Sementes do Saber', 'contato@sementesdosaber.org', '$2a$10$N9qo8uLOickvxPsT5E41TOGjO6234dE5o6V5.4g27sE7tW9l0L7qG', '12.345.678/0001-90');

-- Inserir 5 Educadores
INSERT INTO educador (id, nome, email, telefone, formacao, foto_url, instituicao_id) VALUES 
(1, 'Maria Silva', 'maria.silva@sementesdosaber', '(11) 90000-1000', 'Licenciatura em Letras', 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSilva', 1),
(2, 'João Santos', 'joao.santos@sementesdosaber', '(21) 90137-2351', 'Pedagogia', 'https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoSantos', 1),
(3, 'Ana Costa', 'ana.costa@sementesdosaber', '(31) 90274-3702', 'Licenciatura em Educação de Jovens e Adultos', 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaCosta', 1),
(4, 'Carlos Oliveira', 'carlos.oliveira@sementesdosaber', '(41) 90411-5053', 'Pedagogia', 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosOliveira', 1),
(5, 'Beatriz Lima', 'beatriz.lima@sementesdosaber', '(51) 90548-6404', 'Licenciatura em Letras', 'https://api.dicebear.com/7.x/avataaars/svg?seed=BeatrizLima', 1);

-- Inserir 4 Turmas
INSERT INTO turma (id, nome, turno, dias_semana, capacidade_maxima, educador_id, instituicao_id) VALUES 
(1, 'Turma Alfa', 'MANHA', 'SEGUNDA,QUARTA,SEXTA', 10, 1, 1),
(2, 'Turma Beta', 'NOITE', 'TERCA,QUINTA', 10, 2, 1),
(3, 'Turma Gama', 'TARDE', 'SEGUNDA,TERCA,QUARTA', 10, 3, 1),
(4, 'Turma Delta', 'MANHA', 'QUARTA,QUINTA,SABADO', 10, 4, 1);

-- Inserir 30 Alunos
INSERT INTO aluno (id, nome, data_nascimento, telefone, nivel_alfabetizacao, turma_id, instituicao_id) VALUES 
(1, 'José da Silva', '1965-03-15', '(11) 90411-3753', 'INICIANTE', 1, 1),
(2, 'Maria dos Santos', '1972-07-22', '(21) 90548-5104', 'INTERMEDIARIO', 1, 1),
(3, 'Antônio Costa', '1958-11-08', '(31) 90685-6455', 'AVANCADO', 1, 1),
(4, 'Francisco Oliveira', '1969-04-30', '(41) 90822-7806', 'INICIANTE', 1, 1),
(5, 'Ana Souza', '1975-09-12', '(51) 90959-9157', 'INTERMEDIARIO', 1, 1),
(6, 'Joana Pereira', '1962-01-25', '(61) 91096-0508', 'INICIANTE', 1, 1),
(7, 'Pedro Almeida', '1980-06-18', '(71) 91233-1859', 'AVANCADO', 1, 1),
(8, 'Maria dos Santos', '1972-07-22', '(81) 91370-3210', 'INTERMEDIARIO', 1, 1),
(9, 'Paula Ribeiro', '1978-08-03', '(85) 91507-4561', 'INICIANTE', 1, 1),
(10, 'Lucas Gonçalves', '1967-10-20', '(47) 91644-5912', 'INTERMEDIARIO', 2, 1),
(11, 'Mariana Carvalho', '1963-02-14', '(11) 91781-7263', 'INICIANTE', 2, 1),
(12, 'Rafael Nunes', '1971-05-09', '(21) 91918-8614', 'AVANCADO', 2, 1),
(13, 'Juliana Araújo', '1959-08-27', '(31) 92055-9965', 'INTERMEDIARIO', 2, 1),
(14, 'Fernando Farias', '1974-11-11', '(41) 92192-1316', 'INICIANTE', 2, 1),
(15, 'Amanda Cardoso', '1966-03-03', '(51) 92329-2667', 'INTERMEDIARIO', 2, 1),
(16, 'Diego Moreira', '1982-07-19', '(61) 92466-4018', 'INICIANTE', 2, 1),
(17, 'Isabela Barbosa', '1957-10-01', '(71) 92603-5369', 'AVANCADO', 2, 1),
(18, 'Gustavo Pires', '1970-01-10', '(81) 92740-6720', 'INTERMEDIARIO', 2, 1),
(19, 'Letícia Azevedo', '1964-04-23', '(85) 92877-8071', 'INICIANTE', 3, 1),
(20, 'Ricardo Sousa', '1977-09-15', '(47) 93014-9422', 'INTERMEDIARIO', 3, 1),
(21, 'Camila Lopes', '1961-06-07', '(11) 93151-0773', 'AVANCADO', 3, 1),
(22, 'Eduardo Mendes', '1973-12-28', '(21) 93288-2124', 'INICIANTE', 3, 1),
(23, 'Larissa Freitas', '1956-02-18', '(31) 93425-3475', 'INTERMEDIARIO', 3, 1),
(24, 'Daniel Correia', '1968-07-04', '(41) 93562-4826', 'INICIANTE', 3, 1),
(25, 'Patrícia Gomes', '1979-11-22', '(51) 93699-6177', 'AVANCADO', 3, 1),
(26, 'Leonardo Rocha', '1965-05-30', '(61) 93836-7528', 'INTERMEDIARIO', 4, 1),
(27, 'Catarina Martins', '1976-08-14', '(71) 93973-8879', 'INICIANTE', 4, 1),
(28, 'Hugo Teixeira', '1960-02-09', '(81) 94111-0230', 'AVANCADO', 4, 1),
(29, 'Sofia Andrade', '1974-10-25', '(85) 94248-1581', 'INTERMEDIARIO', 4, 1),
(30, 'Mateus Cavalcanti', '1967-04-17', '(47) 94385-2932', 'INICIANTE', 4, 1);

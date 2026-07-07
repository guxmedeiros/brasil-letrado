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

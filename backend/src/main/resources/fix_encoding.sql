-- Script para corrigir codificação de caracteres no banco de dados
-- Garante que o banco e todas as tabelas usem UTF-8

-- Alterar o banco de dados para UTF-8
ALTER DATABASE brasil_letrado 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Alterar todas as tabelas para UTF-8
ALTER TABLE instituicao CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE educador CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE turma CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE aluno CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Verificar a codificação atual
SHOW VARIABLES LIKE 'character_set%';
SHOW VARIABLES LIKE 'collation%';

-- Verificar a codificação das tabelas
SELECT TABLE_NAME, TABLE_COLLATION 
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'brasil_letrado';

-- Verificar os dados na tabela instituicao
SELECT id, nome, email FROM instituicao;
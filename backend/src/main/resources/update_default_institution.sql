-- Atualizar a senha da primeira instituição para "123456" (criptografada com BCrypt)
-- Hash BCrypt para "123456": $2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH

-- UPDATE instituicao 
-- SET senha = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH' 
-- WHERE id = 1;

-- Verificar a instituição padrão
SELECT id, nome, email, cnpj FROM instituicao WHERE id = 1;

-- Contar quantos dados pertencem a essa instituição
SELECT 
    'Instituição' AS Tipo, nome AS Nome
FROM instituicao WHERE id = 1
UNION ALL
SELECT 
    'Educadores', COUNT(*)
FROM educador WHERE instituicao_id = 1
UNION ALL
SELECT 
    'Turmas', COUNT(*)
FROM turma WHERE instituicao_id = 1
UNION ALL
SELECT 
    'Alunos', COUNT(*)
FROM aluno WHERE instituicao_id = 1;
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
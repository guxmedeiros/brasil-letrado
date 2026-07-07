-- Script opcional: Atribuir TODOS os dados existentes à instituição padrão (id=1)
-- CUIDADO: Isso fará com que a instituição padrão veja todos os dados do banco

-- Desativar restrições temporariamente
SET FOREIGN_KEY_CHECKS = 0;

-- Atualizar todos os educadores para a instituição padrão
UPDATE educador SET instituicao_id = 1;

-- Atualizar todas as turmas para a instituição padrão e manter os educadores
UPDATE turma SET instituicao_id = 1;

-- Atualizar todos os alunos para a instituição padrão e manter as turmas
UPDATE aluno SET instituicao_id = 1;

-- Reativar restrições
SET FOREIGN_KEY_CHECKS = 1;

-- Verificar o resultado final
SELECT 
    'Instituição Padrão' AS Tipo, nome AS Nome
FROM instituicao WHERE id = 1
UNION ALL
SELECT 
    'Total Educadores', COUNT(*)
FROM educador 
UNION ALL
SELECT 
    'Total Turmas', COUNT(*)
FROM turma
UNION ALL
SELECT 
    'Total Alunos', COUNT(*)
FROM aluno;
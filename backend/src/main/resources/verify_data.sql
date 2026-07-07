-- Verify the database contents
USE brasil_letrado;

SELECT 'Instituicoes' AS Tabela, COUNT(*) AS Total FROM instituicao
UNION ALL
SELECT 'Educadores', COUNT(*) FROM educador
UNION ALL
SELECT 'Turmas', COUNT(*) FROM turma
UNION ALL
SELECT 'Alunos', COUNT(*) FROM aluno;

-- Show the instituicao padrao
SELECT id, nome, email FROM instituicao WHERE email = 'contato@sementesdosaber.org';

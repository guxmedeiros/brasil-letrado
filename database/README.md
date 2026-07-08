# Banco de Dados - Brasil Letrado

## Estrutura

Banco de dados relacional com as seguintes tabelas:

- `instituicao`: Dados da instituição de ensino
- `educador`: Educadores associados à instituição
- `turma`: Turmas de alfabetização
- `aluno`: Alunos matriculados

## Schema

Arquivo de schema completo: [schema.sql](./schema.sql)

## Entidades

### Instituição
- `id`: Chave primária (auto-incremento)
- `nome`: Nome da instituição
- `email`: E-mail de acesso único
- `senha`: Senha (criptografada)
- `cnpj`: CNPJ da instituição

### Educador
- `id`: Chave primária (auto-incremento)
- `nome`: Nome completo do educador
- `email`: E-mail de contato
- `telefone`: Telefone de contato
- `formacao`: Formação acadêmica/profissional
- `foto_url`: URL para foto do educador
- `instituicao_id`: Relacionamento com a instituição

### Turma
- `id`: Chave primária (auto-incremento)
- `nome`: Nome da turma
- `turno`: Turno (MANHA/TARDE/NOITE)
- `dias_semana`: Dias da semana (valores separados por vírgula: SEGUNDA,TERCA,QUARTA,QUINTA,SEXTA,SABADO,DOMINGO)
- `capacidade_maxima`: Capacidade máxima de alunos
- `educador_id`: Relacionamento com o educador
- `instituicao_id`: Relacionamento com a instituição

### Aluno
- `id`: Chave primária (auto-incremento)
- `nome`: Nome completo do aluno
- `data_nascimento`: Data de nascimento
- `telefone`: Telefone de contato
- `nivel_alfabetizacao`: Nível de alfabetização (INICIAL, INTERMEDIARIO, AVANCADO)
- `turma_id`: Relacionamento com a turma
- `instituicao_id`: Relacionamento com a instituição

## Observações

- O projeto usa Spring Boot JPA/Hibernate com `spring.jpa.hibernate.ddl-auto=update` para gerenciar a estrutura do banco automaticamente.
- O arquivo `schema.sql` serve como referência da estrutura final do banco.

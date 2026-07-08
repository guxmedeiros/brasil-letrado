# ☕ Brasil Letrado — Back-End API

Esta é a documentação da API REST do Brasil Letrado, com instruções de instalação, bibliotecas utilizadas, estrutura do projeto e endpoints disponíveis.

---

## 📚 Bibliotecas Utilizadas

### Frameworks e Principais
- **Spring Boot 3.4.1**: Framework para criação de aplicativos Java standalone, de produção-prontos.
- **Spring Web**: Para criação de endpoints REST.
- **Spring Data JPA**: Para acesso a dados e mapeamento objeto-relacional (ORM).
- **Spring Security**: Para segurança e autenticação/autorização.
- **Spring Validation**: Para validação de dados de entrada.

### Banco de Dados
- **MySQL Connector JDBC**: Driver para conexão com banco de dados MySQL.
- **H2 Database**: Banco de dados em memória (usado em ambiente de teste).

### Autenticação
- **Auth0 Java JWT**: Biblioteca para geração e validação de tokens JWT (JSON Web Token).

### Documentação
- **SpringDoc OpenAPI Starter WebMVC UI**: Para geração automática da documentação da API com Swagger UI.

### Ferramentas
- **Maven**: Gerenciador de dependências e build do projeto.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Java 21 (ou superior) instalado
- Maven instalado (ou use o wrapper Maven incluído no projeto)
- MySQL server rodando localmente (ou use o H2 para testes)

### Passos para Executar
1. Abra o terminal na pasta `backend/`
2. Crie um arquivo `application-local.properties` em `src/main/resources/` com as configurações do seu banco MySQL (use `application.properties` como modelo):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/brasil_letrado
   spring.datasource.username=seu-usuario
   spring.datasource.password=sua-senha
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Instale as dependências e execute a aplicação:
   ```bash
   # No Windows
   .\mvnw.cmd spring-boot:run

   # No Linux/macOS
   ./mvnw spring-boot:run
   ```
4. A API estará disponível em `http://localhost:8080`
5. A documentação Swagger UI pode ser acessada em `http://localhost:8080/swagger-ui.html`

### Credenciais de Teste Padrão
- Email: `contato@sementesdosaber.org`
- Senha: `123456`

---

## 🏗️ Estrutura do Projeto

A API segue a arquitetura em camadas padrão do Spring Boot:

### 1. Model (`src/main/java/br/com/brasilletrado/model/`)
Contém as entidades que representam as tabelas do banco de dados:
- `Instituicao`: Dados da instituição de ensino
- `Educador`: Educadores associados à instituição
- `Turma`: Turmas de alfabetização
- `Aluno`: Alunos matriculados
- `Turno`: Enum para turno da turma (MANHA, TARDE, NOITE)
- `DiaSemana`: Enum para dias da semana (SEGUNDA a DOMINGO)
- `NivelAlfabetizacao`: Enum para nível do aluno (INICIANTE, INTERMEDIARIO, AVANCADO)
- `Turma.DiaSemanaListConverter`: Conversor para armazenar lista de dias como string no banco

### 2. DTO (`src/main/java/br/com/brasilletrado/dto/`)
Objetos de Transferência de Dados (DTOs) que definem o formato de entrada e saída da API.

### 3. Repository (`src/main/java/br/com/brasilletrado/repository/`)
Interfaces que herdam de `JpaRepository` para acesso a dados do banco.

### 4. Controller (`src/main/java/br/com/brasilletrado/controller/`)
Endpoints REST da aplicação:
- `AuthController`: Autenticação e cadastro de instituições
- `EducadorController`: CRUD de educadores
- `TurmaController`: CRUD de turmas
- `AlunoController`: CRUD de alunos

### 5. Security (`src/main/java/br/com/brasilletrado/security/`)
- `SecurityConfig`: Configuração de segurança da API (rotas públicas, autenticação JWT)
- `JwtTokenFilter`: Filtro para validar tokens JWT em cada requisição
- `JwtService`: Serviço para gerar e validar tokens JWT

### 6. Config (`src/main/java/br/com/brasilletrado/config/`)
- `CorsConfig`: Configuração de CORS (Cross-Origin Resource Sharing) para permitir requisições do frontend
- `DataLoader`: Carrega dados iniciais (seed) no banco de dados ao iniciar a aplicação

---

## 🔐 Autenticação (`/api/auth`)

O sistema utiliza autenticação JWT (JSON Web Token) e multi-tenancy por Instituição (ONG/Projeto).

#### 1. Login de Instituição
* **Método:** `POST`
* **Rota:** `/api/auth/login`
* **Body enviado:**
  ```json
  {
    "email": "contato@sementesdosaber.org",
    "senha": "123456"
  }
  ```
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "instituicao": {
      "id": 1,
      "nome": "ONG Sementes do Saber",
      "email": "contato@sementesdosaber.org"
    }
  }
  ```

#### 2. Cadastro de Nova Instituição
* **Método:** `POST`
* **Rota:** `/api/auth/register`
* **Body enviado:**
  ```json
  {
    "nome": "Instituto Alfabetizar é Viver",
    "cnpj": "00.000.000/0001-00",
    "email": "contato@alfabetizareviver.org",
    "senha": "123456"
  }
  ```
* **Resposta Esperada (JSON - `201 Created`):**
  ```json
  {
    "id": 2,
    "nome": "Instituto Alfabetizar é Viver",
    "email": "contato@alfabetizareviver.org"
  }
  ```

---

## 📌 Endpoints da API e Exemplos de Resposta

### 🧑‍🏫 Educadores (`/api/educadores`)

#### 1. Listar todos os educadores
* **Método:** `GET`
* **Rota:** `/api/educadores`
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  [
    {
      "id": 1,
      "nome": "Paulo Freire",
      "email": "paulo@freire.org",
      "telefone": "(81) 99888-7766",
      "formacao": "Doutorado em Educação"
    },
    {
      "id": 2,
      "nome": "Maria Montessori",
      "email": "maria@montessori.org",
      "telefone": "(11) 98765-4321",
      "formacao": "Pedagogia e Medicina"
    }
  ]
  ```

#### 2. Buscar educador por ID
* **Método:** `GET`
* **Rota:** `/api/educadores/{id}` (ex: `/api/educadores/1`)
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  {
    "id": 1,
    "nome": "Paulo Freire",
    "email": "paulo@freire.org",
    "telefone": "(81) 99888-7766",
    "formacao": "Doutorado em Educação"
  }
  ```

#### 3. Cadastrar educador
* **Método:** `POST`
* **Rota:** `/api/educadores`
* **Body enviado:**
  ```json
  {
    "nome": "Jean Piaget",
    "email": "jean@piaget.org",
    "telefone": "(21) 97654-3210",
    "formacao": "Psicologia Cognitiva"
  }
  ```
* **Resposta Esperada (JSON - `201 Created`):**
  ```json
  {
    "id": 3,
    "nome": "Jean Piaget",
    "email": "jean@piaget.org",
    "telefone": "(21) 97654-3210",
    "formacao": "Psicologia Cognitiva"
  }
  ```

#### 4. Atualizar educador
* **Método:** `PUT`
* **Rota:** `/api/educadores/{id}` (ex: `/api/educadores/3`)
* **Body enviado:**
  ```json
  {
    "nome": "Jean Piaget Modificado",
    "email": "jean.new@piaget.org",
    "telefone": "(21) 97654-0000",
    "formacao": "Psicologia do Desenvolvimento"
  }
  ```
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  {
    "id": 3,
    "nome": "Jean Piaget Modificado",
    "email": "jean.new@piaget.org",
    "telefone": "(21) 97654-0000",
    "formacao": "Psicologia do Desenvolvimento"
  }
  ```

#### 5. Excluir educador
* **Método:** `DELETE`
* **Rota:** `/api/educadores/{id}` (ex: `/api/educadores/3`)
* **Resposta Esperada (`204 No Content`):** *(Sem conteúdo de resposta)*

---

### 🏫 Turmas (`/api/turmas`)

#### 1. Listar todas as turmas
* **Método:** `GET`
* **Rota:** `/api/turmas`
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  [
    {
      "id": 1,
      "nome": "Alfabetização Inicial I",
      "turno": "MANHA",
      "diasSemana": ["SEGUNDA", "QUARTA"],
      "capacidadeMaxima": 15,
      "educadorId": 1,
      "educadorNome": "Paulo Freire",
      "quantidadeAlunos": 3
    },
    {
      "id": 2,
      "nome": "Alfabetização Intermediária II",
      "turno": "TARDE",
      "diasSemana": ["TERCA", "QUINTA"],
      "capacidadeMaxima": 20,
      "educadorId": 2,
      "educadorNome": "Maria Montessori",
      "quantidadeAlunos": 3
    }
  ]
  ```

#### 2. Buscar turma por ID
* **Método:** `GET`
* **Rota:** `/api/turmas/{id}` (ex: `/api/turmas/1`)
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  {
    "id": 1,
    "nome": "Alfabetização Inicial I",
    "turno": "MANHA",
    "diasSemana": ["SEGUNDA", "QUARTA"],
    "capacidadeMaxima": 15,
    "educadorId": 1,
    "educadorNome": "Paulo Freire",
    "quantidadeAlunos": 3
  }
  ```

#### 3. Cadastrar turma
* **Método:** `POST`
* **Rota:** `/api/turmas`
* **Body enviado:**
  ```json
  {
    "nome": "Oficina de Leitura",
    "turno": "NOITE",
    "diasSemana": ["TERCA", "QUINTA"],
    "capacidadeMaxima": 12,
    "educadorId": 1
  }
  ```
* **Resposta Esperada (JSON - `201 Created`):**
  ```json
  {
    "id": 4,
    "nome": "Oficina de Leitura",
    "turno": "NOITE",
    "diasSemana": ["TERCA", "QUINTA"],
    "capacidadeMaxima": 12,
    "educadorId": 1,
    "educadorNome": "Paulo Freire",
    "quantidadeAlunos": 0
  }
  ```

#### 4. Atualizar turma
* **Método:** `PUT`
* **Rota:** `/api/turmas/{id}` (ex: `/api/turmas/4`)
* **Body enviado:**
  ```json
  {
    "nome": "Oficina de Leitura Avançada",
    "turno": "NOITE",
    "diasSemana": ["QUARTA", "SEXTA"],
    "capacidadeMaxima": 15,
    "educadorId": 2
  }
  ```
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  {
    "id": 4,
    "nome": "Oficina de Leitura Avançada",
    "turno": "NOITE",
    "diasSemana": ["QUARTA", "SEXTA"],
    "capacidadeMaxima": 15,
    "educadorId": 2,
    "educadorNome": "Maria Montessori",
    "quantidadeAlunos": 0
  }
  ```

#### 5. Excluir turma
* **Método:** `DELETE`
* **Rota:** `/api/turmas/{id}` (ex: `/api/turmas/4`)
* **Resposta Esperada (`204 No Content`):** *(Sem conteúdo)*

---

### 🧑‍🎓 Alunos (`/api/alunos`)

#### 1. Listar todos os alunos
* **Método:** `GET`
* **Rota:** `/api/alunos`
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  [
    {
      "id": 1,
      "nome": "João da Silva",
      "dataNascimento": "1965-04-12",
      "telefone": "(11) 91111-2222",
      "nivelAlfabetizacao": "INICIANTE",
      "turmaId": 1,
      "turmaNome": "Alfabetização Inicial I"
    },
    {
      "id": 2,
      "nome": "Maria de Souza",
      "dataNascimento": "1958-09-20",
      "telefone": "(11) 92222-3333",
      "nivelAlfabetizacao": "INICIANTE",
      "turmaId": 1,
      "turmaNome": "Alfabetização Inicial I"
    }
  ]
  ```

#### 2. Buscar aluno por ID
* **Método:** `GET`
* **Rota:** `/api/alunos/{id}` (ex: `/api/alunos/1`)
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  {
    "id": 1,
    "nome": "João da Silva",
    "dataNascimento": "1965-04-12",
    "telefone": "(11) 91111-2222",
    "nivelAlfabetizacao": "INICIANTE",
    "turmaId": 1,
    "turmaNome": "Alfabetização Inicial I"
  }
  ```

#### 3. Cadastrar aluno
* **Método:** `POST`
* **Rota:** `/api/alunos`
* **Body enviado:**
  ```json
  {
    "nome": "Antônio Santos",
    "dataNascimento": "1972-12-05",
    "telefone": "(11) 93333-4444",
    "nivelAlfabetizacao": "INTERMEDIARIO",
    "turmaId": 2
  }
  ```
* **Resposta Esperada (JSON - `201 Created`):**
  ```json
  {
    "id": 3,
    "nome": "Antônio Santos",
    "dataNascimento": "1972-12-05",
    "telefone": "(11) 93333-4444",
    "nivelAlfabetizacao": "INTERMEDIARIO",
    "turmaId": 2,
    "turmaNome": "Alfabetização Intermediária II"
  }
  ```

#### 4. Atualizar aluno
* **Método:** `PUT`
* **Rota:** `/api/alunos/{id}` (ex: `/api/alunos/3`)
* **Body enviado:**
  ```json
  {
    "nome": "Antônio Santos Modificado",
    "dataNascimento": "1972-12-05",
    "telefone": "(11) 93333-1111",
    "nivelAlfabetizacao": "AVANCADO",
    "turmaId": 2
  }
  ```
* **Resposta Esperada (JSON - `200 OK`):**
  ```json
  {
    "id": 3,
    "nome": "Antônio Santos Modificado",
    "dataNascimento": "1972-12-05",
    "telefone": "(11) 93333-1111",
    "nivelAlfabetizacao": "AVANCADO",
    "turmaId": 2,
    "turmaNome": "Alfabetização Intermediária II"
  }
  ```

#### 5. Excluir aluno
* **Método:** `DELETE`
* **Rota:** `/api/alunos/{id}` (ex: `/api/alunos/3`)
* **Resposta Esperada (`204 No Content`):** *(Sem conteúdo)*

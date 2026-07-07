# ☕ Brasil Letrado — Back-End API

Esta é a documentação das rotas, métodos e payloads da API REST do **Brasil Letrado**.

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
* **Resposta Esperada (`24 No Content`):** *(Sem conteúdo de resposta)*

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
      "diasSemana": "Segunda, Quarta",
      "capacidadeMaxima": 15,
      "educadorId": 1,
      "educadorNome": "Paulo Freire",
      "quantidadeAlunos": 3
    },
    {
      "id": 2,
      "nome": "Alfabetização Intermediária II",
      "turno": "TARDE",
      "diasSemana": "Terça, Quinta",
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
    "diasSemana": "Segunda, Quarta",
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
    "diasSemana": "Terça, Quinta",
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
    "diasSemana": "Terça, Quinta",
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
    "diasSemana": "Quarta, Sexta",
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
    "diasSemana": "Quarta, Sexta",
    "capacidadeMaxima": 15,
    "educadorId": 2,
    "educadorNome": "Maria Montessori",
    "quantidadeAlunos": 0
  }
  ```

#### 5. Excluir turma
* **Método:** `DELETE`
* **Rota:** `/api/turmas/{id}` (ex: `/api/turmas/4`)
* **Resposta Esperada (`24 No Content`):** *(Sem conteúdo)*

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

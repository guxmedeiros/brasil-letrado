# ⚛️ Brasil Letrado — Front-End Web App

Esta é a documentação do mapeamento de telas da aplicação cliente (SPA React) e os respectivos endpoints consumidos por cada uma delas.

---

## 🖥 Páginas do Sistema e Consumo de Endpoints

### 1. Tela de Educadores (`/educadores`)
Esta tela lista os educadores cadastrados no sistema em uma tabela interativa (`DataTable`) e permite a inclusão, alteração e exclusão através de um modal (`Dialog`).

* **Endpoints Consumidos:**
  * `GET /api/educadores` — Consumido no carregamento da tela para renderizar os dados dos educadores na tabela.
  * `POST /api/educadores` — Consumido ao submeter o formulário de cadastro de um novo educador.
  * `PUT /api/educadores/{id}` — Consumido ao salvar as alterações em um educador existente.
  * `DELETE /api/educadores/{id}` — Consumido ao confirmar a remoção de um educador através do diálogo de confirmação.

---

### 2. Tela de Turmas (`/turmas`)
Esta tela lista as turmas de alfabetização, exibe o turno, dias da semana, o educador que leciona nela e a barra de ocupação calculada em tempo real. Permite criação, edição e exclusão de turmas.

* **Endpoints Consumidos:**
  * `GET /api/turmas` — Consumido no carregamento da tela para listar as turmas e renderizar as informações e cálculos de lotação de alunos.
  * `GET /api/educadores` — Consumido na abertura do modal de cadastro/edição para preencher o seletor Dropdown de educadores.
  * `POST /api/turmas` — Consumido ao submeter o formulário de criação de uma nova turma.
  * `PUT /api/turmas/{id}` — Consumido ao salvar as alterações de dados de uma turma existente.
  * `DELETE /api/turmas/{id}` — Consumido ao excluir uma turma sem alunos vinculados.

---

### 3. Tela de Alunos (`/alunos`)
Esta tela permite gerenciar as matrículas dos alunos adultos, exibindo seus dados pessoais, telefone, nível de alfabetização atual e qual turma pertencem. Permite cadastrar, editar dados/vínculo de turmas e excluir registros.

* **Endpoints Consumidos:**
  * `GET /api/alunos` — Consumido no carregamento da tela para listar todos os alunos cadastrados e exibi-los na tabela.
  * `GET /api/turmas` — Consumido na abertura do modal para carregar o seletor Dropdown de turmas disponíveis para atribuição do aluno.
  * `POST /api/alunos` — Consumido ao submeter o formulário de cadastro de um novo aluno.
  * `PUT /api/alunos/{id}` — Consumido ao salvar as edições cadastrais do aluno.
  * `DELETE /api/alunos/{id}` — Consumido ao confirmar a remoção de um aluno cadastrado.

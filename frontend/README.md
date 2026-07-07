# ⚛️ Brasil Letrado — Front-End Web App

Esta é a documentação do mapeamento de telas da aplicação cliente (SPA React) e os respectivos endpoints consumidos por cada uma delas.

---

## 🖥 Páginas do Sistema e Consumo de Endpoints

### 0. Landing Page (Página Inicial - `/`)

Esta é a página inicial do sistema, acessível por todos (autenticados ou não). Apresenta o projeto, sua missão ligada à ODS 4, seções "Sobre", "Como Funciona", "Funcionalidades" e "Estatísticas" (simuladas). Possui botões para navegar para cadastro/login (se não autenticado) ou scroll para seções internas.

* **Funcionalidades:**
  * Botão "Começar Agora" (leva para `/cadastro` — oculto para autenticados)
  * Botão "Como Funciona" (scroll suave para a respectiva seção)
  * CTA final "Pronto para começar?" (oculto para autenticados)

---

### 1. Tela de Login (`/login`)

Página de autenticação para instituições já cadastradas.

* **Endpoints Consumidos:**
  * `POST /api/auth/login` — Para autenticar a instituição e obter o token JWT.

---

### 2. Tela de Cadastro (`/cadastro`)

Formulário para criação de uma nova conta de instituição (ONG/Projeto Social).

* **Endpoints Consumidos:**
  * `POST /api/auth/register` — Para cadastrar uma nova instituição no sistema.
  * `POST /api/auth/login` — Para autenticar automaticamente após cadastro bem-sucedido.

---

### 3. Dashboard (Painel Principal - `/dashboard`)

Tela inicial após login, apresentando métricas e estatísticas da instituição (total de alunos, educadores, turmas, capacidade, distribuição por nível de alfabetização e uma citação inspiradora).

* **Endpoints Consumidos:**
  * `GET /api/alunos` — Para contar alunos e distribuição por nível.
  * `GET /api/educadores` — Para contar educadores.
  * `GET /api/turmas` — Para contar turmas e capacidade total.

---

### 4. Tela de Educadores (`/educadores`)
Esta tela lista os educadores cadastrados no sistema em cards interativos (com foto/avatar, dados e botões de ação) e permite a inclusão, alteração e exclusão através de um modal (`Dialog`). Possui barra de busca por nome, e-mail ou formação.

* **Endpoints Consumidos:**
  * `GET /api/educadores` — Consumido no carregamento da tela para renderizar os dados dos educadores.
  * `POST /api/educadores` — Consumido ao submeter o formulário de cadastro de um novo educador.
  * `PUT /api/educadores/{id}` — Consumido ao salvar as alterações em um educador existente.
  * `DELETE /api/educadores/{id}` — Consumido ao confirmar a remoção de um educador através do diálogo de confirmação.

---

### 5. Tela de Turmas (`/turmas`)
Esta tela lista as turmas de alfabetização, exibe o turno, dias da semana, o educador que leciona nela e a barra de ocupação calculada em tempo real. Permite criação, edição e exclusão de turmas.

* **Endpoints Consumidos:**
  * `GET /api/turmas` — Consumido no carregamento da tela para listar as turmas e renderizar as informações e cálculos de lotação de alunos.
  * `GET /api/educadores` — Consumido na abertura do modal de cadastro/edição para preencher o seletor Dropdown de educadores.
  * `POST /api/turmas` — Consumido ao submeter o formulário de criação de uma nova turma.
  * `PUT /api/turmas/{id}` — Consumido ao salvar as alterações de dados de uma turma existente.
  * `DELETE /api/turmas/{id}` — Consumido ao excluir uma turma sem alunos vinculados.

---

### 6. Tela de Alunos (`/alunos`)
Esta tela permite gerenciar as matrículas dos alunos adultos, exibindo seus dados pessoais, telefone, nível de alfabetização atual e qual turma pertencem. Permite cadastrar, editar dados/vínculo de turmas e excluir registros.

* **Endpoints Consumidos:**
  * `GET /api/alunos` — Consumido no carregamento da tela para listar todos os alunos cadastrados e exibi-los na tabela.
  * `GET /api/turmas` — Consumido na abertura do modal para carregar o seletor Dropdown de turmas disponíveis para atribuição do aluno.
  * `POST /api/alunos` — Consumido ao submeter o formulário de cadastro de um novo aluno.
  * `PUT /api/alunos/{id}` — Consumido ao salvar as edições cadastrais do aluno.
  * `DELETE /api/alunos/{id}` — Consumido ao confirmar a remoção de um aluno cadastrado.

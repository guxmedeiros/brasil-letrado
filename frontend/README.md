# ⚛️ Brasil Letrado — Front-End Web App

Esta é a documentação do front-end da aplicação Brasil Letrado, com instruções de instalação, bibliotecas utilizadas e detalhes dos componentes reutilizáveis.

---

## 📚 Bibliotecas Utilizadas

### Dependências Principais
- **React 19**: Biblioteca para construção de interfaces de usuário
- **React DOM**: Renderização do React no navegador
- **React Router DOM**: Navegação entre as páginas da aplicação
- **Axios**: Cliente HTTP para consumir a API REST
- **PrimeReact**: Biblioteca de componentes de interface de usuário (UI) com design profissional
- **PrimeIcons**: Ícones da biblioteca PrimeReact
- **PrimeFlex**: Biblioteca de utilitários CSS para estilização responsiva

### Ferramentas de Desenvolvimento
- **Vite**: Ferramenta de build e servidor de desenvolvimento rápido
- **Oxlint**: Linter para JavaScript/TypeScript
- **@vitejs/plugin-react**: Plugin do Vite para React
- **@types/react** e **@types/react-dom**: Tipagens TypeScript para React

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado na máquina (versão recente recomendada)
- npm (incluso com o Node.js)

### Passos para Executar
1. Abra o terminal na pasta `frontend/`
2. Instale as dependências na primeira execução:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. A aplicação web abrirá no seu navegador em `http://localhost:5173`

### Comandos Úteis
- `npm run build`: Cria uma versão de produção do projeto
- `npm run lint`: Executa o linter para verificar o código
- `npm run preview`: Pré-visualiza a versão de produção

---

## 🧩 Componentes Reutilizáveis

Os componentes reutilizáveis estão na pasta `src/components/` e são usados em várias páginas da aplicação.

### 1. `BackToTop`
- **Arquivos:** `BackToTop.jsx`, `BackToTop.css`
- **Descrição:** Botão que aparece quando a página é rolada para baixo, permitindo retornar ao topo com um clique.
- **Funcionalidades:** Animação suave, oculto por padrão, aparece ao rolar a página.

### 2. `EducadorCard`
- **Arquivos:** `EducadorCard.jsx`, `EducadorCard.css`
- **Descrição:** Componente que exibe as informações de um educador em um card visualmente atraente.
- **Conteúdo:** Foto do educador (ou avatar padrão), nome, e-mail, telefone, formação e botões de editar/excluir.

### 3. `EmptyState`
- **Arquivo:** `EmptyState.jsx`
- **Descrição:** Componente que exibe uma mensagem amigável quando não há dados para exibir (ex: nenhum educador cadastrado).

### 4. `Footer`
- **Arquivos:** `Footer.jsx`, `Footer.css`
- **Descrição:** Rodapé da aplicação, exibindo a logo, subtítulo "Alfabetização de adultos" e links centralizados.

### 5. `FormField`
- **Arquivo:** `FormField.jsx`
- **Descrição:** Componente wrapper para campos de formulário, incluindo rótulo (label), campo de entrada e mensagem de erro.
- **Funcionalidades:** Garante consistência visual em todos os formulários da aplicação.

### 6. `LoadingState`
- **Arquivos:** `LoadingState.jsx`, `LoadingState.css`
- **Descrição:** Componente que exibe um spinner e mensagem de carregamento enquanto os dados estão sendo buscados da API.

### 7. `Navbar`
- **Arquivos:** `Navbar.jsx`, `Navbar.css`
- **Descrição:** Barra de navegação principal da aplicação, com menu hambúrguer para dispositivos móveis.
- **Funcionalidades:** Navegação entre páginas, exibição do nome da instituição logada, botão de logout.

### 8. `OcupacaoBar`
- **Arquivos:** `OcupacaoBar.jsx`, `OcupacaoBar.css`
- **Descrição:** Barra de progresso visual que indica a ocupação de uma turma, com mudança de cor conforme a lotação (verde para livre, amarelo para aviso, vermelho para cheio).

### 9. `SearchBar`
- **Arquivos:** `SearchBar.jsx`, `SearchBar.css`
- **Descrição:** Barra de busca reutilizável, com ícone e placeholder personalizável.
- **Funcionalidades:** Filtra dados em tabelas (alunos, educadores, turmas).

### 10. `StatusTag` (com `TurnoTag`)
- **Arquivos:** `StatusTag.jsx`, `StatusTag.css`
- **Descrição:** Tags coloridas para exibir status, como o turno da turma (manhã, tarde, noite).

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

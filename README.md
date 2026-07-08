# 📚 Brasil Letrado

O Brasil Letrado é uma plataforma web desenvolvida para apoiar instituições, ONGs e projetos sociais que atuam na alfabetização de jovens e adultos. A aplicação centraliza o gerenciamento de educadores, turmas e alunos, oferecendo indicadores e ferramentas que substituem controles manuais por um fluxo digital organizado.

---

## Seção 1 - Sobre o projeto

* **Nome do projeto:** Brasil Letrado
* **ODS escolhida:** ODS 4 — Educação de Qualidade (especialmente focado na Meta 4.6 — Alfabetização e capacitação de jovens e adultos)
* **Nome do aluno:** Gustavo Medeiros Moysés
* **Objetivo do projeto:** Facilitar a gestão administrativa de projetos sociais, institutos e ONGs independentes de alfabetização de adultos. O sistema organiza turmas, vincula educadores, matricula alunos e acompanha o nível de alfabetização de cada um (Iniciante, Intermediário e Avançado), substituindo controles manuais por um fluxo automatizado e centralizado.
* **Principais Funcionalidades Implementadas:**
  * Landing Page pública com apresentação do projeto
  * Autenticação JWT para instituições
  * Dashboard com métricas e estatísticas
  * Gestão completa de Educadores, Turmas e Alunos

---

## Seção 2 - Como rodar

### Como rodar o back-end (Spring Boot)

1. Abra um terminal na pasta `backend/`.
2. Certifique-se de ter o JDK 21 ou superior instalado.
3. Certifique-se de que o MySQL esteja rodando localmente na porta `3306`.
4. Crie um arquivo `application-local.properties` em `backend/src/main/resources/` (usando `application.properties` como base) e configure suas credenciais do MySQL (usuário e senha).
5. Execute o comando Maven para rodar a aplicação:
   ```bash
   # No Windows:
   .\mvnw.cmd spring-boot:run

   # No Linux/macOS:
   ./mvnw spring-boot:run
   ```
6. A API estará de pé em `http://localhost:8080` e os dados iniciais de teste (seed) serão populados automaticamente caso o banco esteja vazio. O Swagger interativo pode ser acessado em `http://localhost:8080/swagger-ui.html`.

### Credenciais de Teste Padrão:
* Email: `contato@sementesdosaber.org`
* Senha: `123456`

### Como rodar o front-end (React)

1. Abra outro terminal na pasta `frontend/`.
2. Instale as dependências na primeira execução:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. O aplicativo web abrirá no seu navegador em `http://localhost:5173`.

### Fluxo de Navegação:
* A Landing Page (`/`) é a página inicial para todos os usuários
* Usuários não autenticados acessam `/login` ou `/cadastro` para autenticar-se ou criar uma conta
* Após login, a navegação dá acesso ao `/dashboard` e às páginas de gestão (`/educadores`, `/turmas`, `/alunos`)

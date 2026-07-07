# 📚 Brasil Letrado

Este é o repositório principal do projeto **Brasil Letrado**, contendo o código fonte completo do Back-end (Spring Boot) e do Front-end (React).

---

## Seção 1 - Sobre o projeto

* **Nome do projeto:** Brasil Letrado
* **ODS escolhida:** ODS 4 — Educação de Qualidade (especialmente focado na Meta 4.6 — Alfabetização e capacitação de jovens e adultos)
* **Nome do aluno:** Gustavo Medeiros Moysés
* **Objetivo do projeto:** Facilitar a gestão administrativa de projetos sociais, institutos e ONGs independentes de alfabetização de adultos. O sistema organiza turmas, vincula educadores, matricula alunos e acompanha o nível de alfabetização de cada um (Iniciante, Intermediário e Avançado), substituindo controles manuais por um fluxo automatizado e centralizado.

---

## Seção 2 - Como rodar

### Como rodar o back-end

1. Abra um terminal na pasta `backend/`.
2. Certifique-se de ter o JDK 21 ou superior instalado.
3. Certifique-se de que o MySQL esteja rodando localmente na porta `3306`.
4. Execute o comando Maven para rodar a aplicação:
   ```bash
   # No Windows:
   .\mvnw.cmd spring-boot:run

   # No Linux/macOS:
   ./mvnw spring-boot:run
   ```
5. A API estará de pé em `http://localhost:8080` e os dados iniciais de teste (seed) serão populados automaticamente caso o banco esteja vazio. O Swagger interativo pode ser acessado em `http://localhost:8080/swagger-ui.html`.

### Como rodar o front-end

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

### Nome do arquivo do script SQL

* O arquivo SQL com os comandos DDL para criação do banco de dados e suas tabelas é o: **[schema.sql](file:///C:/Users/Gustavo/.gemini/antigravity-ide/scratch/brasil-letrado/schema.sql)** (localizado na raiz deste repositório).

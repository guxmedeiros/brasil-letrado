# 📚 Brasil Letrado

> Sistema de Gestão de Turmas de Alfabetização de Adultos  
> Alinhado ao **ODS 4 — Educação de Qualidade** (Meta 4.6)

---

## 🎯 Sobre o Projeto

O **Brasil Letrado** é uma plataforma web para facilitar a gestão administrativa de projetos sociais de alfabetização de adultos (EJA). O sistema permite que coordenadores e educadores de ONGs, institutos e projetos independentes gerenciem turmas, alunos e educadores com agilidade — eliminando planilhas e papéis.

**Problema resolvido:** ONGs de alfabetização de adultos organizam turmas, alunos e educadores de forma manual, dificultando o controle e acompanhamento dos atendidos.

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Backend | Java 21 + Spring Boot 3.4 |
| Build | Maven (Maven Wrapper) |
| Persistência | Spring Data JPA + Hibernate |
| Banco de Dados | MySQL 8 |
| Documentação API | Swagger UI (springdoc-openapi) |
| Frontend | React 18 + Vite |
| UI Components | PrimeReact + PrimeIcons + PrimeFlex |
| Roteamento | react-router-dom |
| HTTP Client | Axios |
| Testes | JUnit 5 + Spring MockMvc |

---

## 📁 Estrutura do Repositório

```
brasil-letrado/
├── backend/         # API REST Spring Boot
│   ├── src/main/java/br/com/brasilletrado/
│   │   ├── model/         # Entidades JPA (Aluno, Turma, Educador)
│   │   ├── repository/    # Interfaces Spring Data JPA
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── mapper/        # Conversão Entidade <-> DTO
│   │   ├── controller/    # REST Controllers
│   │   ├── exception/     # GlobalExceptionHandler
│   │   └── config/        # CORS, DataLoader (seed), Swagger
│   └── src/test/          # Testes de integração e repositório
└── frontend/        # SPA React
    └── src/
        ├── components/    # Navbar, Footer, StatusTag
        ├── pages/         # EducadoresPage, TurmasPage, AlunosPage
        ├── routes/        # AppRoutes (react-router-dom)
        └── services/      # Axios: api.js, educadorService, turmaService, alunoService
```

---

## ⚙️ Pré-requisitos

- **Java 21**
- **Node.js 24.14+**
- **MySQL 8** rodando localmente

---

## 🚀 Como Rodar o Backend

1. Certifique-se de que o MySQL está rodando na porta `3306`
2. Edite a senha em `backend/src/main/resources/application.properties` se necessário:
   ```properties
   spring.datasource.password=sua_senha
   ```
3. Execute na pasta `backend/`:
   ```bash
   ./mvnw spring-boot:run
   # Windows:
   .\mvnw.cmd spring-boot:run
   ```
4. O banco `brasil_letrado` é criado automaticamente (`createDatabaseIfNotExist=true`)
5. Dados de exemplo são inseridos automaticamente na primeira execução (seed)

**API disponível em:** `http://localhost:8080`

---

## 🌐 Como Rodar o Frontend

Na pasta `frontend/`:

```bash
npm install   # apenas na primeira vez
npm run dev
```

**Interface disponível em:** `http://localhost:5173`

---

## 📖 Swagger UI

Explore e teste todos os endpoints da API em:

**`http://localhost:8080/swagger-ui.html`**

---

## 🧪 Testes do Backend

```bash
cd backend
.\mvnw.cmd test
```

20 testes — cobrindo CRUD completo de Alunos, Turmas e Educadores + validações de Bean Validation.

---

## 👤 Autor

Desenvolvido por Gustavo Medeiros Moysés para o Projeto Final — Programa Transforma Futuros

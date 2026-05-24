# Seleção FESF-SUS – 1 F.C

Sistema Full Stack desenvolvido para o Processo Seletivo FESF-SUS.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![Docker](https://img.shields.io/badge/Docker-enabled-blue)

## Sobre o projeto

Aplicação para gestão básica de pacientes e atendimentos, com dashboard de indicadores, cadastro de pacientes, registro de atendimentos e atualização de status.

## Tecnologias utilizadas

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic

### Frontend

- React
- Next.js
- TypeScript
- TailwindCSS

### Infraestrutura

- Docker
- Docker Compose

## Funcionalidades

- Cadastro de pacientes
- Validação de CPF, telefone, nome e cidade
- Cadastro de atendimentos
- Atualização de status dos atendimentos
- Dashboard com indicadores
- Interface responsiva
- API documentada via Swagger


## Preview

### Dashboard Desktop

![Dashboard Desktop](./docs/DASHBOARD-DESKTOP.png)

### Dashboard Mobile

![Dashboard Mobile](./docs/DASHBOARD-MOBILE1.png)
![Dashboard Mobile](./docs/DASHBOARD-MOBILE2.png)
![Dashboard Mobile](./docs/DASHBOARD-MOBILE3.png)

### Documentação da API

![Swagger API](./docs/SWAGGER-API.png)
```
# Estrutura do Projeto

```txt
backend/
frontend/
docker-compose.yml
README.md
```

---

# Como executar localmente

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Executando com Docker

```bash
docker compose up --build
```

---

# Endpoints principais

## Patients
- GET /patients
- POST /patients
- DELETE /patients/{id}

## Appointments
- GET /appointments
- POST /appointments
- PUT /appointments/{id}

## Dashboard
- GET /dashboard

---

# Documentação Swagger

```txt
http://localhost:8000/docs
```

---

# Autor

Mateus Sagrilo Brasileiro Lima

- GitHub:
https://github.com/MateusSagrilo

- LinkedIn:
https://www.linkedin.com/in/mateus-sagrilo-brasileiro-lima/
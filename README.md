# 🌱 API de Práticas Sustentáveis

Projeto desenvolvido para a disciplina **Web Mobile** do curso de **Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)** — 2º Semestre.

Este projeto é parte do **Componente Extensionista** da disciplina, alinhado aos **ODS 12** (Consumo e Produção Responsáveis) e **ODS 13** (Ação Contra a Mudança Global do Clima).

---

## 📋 Sobre o Projeto

A ideia é criar uma API para que as pessoas possam registrar e consultar **ações sustentáveis do dia a dia**, como usar copo reutilizável, andar de bicicleta, separar o lixo reciclável, entre outras práticas.

Com isso, é possível visualizar estatísticas sobre quais práticas são mais comuns e quem está mais engajado com o meio ambiente. 🌍

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** — plataforma de execução
- **NestJS** — framework para criação da API
- **MongoDB** — banco de dados NoSQL
- **Mongoose** — ODM para conexão com o MongoDB
- **TypeScript** — linguagem de programação

---

## 📁 Estrutura do Projeto

```
src/
├── main.ts                        → inicialização da aplicação
├── app.module.ts                  → módulo principal
├── app.controller.ts              → rota Hello World
├── app.service.ts                 → serviço principal
└── pratica/
    ├── pratica.model.ts           → modelo do MongoDB
    ├── pratica.module.ts          → módulo de práticas
    ├── pratica.controller.ts      → rotas da API
    └── pratica.service.ts         → regras de negócio
```

---

## 🚀 Como Executar

**Pré-requisitos:** Node.js e npm instalados.

```bash
# Instalar as dependências
npm install

# Rodar a aplicação
npm run start
```

A API vai rodar em: `http://localhost:3000`

---

## 📡 Rotas da API

### ✅ GET `/`
Verifica se a aplicação está rodando.

**Resposta:**
```
Hello World!
```

---

### ✅ POST `/pratica`
Cadastra uma nova prática sustentável.

**Body (JSON):**
```json
{
  "nomeUsuario": "Ana Silva",
  "tipo": "Uso de copo reutilizável",
  "data": "2026-05-15",
  "descricao": "Levei meu copo para o trabalho hoje"
}
```

> ⚠️ Os campos `nomeUsuario`, `tipo` e `data` são obrigatórios. O campo `descricao` é opcional.

**Resposta:**
```json
{
  "_id": "664a1b2c3d4e5f6a7b8c9d0e",
  "nomeUsuario": "Ana Silva",
  "tipo": "Uso de copo reutilizável",
  "data": "2026-05-15",
  "descricao": "Levei meu copo para o trabalho hoje",
  "createdAt": "2026-05-15T10:00:00.000Z",
  "updatedAt": "2026-05-15T10:00:00.000Z"
}
```

---

### ✅ GET `/historico`
Retorna a lista de todas as práticas cadastradas.

**Parâmetros opcionais (query params):**

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| `nomeUsuario` | Filtrar por usuário | `?nomeUsuario=Ana` |
| `tipo` | Filtrar por tipo de prática | `?tipo=bicicleta` |
| `dataInicial` | Data de início do filtro | `?dataInicial=2026-05-01` |
| `dataFinal` | Data de fim do filtro | `?dataFinal=2026-05-31` |

**Exemplo de uso:**
```
GET /historico?nomeUsuario=Ana&dataInicial=2026-05-01
```

**Resposta:**
```json
[
  {
    "_id": "664a1b2c3d4e5f6a7b8c9d0e",
    "nomeUsuario": "Ana Silva",
    "tipo": "Uso de copo reutilizável",
    "data": "2026-05-15",
    "createdAt": "2026-05-15T10:00:00.000Z"
  }
]
```

---

### ✅ GET `/estatisticas`
Retorna um resumo estatístico geral das práticas registradas.

**Resposta:**
```json
{
  "totalGeral": 42,
  "tipoMaisRegistrado": "Uso de copo reutilizável",
  "usuarioMaisAtivo": "Ana Silva",
  "totalPorTipo": [
    { "tipo": "Uso de copo reutilizável", "total": 15 },
    { "tipo": "Uso de bicicleta como meio de transporte", "total": 10 },
    { "tipo": "Separação de lixo reciclável", "total": 8 }
  ],
  "mediaDiariaUltimos30Dias": 1.4
}
```

---

## 🧪 Testando com o Postman

1. Abra o **Postman** (ou [Hoppscotch](https://hoppscotch.io) online)
2. Use a URL base da aplicação
3. Para o `POST /pratica`, selecione **Body → raw → JSON** e cole o corpo da requisição

---

## 🎓 Informações Acadêmicas

- **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas
- **Disciplina:** Web Mobile
- **Semestre:** 2º Semestre — 2026
- **Professor:** Alcides Teixeira Barboza Junior
- **Atividade:** Aula 7 — Componente Extensionista

---

## 🌿 Exemplos de Práticas Sustentáveis

Alguns exemplos de tipos que podem ser cadastrados:
- Uso de copo reutilizável
- Uso de bicicleta como meio de transporte
- Separação de lixo reciclável
- Economia de água (banhos mais curtos)
- Uso de sacola reutilizável em compras
- Plantio de árvores ou hortas
- Redução do desperdício de alimentos

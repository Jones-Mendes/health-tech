# Health Tech - Cuida+

Projeto fullstack para organizar pacientes, atendimentos, rotinas, medicamentos e evolucoes. Backend em Node.js + Express com SQLite, e frontend em HTML + Tailwind + JavaScript puro.

## Tecnologias

- Node.js
- Express
- SQLite
- HTML
- Tailwind CSS
- JavaScript (vanilla)

## Estrutura de pastas

```
public/
  index.html
  js/
    app.js
src/
  controllers/
  database/
  routes/
  services/
  utils/
server.js
```

## Como rodar o backend

1. Instalar dependencias

```bash
npm install
```

2. Iniciar servidor

```bash
npm run dev
```

A API inicia em http://localhost:5000.

## Como rodar o frontend

O frontend esta em public/ e e servido pelo Express. Acesse:

```
http://localhost:5000
```

Se quiser abrir apenas o HTML, abra public/index.html no navegador, mas a API precisa estar rodando.

## Padrao de respostas da API

Todas as rotas retornam:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

## Rotas principais

### Pacientes

- GET /pacientes
- GET /pacientes/:id
- POST /pacientes
- PUT /pacientes/:id
- DELETE /pacientes/:id
- GET /pacientes/:id/atendimentos
- GET /pacientes/:id/rotinas
- GET /pacientes/:id/medicamentos
- GET /pacientes/:id/evolucoes

### Atendimentos

- GET /atendimentos
- GET /atendimentos/:id
- POST /atendimentos
- PUT /atendimentos/:id
- DELETE /atendimentos/:id

### Rotinas

- GET /rotinas
- GET /rotinas/:id
- POST /rotinas
- PUT /rotinas/:id
- DELETE /rotinas/:id

### Medicamentos

- GET /medicamentos
- GET /medicamentos/:id
- POST /medicamentos
- PUT /medicamentos/:id
- DELETE /medicamentos/:id

### Evolucoes

- GET /evolucoes
- GET /evolucoes/:id
- POST /evolucoes
- PUT /evolucoes/:id
- DELETE /evolucoes/:id

## Exemplos de uso (fetch)

```js
fetch("http://localhost:5000/pacientes")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## Guia de testes no Postman

Base URL: http://localhost:5000

### GET /pacientes

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 1,
      "nome": "Maria Silva",
      "idade": 82,
      "condicao": "hipertensao",
      "observacoes": "necessita acompanhamento"
    }
  ]
}
```

### GET /pacientes/:id

URL:

```
GET http://localhost:5000/pacientes/1
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": {
    "id": 1,
    "nome": "Maria Silva",
    "idade": 82,
    "condicao": "hipertensao",
    "observacoes": "necessita acompanhamento"
  }
}
```

### POST /pacientes

Body:

```json
{
  "nome": "Maria Silva",
  "idade": 82,
  "condicao": "hipertensao",
  "observacoes": "necessita acompanhamento"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "paciente criado",
  "data": {
    "id": 1,
    "nome": "Maria Silva",
    "idade": 82,
    "condicao": "hipertensao",
    "observacoes": "necessita acompanhamento"
  }
}
```

### PUT /pacientes/:id

Body:

```json
{
  "nome": "Maria Silva",
  "idade": 83
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "paciente atualizado",
  "data": {
    "id": 1,
    "nome": "Maria Silva",
    "idade": 83,
    "condicao": "hipertensao",
    "observacoes": "necessita acompanhamento"
  }
}
```

### DELETE /pacientes/:id

Resposta (exemplo):

```json
{
  "success": true,
  "message": "paciente removido",
  "data": {
    "id": 1
  }
}
```

### GET /pacientes/:id/atendimentos

URL:

```
GET http://localhost:5000/pacientes/1/atendimentos
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 2,
      "paciente_id": 1,
      "data_atendimento": "2026-03-25",
      "observacoes": "pressao ok",
      "humor": "tranquila"
    }
  ]
}
```

### GET /pacientes/:id/rotinas

URL:

```
GET http://localhost:5000/pacientes/1/rotinas
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 3,
      "paciente_id": 1,
      "descricao": "exercicios leves",
      "periodo": "manha"
    }
  ]
}
```

### GET /pacientes/:id/medicamentos

URL:

```
GET http://localhost:5000/pacientes/1/medicamentos
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 4,
      "paciente_id": 1,
      "nome": "Losartana",
      "dosagem": "50mg",
      "horario": "08:00"
    }
  ]
}
```

### GET /pacientes/:id/evolucoes

URL:

```
GET http://localhost:5000/pacientes/1/evolucoes
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 5,
      "paciente_id": 1,
      "data_registro": "2026-03-25",
      "descricao": "melhora no sono"
    }
  ]
}
```

### GET /atendimentos

URL:

```
GET http://localhost:5000/atendimentos
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 2,
      "paciente_id": 1,
      "data_atendimento": "2026-03-25",
      "observacoes": "pressao ok",
      "humor": "tranquila"
    }
  ]
}
```

### GET /atendimentos/:id

URL:

```
GET http://localhost:5000/atendimentos/2
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": {
    "id": 2,
    "paciente_id": 1,
    "data_atendimento": "2026-03-25",
    "observacoes": "pressao ok",
    "humor": "tranquila"
  }
}
```

### POST /atendimentos

Body:

```json
{
  "paciente_id": 1,
  "data_atendimento": "2026-03-25",
  "observacoes": "pressao ok",
  "humor": "tranquila"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "atendimento criado",
  "data": {
    "id": 2,
    "paciente_id": 1,
    "data_atendimento": "2026-03-25",
    "observacoes": "pressao ok",
    "humor": "tranquila"
  }
}
```

### PUT /atendimentos/:id

Body:

```json
{
  "humor": "cansada"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "atendimento atualizado",
  "data": {
    "id": 2,
    "paciente_id": 1,
    "data_atendimento": "2026-03-25",
    "observacoes": "pressao ok",
    "humor": "cansada"
  }
}
```

### DELETE /atendimentos/:id

Resposta (exemplo):

```json
{
  "success": true,
  "message": "atendimento removido",
  "data": {
    "id": 2
  }
}
```

### GET /rotinas

URL:

```
GET http://localhost:5000/rotinas
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 3,
      "paciente_id": 1,
      "descricao": "exercicios leves",
      "periodo": "manha"
    }
  ]
}
```

### GET /rotinas/:id

URL:

```
GET http://localhost:5000/rotinas/3
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": {
    "id": 3,
    "paciente_id": 1,
    "descricao": "exercicios leves",
    "periodo": "manha"
  }
}
```

### POST /rotinas

Body:

```json
{
  "paciente_id": 1,
  "descricao": "exercicios leves",
  "periodo": "manha"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "rotina criada",
  "data": {
    "id": 3,
    "paciente_id": 1,
    "descricao": "exercicios leves",
    "periodo": "manha"
  }
}
```

### PUT /rotinas/:id

Body:

```json
{
  "periodo": "tarde"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "rotina atualizada",
  "data": {
    "id": 3,
    "paciente_id": 1,
    "descricao": "exercicios leves",
    "periodo": "tarde"
  }
}
```

### DELETE /rotinas/:id

Resposta (exemplo):

```json
{
  "success": true,
  "message": "rotina removida",
  "data": {
    "id": 3
  }
}
```

### GET /medicamentos

URL:

```
GET http://localhost:5000/medicamentos
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 4,
      "paciente_id": 1,
      "nome": "Losartana",
      "dosagem": "50mg",
      "horario": "08:00"
    }
  ]
}
```

### GET /medicamentos/:id

URL:

```
GET http://localhost:5000/medicamentos/4
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": {
    "id": 4,
    "paciente_id": 1,
    "nome": "Losartana",
    "dosagem": "50mg",
    "horario": "08:00"
  }
}
```

### POST /medicamentos

Body:

```json
{
  "paciente_id": 1,
  "nome": "Losartana",
  "dosagem": "50mg",
  "horario": "08:00"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "medicamento criado",
  "data": {
    "id": 4,
    "paciente_id": 1,
    "nome": "Losartana",
    "dosagem": "50mg",
    "horario": "08:00"
  }
}
```

### PUT /medicamentos/:id

Body:

```json
{
  "dosagem": "75mg"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "medicamento atualizado",
  "data": {
    "id": 4,
    "paciente_id": 1,
    "nome": "Losartana",
    "dosagem": "75mg",
    "horario": "08:00"
  }
}
```

### DELETE /medicamentos/:id

Resposta (exemplo):

```json
{
  "success": true,
  "message": "medicamento removido",
  "data": {
    "id": 4
  }
}
```

### GET /evolucoes

URL:

```
GET http://localhost:5000/evolucoes
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": 5,
      "paciente_id": 1,
      "data_registro": "2026-03-25",
      "descricao": "melhora no sono"
    }
  ]
}
```

### GET /evolucoes/:id

URL:

```
GET http://localhost:5000/evolucoes/5
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": null,
  "data": {
    "id": 5,
    "paciente_id": 1,
    "data_registro": "2026-03-25",
    "descricao": "melhora no sono"
  }
}
```

### POST /evolucoes

Body:

```json
{
  "paciente_id": 1,
  "data_registro": "2026-03-25",
  "descricao": "melhora no sono"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "evolucao criada",
  "data": {
    "id": 5,
    "paciente_id": 1,
    "data_registro": "2026-03-25",
    "descricao": "melhora no sono"
  }
}
```

### PUT /evolucoes/:id

Body:

```json
{
  "descricao": "sono melhor e continuo"
}
```

Resposta (exemplo):

```json
{
  "success": true,
  "message": "evolucao atualizada",
  "data": {
    "id": 5,
    "paciente_id": 1,
    "data_registro": "2026-03-25",
    "descricao": "sono melhor e continuo"
  }
}
```

### DELETE /evolucoes/:id

Resposta (exemplo):

```json
{
  "success": true,
  "message": "evolucao removida",
  "data": {
    "id": 5
  }
}
```

## Como testar no navegador

1. Rode o backend com npm run dev.
2. Abra http://localhost:5000.
3. Use o formulario de pacientes para criar, editar e excluir.

## Explicacao das rotas

- /pacientes: CRUD completo de pacientes.
- /pacientes/:id/atendimentos: lista atendimentos de um paciente.
- /pacientes/:id/rotinas: lista rotinas de um paciente.
- /pacientes/:id/medicamentos: lista medicamentos de um paciente.
- /pacientes/:id/evolucoes: lista evolucoes de um paciente.

## Possiveis melhorias futuras

- Autenticacao e autorizacao.
- Paginacao e filtros nas listagens.
- Testes automatizados.
- Logs estruturados.
- Variaveis de ambiente para configuracao.

# Resumo da Semana do Desenvolvedor AWS — Escola da Nuvem

## 📦 Projeto: Sistema Completo de Processamento de Pedidos na AWS

Durante a **Semana do Desenvolvedor** organizada pela Escola da Nuvem, participei de um projeto prático e completo que simula o ciclo de vida de pedidos em uma arquitetura moderna baseada em eventos na AWS. A seguir, o resumo do que foi construído, aprendido e utilizado em cada uma das 4 aulas.

---

## ✅ Aula 1: Ingestão de Pedidos via API e EventBridge

### Objetivos:
- Criar um endpoint REST para receber pedidos.
- Fazer pré-validação e validação de dados com AWS Lambda.
- Enfileirar pedidos usando Amazon SQS FIFO.
- Publicar eventos validados no Amazon EventBridge.

### Tecnologias e Serviços:
- **Amazon API Gateway**
- **AWS Lambda** (pré-validação e validação)
- **Amazon SQS FIFO + DLQ**
- **Amazon EventBridge**

---

## 📁 Aula 2: Ingestão de Arquivos via S3 e Rastreamento

### Objetivos:
- Ingestão de pedidos em lote via arquivos `.json` no S3.
- Notificação de novos arquivos para SQS.
- Lambda que valida o arquivo, transforma os pedidos e envia ao pipeline principal.
- Registro de validação no DynamoDB.
- Notificações de falha com Amazon SNS.

### Tecnologias e Serviços:
- **Amazon S3**
- **AWS Lambda**
- **Amazon SQS (Standard) + DLQ**
- **Amazon DynamoDB**
- **Amazon SNS**

---

## 🔄 Aula 3: Processamento Central de Pedidos e Persistência

### Objetivos:
- Consumir eventos `NovoPedidoValidado` do EventBridge.
- Armazenar e simular o processamento dos pedidos.
- Persistir os dados finais no banco de dados.

### Tecnologias e Serviços:
- **Amazon EventBridge**
- **Amazon SQS (Standard)**
- **AWS Lambda**
- **Amazon DynamoDB** (tabela principal de pedidos)

---

## ✏️ Aula 4: Fluxos Adicionais de Pedidos, DLQs e Lambda Layers

### Objetivos:
- Criar os fluxos de **cancelamento** e **alteração** de pedidos.
- Configurar novas regras no EventBridge, SQS e Lambdas para esses fluxos.
- Atualizar status no banco de dados.
- Testar o uso de Dead Letter Queues (DLQs).

### Tecnologias e Serviços:
- **Amazon EventBridge**
- **Amazon SQS (Standard) + DLQs**
- **AWS Lambda**
- **Amazon DynamoDB**
- **IAM Roles personalizadas**

---

## 🧠 Habilidades e Conceitos Desenvolvidos

- Integração entre múltiplos serviços AWS (Event-driven architecture).
- Boas práticas com DLQs e desacoplamento com SQS.
- Tratamento de erros com SNS e observabilidade com CloudWatch.
- Implementação de múltiplas Lambdas com responsabilidades claras.
- Uso prático de variáveis de ambiente e políticas IAM específicas.

---

## 🧰 Tecnologias Utilizadas (Resumo Geral)

| Categoria       | Serviços/Recursos                  |
|----------------|-------------------------------------|
| API e eventos   | API Gateway, EventBridge           |
| Processamento   | Lambda, SQS, DLQ                   |
| Armazenamento   | DynamoDB, S3                       |
| Notificações    | SNS                                |
| Segurança       | IAM Roles, Policies                |
| Observabilidade | CloudWatch                         |

---

## 🔚 Conclusão

Ao final da semana, desenvolvi um **pipeline de processamento de pedidos altamente desacoplado e escalável** na AWS, simulando cenários reais como ingestão via API e arquivos, persistência em banco NoSQL, tratamento de erros e atualização de status com eventos. Um projeto completo que reforçou tanto o conhecimento técnico em AWS quanto boas práticas de arquitetura moderna baseada em eventos.

---

# 📘 Semana do Desenvolvedor - Relato Técnico com Exemplos

Este documento descreve minha experiência completa durante a Semana do Desenvolvedor promovida pela Escola da Nuvem, com foco na construção de um sistema distribuído de processamento de pedidos na AWS.

---

## 🧪 Exemplo de Requisição API

```bash
curl -X POST https://api-id.execute-api.us-east-1.amazonaws.com/dev/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "pedidoId": "apiP003-exemplo",
    "clienteId": "clienteAPI-evanescence",
    "itens": [
      {
        "item": "Box Set - Evanescence Essentials",
        "qtd": 1
      },
      {
        "item": "Camiseta Tour Fallen 2003",
        "qtd": 2
      },
      {
        "item": "LP - Synthesis (Vinil Duplo)",
        "qtd": 1
      }
    ]
  }'
```

---

## 🧱 Recursos Criados

Todos os identificadores foram modificados por segurança, utilizando IDs de conta fictícios e nomes genéricos.

### Aula 1 — Ingestão via API e EventBridge

| Recurso                   | Nome                                                                 |
|---------------------------|----------------------------------------------------------------------|
| DLQ SQS FIFO              | `pedidos-fifo-dlq-demo.fifo`                                         |
| Fila principal FIFO       | `pedidos-fifo-queue-demo.fifo`                                       |
| API Gateway               | `https://api-id.execute-api.us-east-1.amazonaws.com/dev`             |
| Event Bus                 | `arn:aws:events:us-east-1:12345678:event-bus/pedidos-event-bus-demo` |

---

### Aula 2 — Ingestão via S3 + SQS + Validação

| Recurso                   | Nome                                              |
|---------------------------|---------------------------------------------------|
| Bucket S3                 | `datalake-arquivos-demo`                          |
| DLQ da SQS                | `s3-arquivos-json-dlq-demo`                       |
| Fila principal SQS        | `s3-arquivos-json-queue-demo`                     |
| DynamoDB (controle)       | `controle-arquivos-historico-demo`                |
| SNS de notificação        | `notificacao-erro-arquivos-demo`                  |

---

### Aula 3 — Processamento Principal

| Recurso                   | Nome                                              |
|---------------------------|---------------------------------------------------|
| Role Lambda               | `lambda-processa-pedidos-role-demo`               |
| DLQ SQS                   | `pedidos-pendentes-dlq-demo`                      |
| Fila principal SQS        | `pedidos-pendentes-queue-demo`                    |
| DynamoDB principal        | `pedidos-db-demo`                                 |

---

### Aula 4 — Cancelamento, Alteração e DLQs

| Recurso                   | Nome                                                   |
|---------------------------|--------------------------------------------------------|
| Role Lambda               | `lambda-altera-cancela-role-demo`                      |
| Fila + DLQ Cancelamento   | `cancela-pedido-queue-demo`, `cancela-pedido-dlq-demo` |
| Fila + DLQ Alteração      | `altera-pedido-queue-demo`, `altera-pedido-dlq-demo`   |
| Regras EventBridge        | `cancela-pedido-rule-demo`, `altera-pedido-rule-demo`  |

---
# Lab 14 – Arquitetura Fan-Out com SNS, SQS e Lambda

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

- Usar o Amazon SNS para publicar uma mensagem que será distribuída para múltiplos assinantes.
- Configurar filtros de assinatura SNS para que diferentes Lambdas processem apenas mensagens relevantes.
- Integrar o SNS com Amazon SQS para desacoplar o processamento e aumentar a resiliência.
- Criar múltiplas AWS Lambda functions que serão acionadas pelos eventos do SNS (diretamente ou via SQS), cada uma realizando uma tarefa distinta.
- Configurar Dead-Letter Queues (DLQs) para tratamento de erros em uma das filas SQS.
- Monitorar o fluxo usando o Amazon CloudWatch Logs.

---

## 🛠️ Serviços utilizados

- Amazon SNS
- Amazon SQS
- AWS Lambda
- AWS IAM
- Amazon CloudWatch

---

## 📌 Etapas realizadas

### 1. Criar Filas SQS

- Criar fila DLQ:
  - Nome: `fila-fraude-analise-dlq-seunome`
  - Tipo: Standard
  - Configurações padrão

- Criar fila principal:
  - Nome: `fila-fraude-analise-seunome`
  - Tipo: Standard
  - Associar a DLQ criada anteriormente
  - Maximum receives: 3

---

### 2. Criar Tópico SNS

- Nome: `topico-pedidos-ecommerce-seunome`
- Tipo: Standard
- Política de acesso padrão (ajustada após a criação das assinaturas, se necessário)

---

### 3. Criar Roles IAM

- Criar Role para Lambdas genéricas:
  - Nome: `LambdaRoleSNSGeneric-seunome`
  - Permissões: `AWSLambdaBasicExecutionRole`

- Criar Role para Lambda de análise de fraude (SQS):
  - Nome: `LambdaRoleSQSFraude-seunome`
  - Permissões:
    - `AWSLambdaBasicExecutionRole`
    - `AmazonSQSFullAccess`

---

### 4. Criar Funções Lambda

- Criar função `lambda-inventario-seunome`:
  - Runtime: Python 3.12
  - Role: `LambdaRoleSNSGeneric-seunome`
  - Substituir o código e fazer o deploy

- Criar função `lambda-pagamento-seunome`:
  - Runtime: Python 3.12
  - Role: `LambdaRoleSNSGeneric-seunome`
  - Substituir o código e fazer o deploy

- Criar função `lambda-notificacao-cliente-seunome`:
  - Runtime: Python 3.12
  - Role: `LambdaRoleSNSGeneric-seunome`
  - Substituir o código e fazer o deploy

- Criar função `lambda-analise-fraude-seunome`:
  - Runtime: Python 3.12
  - Role: `LambdaRoleSQSFraude-seunome`
  - Substituir o código e fazer o deploy
  - Adicionar trigger:
    - Tipo: SQS
    - Fila: `fila-fraude-analise-seunome`
    - Batch size: 1

---

### 5. Criar Subscrições no SNS

- Criar subscrição para a Lambda `lambda-inventario-seunome`:
  - Filtro:
    ```json
    {
      "EventType": ["OrderPlaced", "InventoryCheckRequired"]
    }
    ```

- Criar subscrição para a Lambda `lambda-pagamento-seunome`:
  - Filtro:
    ```json
    {
      "EventType": ["OrderPlaced"],
      "PaymentType": ["CreditCard", "Boleto"]
    }
    ```

- Criar subscrição para a Lambda `lambda-notificacao-cliente-seunome`:
  - Filtro:
    ```json
    {
      "EventType": ["OrderConfirmed", "OrderShipped"]
    }
    ```

- Criar subscrição para a fila SQS `fila-fraude-analise-seunome`:
  - Filtro:
    ```json
    {
      "EventType": ["OrderPlaced"],
      "TransactionValue": [{"numeric": [">", 500]}]
    }
    ```

---

### 6. Ajustar Política de Acesso da Fila SQS

- Acessar a aba “Queue policies” da fila `fila-fraude-analise-seunome` e adicionar:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "sns.amazonaws.com"
      },
      "Action": "sqs:SendMessage",
      "Resource": "COLE AQUI O ARN DA SUA fila-fraude-analise-seunome",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "COLE AQUI O ARN DO SEU topico-pedidos-ecommerce-seunome"
        }
      }
    }
  ]
}
```

> ⚠️ Substituir os ARNs pelos seus valores reais.

---

### 7. Publicar Mensagem no Tópico SNS

- Message body:
```json
{
  "pedido_id": "PEDIDO-123",
  "cliente_id": "CLIENTE-XYZ",
  "itens": [
    {"produto_id": "PROD-A", "quantidade": 2},
    {"produto_id": "PROD-B", "quantidade": 1}
  ]
}
```

- Message attributes:
  - EventType: `OrderPlaced`
  - OrderID: `PEDIDO-123`
  - PaymentType: `CreditCard`
  - CustomerEmail: `cliente@example.com`
  - TransactionValue: `750`

---

### 8. Verificação no CloudWatch Logs

- Verificar os seguintes grupos de logs:

  - `/aws/lambda/lambda-inventario-seunome`: deve ter sido acionada (EventType: OrderPlaced)
  - `/aws/lambda/lambda-pagamento-seunome`: deve ter sido acionada (EventType: OrderPlaced e PaymentType: CreditCard)
  - `/aws/lambda/lambda-notificacao-cliente-seunome`: **não** deve ter sido acionada
  - `/aws/lambda/lambda-analise-fraude-seunome`: deve ter sido acionada (EventType: OrderPlaced e TransactionValue > 500)

---

## ✅ Resultado Final

- Sistema de fan-out construído com SNS, SQS e Lambda
- Mensagens publicadas no SNS foram distribuídas corretamente com base em filtros
- Fila SQS configurada com DLQ e consumida por Lambda
- Logs confirmando a execução esperada de cada função

---

## 🧠 Aprendizados

- Fan-Out com SNS: Utilizar o Amazon SNS como hub central para distribuir mensagens para múltiplos destinos.
- Filtragem de Assinaturas SNS: Aplicar filtros para entregar mensagens apenas a serviços relevantes.
- Desacoplamento com SQS: Utilizar filas como buffer para tarefas assíncronas e resilientes.
- Processamento Paralelo com Lambda: Acionar múltiplas funções simultaneamente para diferentes lógicas de negócio.
- Tratamento de Erros com DLQs: Isolar mensagens que falharam em uma fila separada para análise posterior.
- Monitoramento com CloudWatch Logs: Acompanhar a execução e falhas através dos logs.
- Gerenciamento de Permissões com IAM: Criar roles específicas e seguras para cada função da arquitetura.
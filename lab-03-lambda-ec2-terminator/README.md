# Lab 03 – Automatizando o Fim das Instâncias EC2 com AWS Lambda

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Criar uma solução automatizada para encerramento de instâncias EC2 utilizando AWS Lambda, IAM e EventBridge.

---

## 🛠️ Serviços utilizados

- AWS Lambda
- Amazon EC2
- IAM (Roles e Políticas)
- Amazon EventBridge

---

## 📌 Etapas realizadas

### 1. Criar Política IAM
- Permissões para terminar instâncias EC2 e escrever logs no CloudWatch.
- Nome: `PoliticaTerminarEC2-fulano`

### 2. Criar Role IAM
- Vinculada ao serviço Lambda
- Com a política de terminação de EC2
- Nome: `RoleTerminarEC2-fulano`

### 3. Criar Função Lambda
- Nome: `LambdaTerminarEC2-fulano`
- Linguagem: Python 3.9
- Código: script `Terminator.py` com função `lambda_handler`
- Timeout: 10 segundos
- Handler: `Terminator.lambda_handler`

### 4. Configurar gatilho com Amazon EventBridge
- Nome da regra: `GatilhoTerminarEC2-fulano`
- Agendamento: `rate(5 minutes)` ou `rate(12 hours)`

---

## 🧹 Finalização

Recursos excluídos:
- Função Lambda
- Role IAM
- Política IAM
- Regra do EventBridge

---

## 🧠 Aprendizados

- Uso de AWS Lambda para automação
- Princípios de menor privilégio com IAM
- Agendamento de tarefas com EventBridge

# Lab 04 – Integração entre SNS, SQS e DLQ na AWS

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

## 🎯 Objetivo

Implementar uma arquitetura de mensagens utilizando SNS e SQS com suporte a Dead-Letter Queue (DLQ), simulando falhas e garantindo resiliência no sistema.

## 🛠️ Serviços utilizados

- Amazon SQS (Standard Queues e Dead-Letter Queues)
- Amazon SNS
- IAM (para políticas de permissão)

## 📌 Etapas realizadas

### 1. Criar as Filas SQS
- Fila DLQ: `minha-dlq-lab-seunome-aaaammdd`
- Fila principal: `minha-fila-principal-lab-seunome-aaaammdd` com redirecionamento para DLQ após 3 tentativas

### 2. Criar Tópico SNS
- Nome: `meu-topico-lab-seunome-aaaammdd`

### 3. Assinar a fila principal ao tópico SNS

### 4. Configurar Política SQS personalizada

### 5. Testes com publicação e envio para DLQ

--- 

## 🧠 Aprendizados

- Como integrar SNS e SQS
- Utilização de DLQs para aumentar a tolerância a falhas
- Aplicação de políticas IAM personalizadas para controle de acesso
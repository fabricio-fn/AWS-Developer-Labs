# Lab 05 – Jogo de Adivinhação com Lambda, API Gateway e S3

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Desenvolver uma aplicação serverless na AWS, integrando diversos serviços para criar um jogo de adivinhação.

---

## 🛠️ Serviços utilizados

- AWS Lambda
- Amazon API Gateway
- Amazon S3
- IAM (para permissões)
- CloudFront (opcional para distribuição)

---

## 📌 Etapas realizadas

### 1. Criar função Lambda
- Nome: `LambdaGame-fulanodetal`
- Runtime: Python 3.9
- Upload do código: `lambda_function.zip`
- Deploy do código no console

### 2. Criar API Gateway
- Nome: `Api-fulanodetal`
- Método: GET
- Caminho: `/jogo`
- Integração com Lambda
- Estágio: `prod`
- Configuração de CORS:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Headers: content-type`
  - `Access-Control-Allow-Methods: GET`

### 3. Configurar site estático no Amazon S3
- Nome do bucket: `s3-website-fulanodetal`
- Upload do arquivo `index.html`
- Edição do arquivo para:
  - Inserir a **Invocar URL** da API no campo de chamada do `fetch()`
  - Alterar o caminho do recurso para `/jogo`
  - Inserir seu nome após “Escola da Nuvem💙”

### 4. Habilitar hospedagem de site estático
- Documento de índice: `index.html`

### 5. Permitir acesso público ao bucket
- Desbloquear acesso público
- Adicionar política no bucket para permitir acesso anônimo com `GetObject`

---

## ✅ Resultado

Um site funcional onde o usuário digita um número de 1 a 10. A aplicação consulta a API Gateway, que por sua vez aciona a função Lambda, retornando se o número foi adivinhado corretamente.

---

## 🧠 Aprendizados

- Criar e implantar funções Lambda com API Gateway
- Publicar sites estáticos com S3
- Aplicar permissões seguras via políticas de bucket
- Entender a importância do CORS na integração entre frontend e backend
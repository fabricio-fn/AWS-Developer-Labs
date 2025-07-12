# Lab 06 – AWS Lambda com Aliases e API Gateway com Stages

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Implementar uma arquitetura serverless com **ambientes isolados de desenvolvimento e produção**, utilizando **Aliases do Lambda** e **Stages do API Gateway** para garantir versionamento e controle de deploy.

---

## 🛠️ Serviços utilizados

- AWS Lambda
- Amazon API Gateway
- IAM (para permissões)

---

## 📌 Etapas realizadas

### 1. Criar Função Lambda
- Nome: `minha-funcao-proxy-lab-fulanodetal`
- Runtime: Python 3.9
- Código inicial: versão de desenvolvimento (`lambda_dev.py`)
- Testes realizados com evento tipo API Gateway Proxy

### 2. Publicar Versões
- Versão 1 → código de desenvolvimento
- Alias `dev` → apontando para versão 1
- Versão 2 → código de produção (`lambda_prod.py`)
- Alias `prod` → apontando para versão 2

### 3. Criar API REST no API Gateway
- Nome: `minha-api-proxy-lab-fulanodetal`
- Método: GET no recurso `/hello`
- Integração proxy com Lambda

### 4. Configurar Stages
- Stage `Desenvolvimento` → invoca alias `dev`
- Stage `Producao` → invoca alias `prod`

### 5. Testes
- Acessar URLs de invocação por ambiente:
  - `/Desenvolvimento/hello`
  - `/Producao/hello`
- Verificar mensagens diferentes conforme ambiente

---

## ✅ Resultado

- A API `/Desenvolvimento/hello` retorna:  
  `"Olá do ambiente Desenvolvimento!"`

- A API `/Producao/hello` retorna:  
  `"Olá do ambiente de Produção!"`

---

## 🧠 Aprendizados

- Como utilizar versões e aliases no Lambda
- Integração de aliases com API Gateway usando stages
- Boas práticas para ambientes separados em arquiteturas serverless

# Lab 08 – Armazenamento Seguro com SSM Parameter Store via CLI

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Armazenar e acessar configurações de um aplicativo (como URLs e senhas de banco de dados) usando o AWS Systems Manager Parameter Store com suporte a criptografia via KMS, utilizando a AWS CLI no CloudShell.

---

## 🛠️ Serviços utilizados

- AWS Systems Manager (Parameter Store)
- AWS KMS (Key Management Service)
- AWS CloudShell
- IAM (permissões)

---

## 📌 Etapas realizadas

### 1. Criar parâmetros do tipo String

#### Parâmetro de Desenvolvimento
- Nome: `/meu-app-SeuNomeSobrenome/dev/db-url`
- Tipo: `String`
- Valor: `dev.database.SeuNomeSobrenome.com:3306`
- Descrição: `Database URL for my app in dev`

#### Parâmetro de Produção
- Nome: `/meu-app-SeuNomeSobrenome/prod/db-url`
- Tipo: `String`
- Valor: `prod.database.SeuNomeSobrenome.com:3306`
- Descrição: `Database URL for my app in prod`

---

### 2. Criar chave de criptografia (KMS)
- Serviço: AWS KMS
- Alias: `SeuNomeSobrenome-key`
- Description: `SeuNomeSobrenome-key`
- Finalizar a criação sem alterações adicionais

---

### 3. Criar parâmetros do tipo SecureString

#### Parâmetro de Desenvolvimento (senha criptografada)
- Nome: `/meu-app-SeuNomeSobrenome/dev/db-password`
- Tipo: `SecureString`
- Valor: `aqui é a senha do dev`
- KMS Key: Selecionar a chave criada anteriormente

#### Parâmetro de Produção (senha criptografada)
- Nome: `/meu-app-SeuNomeSobrenome/prod/db-password`
- Tipo: `SecureString`
- Valor: `aqui é a senha da prod`
- KMS Key: mesma da anterior

---

### 4. Acessar parâmetros via AWS CLI (CloudShell)

#### Listar parâmetros (sem descriptografar)
```bash
aws ssm get-parameters --names /meu-app-SeuNomeSobrenome/dev/db-url /meu-app-SeuNomeSobrenome/dev/db-password

#### Listar parâmetros (com descriptografia)

```bash
aws ssm get-parameters --names /meu-app-SeuNomeSobrenome/dev/db-url /meu-app-SeuNomeSobrenome/dev/db-password --with-decryption

## 🧠 Aprendizados

- Criar parâmetros seguros (SecureString) com KMS
- Recuperar valores via CLI com e sem descriptografia
- Navegar pelos serviços SSM, KMS e CloudShell
- Automatizar operações seguras com a AWS CLI
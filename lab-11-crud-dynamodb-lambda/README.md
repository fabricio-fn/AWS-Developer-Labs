# Lab 11 – CRUD com DynamoDB, Lambda, API Gateway e S3

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Construir uma aplicação web com backend serverless utilizando Lambda, API Gateway e DynamoDB, com frontend estático hospedado em um bucket S3. A aplicação realiza operações CRUD com monitoramento em CloudWatch.

---

## 🛠️ Serviços utilizados

- AWS Lambda
- Amazon DynamoDB
- Amazon API Gateway
- Amazon S3
- AWS IAM
- Amazon CloudWatch Logs

---

## 📌 Etapas realizadas

### 1. Criar Role IAM
- Nome: `RoleCrud-seunome`
- Permissões:
  - `AWSLambdaBasicExecutionRole`
  - `AmazonDynamoDBFullAccess`

---

### 2. Criar tabela no DynamoDB
- Nome: `Produtos-seunome`
- Chave de partição: `id` (String)

---

### 3. Criar Função Lambda
- Nome: `LambdaCrud-seunome`
- Runtime: Python 3.12
- Código: `CRUD.zip`
- Handler: `CRUD.lambda_handler`
- Memória: 256 MB
- Timeout: 10s

---

### 4. Criar API Gateway
- Nome: `APICRUD-seunome`
- Tipo: HTTP
- Integração: Lambda (`LambdaCrud-seunome`)
- Rotas: GET, POST, PUT, DELETE etc.
- Estágio: `prod`
- Implantação automática ativada

---

### 5. Configurar Frontend no S3
- Nome do bucket: `website-seunome`
- Upload dos arquivos: `index.html`, `style.css`, `script.js`
- Ativar hospedagem estática
- Permitir acesso público
- Inserir política de leitura (GetObject) via gerador
- Substituir a variável `API_URL` no `script.js` com a URL da API Gateway

---

### 6. Criar grupo de logs no CloudWatch
- Nome: `APICRUD-seunome`
- Retenção: 1 dia
- Classe: Padrão

---

### 7. Habilitar Logs e CORS no API Gateway
- Log formatado JSON com destino ao ARN do grupo de logs
- CORS configurado para permitir métodos GET, POST, PUT, DELETE
- Origem: URL do bucket S3

---

### 8. Testar a Aplicação
- Acessar o site no navegador (URL da hospedagem S3)
- Preencher os campos do formulário para cadastrar produtos:
  - Ex: `ID: 1`, `Nome: Bolsa`, `Preço: 12.50`, `Quantidade: 100`
- Verificar exibição e persistência dos produtos cadastrados

---

### 9. Verificar dados no DynamoDB
- Acessar a tabela no console do DynamoDB
- Usar filtro `id exists`
- Conferir os itens cadastrados via site

---

### 🔍 Verificar Logs
- Acessar CloudWatch > Logs
- Grupos esperados:
  - `/aws/lambda/LambdaCrud-seunome`
  - `APICRUD-seunome`
- Verificar logs das chamadas feitas pela interface e execução da Lambda

---

## ✅ Resultado Final

- Site acessível com interface funcional para cadastro, edição e remoção de produtos
- API funcionando com integração total entre Lambda, DynamoDB e API Gateway
- Logs detalhados disponíveis no CloudWatch para rastreamento
- CORS configurado corretamente permitindo chamadas seguras entre o frontend e a API
- Dados armazenados com sucesso no DynamoDB

---

## 🧠 Aprendizados

- Criar um fluxo completo de CRUD usando arquitetura serverless
- Integração entre Lambda e DynamoDB via boto3
- Implantação de API Gateway com múltiplas rotas
- Hospedagem de frontend estático em bucket S3 com permissões públicas
- Configuração de logs personalizados e monitoramento via CloudWatch
- Aplicação de CORS em APIs HTTP da AWS
- Boas práticas de limpeza de recursos para evitar custos

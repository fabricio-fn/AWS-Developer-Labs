# Lab 07 – DynamoDB com GLI e LSI

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Criar uma tabela no DynamoDB com índices secundários locais (LSI) e globais (GLI), realizar operações de inserção e consulta utilizando o console da AWS e o terminal CloudShell.

---

## 🛠️ Serviços utilizados

- Amazon DynamoDB
- AWS CloudShell
- IAM (permissões)
- AWS Console

---

## 📌 Etapas realizadas

### 1. Criar Tabela DynamoDB
- Nome da tabela: `Pedido-fulano`
- Chave de partição: `ID do Usuário` (String)
- Chave de ordenação: `Data do Pedido` (String)

### 2. Configurar Tabela
- Classe: DynamoDB Standard
- Capacidade provisionada (5 leitura / 5 gravação)
- Criar índice local (LSI):
  - Nome: `LSI-PedidoseunomeStatus`
  - Chave de ordenação: `Status` (String)
  - Projeção: All

### 3. Inserir Item Manualmente
- ID do Usuário: `U000`
- Data do Pedido: `2025-05-16`
- Endereco (mapa):
  - bairro: Santa Maria
  - cidade: Recife
  - estado: PE
  - numero: S/D
  - rua: Cavalcante Novaes 2
- tags (lista):
  - Entrega zona rural
  - Equipe Rocket
  - Recife
- IDPedido: `P1000`
- Status: `Pendente`
- ValorTotal: `900`

### 4. Popular Tabela com CloudShell
- Baixar e editar o arquivo `pedidos_import.json`
- Substituir o nome da tabela
- Fazer upload via CloudShell
- Comando para importar:
  ```bash
  aws dynamodb batch-write-item --request-items file://pedidos_import.json

## 🧠 Aprendizados

- Criar parâmetros seguros (SecureString) com KMS
- Recuperar valores via CLI com e sem descriptografia
- Navegar pelos serviços SSM, KMS e CloudShell
- Automatizar operações seguras com a AWS CLI
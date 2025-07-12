# Lab 12 – AWS Security Token Service (STS) e Credenciais Temporárias

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Utilizar o AWS Security Token Service (STS) para criar credenciais temporárias, assumindo uma role com permissões limitadas, executando ações via CLI e simulando expiração e revogação de acesso.

---

## 🛠️ Serviços utilizados

- AWS IAM (Roles)
- AWS STS
- Amazon S3
- AWS CloudShell
- AWS CLI
- Python + Boto3

---

## 📌 Etapas realizadas

### 1. Configurar o Ambiente
- Abrir o CloudShell
- Atualizar pacotes e instalar Python 3 e Boto3:
  ```bash
  sudo yum update -y
  sudo yum install -y python3
  pip3 install boto3 --upgrade
  ```

---

### 2. Criar Role Temporária
- Tipo: Custom trust policy (usuários IAM)
- Permissão: `AmazonS3FullAccess`
- Nome: `SeuNomeRole`
- Confiança: ARN do seu usuário IAM

---

### 3. Alternar para a Role
- Usar botão "Alternar função" no console
- Preencher:
  - ID da conta
  - Nome da role: `SeuNomeRole`
  - Nome de exibição: `SeuNomeAcessoTemporario`
- Validação:
  - Acesso ao S3: permitido
  - Acesso ao Lambda: negado

---

### 4. Gerar Credenciais Temporárias
- Upload do script: `credenciais_temporarias.py`
- Executar com duração inválida (erro esperado):
  ```bash
  python3 credenciais_temporarias.py --role-arn arn:aws:iam::SEU_ROLE_ARN:role/SeuNomeRole --session-name AcessoTemporario --duration 7200
  ```
- Executar com duração válida (3600s):
  ```bash
  python3 credenciais_temporarias.py --role-arn arn:aws:iam::SEU_ROLE_ARN:role/SeuNomeRole --session-name AcessoTemporario --duration 3600
  ```
- Copiar Access Key, Secret Key e Session Token

---

### 5. Configurar no AWS CLI
- Rodar:
  ```bash
  aws configure
  ```
- Inserir Access Key e Secret Key
- Adicionar Session Token no arquivo:
  ```bash
  sudo nano ~/.aws/credentials
  aws_session_token = SEU_SESSION_TOKEN
  ```

---

### 6. Testar Permissões
- S3 (permitido): `aws s3 ls`
- Lambda (negado): `aws lambda list-functions`
- Ver identidade atual:
  ```bash
  aws sts get-caller-identity
  ```

---

### 7. Simular Expiração
- Aguardar 1 hora (sessão expira)
- Rodar novamente: `aws s3 ls`
- Esperar erro de credenciais expiradas

---

### 8. Restaurar Credenciais Originais
- Editar:
  ```bash
  sudo nano ~/.aws/credentials
  # comentar/remover chaves temporárias
  sudo nano ~/.aws/config
  # comentar/remover region/output
  ```

---

### 9. Editar Política de Confiança
- Substituir política de confiança por ARN de outra role (ex: de um colega)
- Executar o script novamente → **Erro esperado: acesso negado**

---

### 10. Excluir Recursos
- Excluir:
  - Role IAM (`SeuNomeRole`)
  - CloudShell (via Ações > Excluir)

---

## ✅ Resultado Final

- Role temporária criada com permissões controladas
- Credenciais STS geradas e testadas com acesso limitado via CLI
- Acesso ao S3 validado com sucesso
- Acesso negado a serviços não permitidos (como Lambda)
- Sessão simulada com expiração controlada
- Política de confiança editada e impacto testado com erro
- Ambiente limpo e seguro após término

---

## 🧠 Aprendizados

- Criar e configurar roles IAM com políticas de confiança personalizadas
- Gerar credenciais temporárias com o AWS STS usando scripts Python
- Validar permissões e restrições com base na role assumida
- Aplicar boas práticas de segurança com credenciais de curta duração
- Simular expiração e analisar comportamento do ambiente
- Entender a importância da política de confiança na autorização
- Restaurar perfil de usuário IAM após uso de role
- Limpeza segura de recursos para evitar cobranças
# Lab 10 – Monitoramento e Auditoria com CloudWatch e CloudTrail

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Configurar um ambiente de monitoramento e auditoria na AWS, incluindo alarmes para instâncias EC2, trilhas de eventos com CloudTrail, e envio de notificações via SNS.

---

## 🛠️ Serviços utilizados

- Amazon EC2
- Amazon CloudWatch
- AWS CloudTrail
- Amazon SNS
- Amazon S3
- IAM (permissões)

---

## 📌 Etapas realizadas

### 1. Criar Instância EC2
- AMI: Amazon Linux 2
- Tipo: `t2.micro`
- Nome: `Instancia-Teste-CloudWatch`
- Par de chaves para acesso via SSH
- Security group com porta SSH liberada para o IP local

### 2. Criar Alarme no CloudWatch
- Métrica: `CPUUtilization` da instância EC2
- Condição: uso de CPU > 70% por 5 minutos
- Ação: envio de e-mail via tópico SNS (`SNS-SeuNome`)
- Nome do alarme: `AlarmeCPU-Instancia-SeuNome`

### 3. Criar Trilha do CloudTrail
- Nome: `trilha-auditoria-seunome`
- Bucket S3 para armazenar os logs
- Criação de chave KMS (`alias/CloudTrailKey-seunome`) para criptografia
- Logs de eventos de gerenciamento (Read e Write) habilitados

### 4. Acessar Logs do CloudTrail
- Via console do S3: navegar até os arquivos `.json.gz`
- (Opcional) Enviar os logs para o CloudWatch Logs
  - Criar log group: `CloudTrail/Logs-SeuNome`
  - Criar role: `CloudTrailRoleForCloudWatchLogs`

### 5. Gerar Carga de CPU com stress
- Conectar na EC2 via SSH
- Instalar o pacote `stress`:
  ```bash
  sudo yum update -y
  sudo amazon-linux-extras install epel -y
  sudo yum install stress -y

### 6. Executar o stress
```bash
stress --cpu 8 --timeout 600

### 7. Verificar Alarme e Notificação
- Acessar CloudWatch → Alarms
- Estado deve mudar para “In alarm”
- Verificar recebimento de e-mail via SNS
- Parar stress com Ctrl + C

## 🧠 Aprendizados

- Criar e configurar instâncias EC2 com segurança
- Monitorar uso de CPU com alarmes do CloudWatch
- Automatizar alertas com notificações por e-mail via SNS
- Habilitar o CloudTrail para rastrear ações na conta AWS
- Armazenar e visualizar logs de auditoria no S3 e CloudWatch Logs
- Aplicar boas práticas de encerramento para evitar custos
- Praticar observabilidade e governança em nuvem
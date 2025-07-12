# Lab 13 – Aplicações com AWS Elastic Beanstalk

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

- Criar uma role IAM (Perfil de Instância EC2) com as permissões necessárias para o Elastic Beanstalk.
- Configurar e lançar um ambiente Elastic Beanstalk para uma aplicação web (Node.js neste exemplo).
- Monitorar a saúde, logs e métricas da aplicação no console.
- Compreender como o Elastic Beanstalk abstrai e gerencia a infraestrutura AWS (EC2, Auto Scaling, ELB, CloudWatch).

---

## 🛠️ Serviços utilizados

- AWS IAM
- AWS Elastic Beanstalk
- Amazon EC2
- AWS CloudFormation
- Amazon CloudWatch
- AWS Console

---

## 📌 Etapas realizadas

### 1. Criar Role IAM para EC2

- Navegar até IAM > Roles > Create Role
- Tipo: AWS service
- Caso de uso: EC2
- Permissões adicionadas:
  - `AWSElasticBeanstalkWebTier`
  - `AWSElasticBeanstalkWorkerTier`
  - `AWSElasticBeanstalkMulticontainerDocker`
  - `AWSElasticBeanstalkEnhancedHealth`
  - `AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy`
- Nome sugerido: `role-beanstalk-ec2-SeuNomeSobreNome`
- Verificar política de confiança: `ec2.amazonaws.com`
- Criar a role

---

### 2. Criar Ambiente Elastic Beanstalk

- Navegar até Elastic Beanstalk > Create application
- Nome da aplicação: `MeuAppsNomeSobrenome`
- Nome do ambiente: `MeuAppsNomeSobrenome-desenvolvimento`
- Plataforma: Node.js (padrão)
- Código da aplicação: Sample application
- Preset: Single instance (free tier eligible)

#### Acessos de Serviço:
- Usar role existente: `aws-elasticbeanstalk-service-role` (ou criar se necessário)
- EC2 instance profile: `role-beanstalk-ec2-SeuNomeSobreNome`

- Revisar configurações
- Criar ambiente
- Acompanhar o provisionamento no painel do ambiente ou via CloudFormation
- Verificar status: `CREATE_COMPLETE`

---

### 3. Explorar o Console do Elastic Beanstalk

#### Upload e Deploy:
- Upload de novo `.zip` da aplicação
- Informar um `Version label`
- Clicar em Deploy

#### Saúde (Health):
- Acessar aba Health para visualizar status das instâncias

#### Logs:
- Acessar aba Logs
- Solicitar últimos logs (100 linhas ou completos)
- Baixar arquivos diretamente pelo console

#### Monitoramento (Monitoring):
- Acessar aba Monitoring
- Visualizar gráficos do CloudWatch: CPU, tráfego, latência, etc.

#### Alarmes (Alarms):
- Visualizar alarmes padrão do CloudWatch
- Criar alarmes personalizados

#### Atualizações Gerenciadas (Managed Updates):
- Configurar janelas de manutenção para updates automáticos
- Acompanhar histórico de atualizações

#### Configuração (Configuration):
- Modificar:
  - Roles IAM
  - VPC/Subnets/SGs
  - Tipo da instância EC2
  - Auto Scaling
  - Load Balancer
  - Estratégias de deploy (Rolling, All at once, etc.)
  - Métricas do CloudWatch
  - Banco de dados RDS
  - Outros ajustes avançados

#### Recursos Subjacentes:
- Explorar EC2, CloudFormation, CloudWatch, Load Balancers e grupos de segurança diretamente nos respectivos consoles.

---

## ✅ Resultado Final

- Role IAM criada com permissões adequadas
- Ambiente Elastic Beanstalk provisionado com sucesso
- Aplicação exemplo implantada e funcionando
- Monitoramento e gerenciamento realizados via console
- Logs acessados e métricas observadas
- Processo de deploy validado
- Compreensão prática da abstração oferecida pelo Elastic Beanstalk

---

## 🧠 Aprendizados

- Criar e configurar roles IAM com permissões específicas para serviços gerenciados
- Implantar uma aplicação usando o Elastic Beanstalk e entender os recursos provisionados
- Gerenciar ambientes através do console: deploys, logs, métricas, saúde e atualizações
- Explorar recursos AWS subjacentes criados automaticamente (EC2, CloudWatch, CloudFormation, etc.)
- Aplicar boas práticas com atualizações gerenciadas e escalabilidade
- Diagnosticar e resolver problemas de permissão relacionados ao Beanstalk

# Lab 01 – Explorando a AWS com o Amazon EC2

Este laboratório foi realizado como parte do curso **AWS Developer** oferecido pela Escola da Nuvem.

---

## 🎯 Objetivo

O objetivo foi aprender os conceitos básicos do Amazon EC2 e realizar as seguintes ações:

- Iniciar uma instância EC2 via Console (com Apache instalado via User Data)
- Iniciar outra instância EC2 via AWS CloudShell (com comandos AWS CLI)
- Testar acesso via HTTP
- Encerrar recursos após uso para evitar cobranças

---

## 🛠️ Serviços utilizados

- Amazon EC2  
- Grupos de Segurança (Security Groups)  
- AWS CloudShell  
- AWS CLI  
- Par de chaves (Key Pairs)

---

## 📦 Scripts utilizados

### 1. Script `user_data` para inicializar Apache e uma página HTML:

\`\`\`bash
#!/bin/bash
yum -y install httpd
systemctl enable httpd
systemctl start httpd
echo '<html><h1>Olá do seu servidor web!</h1></html>' > /var/www/html/index.html
\`\`\`

Esse script foi usado no campo **"Dados de usuário"** ao criar a instância no console da AWS.

---

### 2. Comandos do CloudShell (`cloudshell_commands.sh`)

\`\`\`bash
# Substituir seunome por seu nome real (sem espaços)
GRUPO_SEGURANCA="seunome-grupo"

# Criar grupo de segurança
SECURITY_GROUP_ID=$(aws ec2 create-security-group   --group-name $GRUPO_SEGURANCA   --description "Permitir HTTP"   --query "GroupId"   --output text)

# Liberar tráfego HTTP
aws ec2 authorize-security-group-ingress   --group-id $SECURITY_GROUP_ID   --protocol tcp   --port 80   --cidr 0.0.0.0/0

# Substituir com seu nome e par de chave criado no Console
NOME_INSTANCIA="instancia-seunome"
PAR_CHAVE="parchave-seunome"

# Criar a instância com a AMI Amazon Linux 2023
aws ec2 run-instances   --instance-type t2.micro   --image-id $(aws ssm get-parameters-by-path     --path "/aws/service/ami-amazon-linux-latest"     --query "Parameters[?ends_with(Name, 'al2023-ami-kernel-default-x86_64')].Value"     --output text)   --security-group-ids $SECURITY_GROUP_ID   --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value='$NOME_INSTANCIA'}]"   --key-name $PAR_CHAVE   --user-data "$(base64 -w 0 user_data_script.sh)"
\`\`\`

---

## ✅ Resultado esperado

Acesse o IP público da instância criada no navegador:
\`\`\`
http://<endereço-ip-público>
\`\`\`
Você verá a mensagem:  
**"Olá do seu servidor web!"**

---

## 🧹 Finalização

- Encerrar as instâncias EC2 criadas
- Excluir o grupo de segurança
- Sair do console da AWS

---

## 🧠 Aprendizados

- Diferença entre criar instância pelo console e pela CLI
- Uso de User Data para automação
- Segurança e boas práticas com pares de chaves e grupos de segurança
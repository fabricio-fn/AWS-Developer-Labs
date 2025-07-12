# Lab 09 – Amazon S3 Básico, Avançado e Acesso a Logs

Este laboratório foi realizado como parte do curso **AWS Developer** da Escola da Nuvem.

---

## 🎯 Objetivo

Utilizar os principais recursos do Amazon S3 voltados à organização, segurança e gerenciamento eficiente de dados, incluindo versionamento, regras de ciclo de vida, URLs pré-assinadas e registro de logs de acesso.

---

## 🛠️ Serviços utilizados

- Amazon S3
- IAM (permissões)
- Navegador Web (console AWS)

---

## 📌 Etapas realizadas

### 1. Criar Bucket no S3
- Região: `us-east-1`
- Nome: `seu-nome-bucket-lab3`
- Bloquear todo o acesso público
- Criptografia SSE-S3 ativada por padrão
- ACLs desabilitadas

### 2. Upload de Arquivo e Versionamento
- Criar arquivo `Lab9.txt` com conteúdo “Versão 1”
- Fazer upload para o bucket
- Ativar versionamento
- Alterar conteúdo do arquivo para “Versão 2” e reupar
- Verificar versões e restaurar se necessário

### 3. Configurar Regra de Ciclo de Vida
- Nome da regra: `MoverParaGlacierApos30Dias`
- Transição: Após 30 dias → Glacier Instant Retrieval
- Expiração: Após 31 dias → excluir versão atual

### 4. Gerar URL Pré-assinada
- Selecionar o objeto `Lab9.txt`
- Gerar URL válida por tempo determinado
- Testar acesso externo via aba anônima

### 5. Criar Bucket para Logs de Acesso
- Nome: `s3-access-logs-seu-nome`
- Configurações padrão (acesso público bloqueado, sem versionamento)

### 6. Ativar Logs de Acesso no Bucket Principal
- Editar propriedades do bucket original
- Ativar registro de log
- Selecionar o bucket `s3-access-logs-seu-nome` como destino

### 7. Gerar Logs e Validar
- Fazer novo upload de arquivo (ex: imagem) no bucket principal
- Aguardar 1h30 a 2h
- Verificar geração de logs no bucket de destino

---

## 🧠 Aprendizados

- Criar buckets seguros no Amazon S3 com boas práticas
- Ativar e usar versionamento para manter histórico de arquivos
- Aplicar regras de ciclo de vida para otimizar o armazenamento
- Compartilhar objetos de forma temporária e segura com URLs pré-assinadas
- Ativar e interpretar logs de acesso para auditoria e monitoramento
- Planejar estratégias de armazenamento para custo e rastreabilidade
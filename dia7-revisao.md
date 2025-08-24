# DIA 7: REVISÃO SEMANA 1 + MINI SIMULADO

## 📋 Objetivo do Dia 7
**Consolidar conhecimentos** da Semana 1 e **avaliar progresso** com simulado de 25 questões.

## 🎯 REVISÃO RÁPIDA - CONCEITOS CHAVE

### ✅ AWS Core + EC2 (Dias 1-2)
- **IAM**: Explicit Deny > Allow, Cross-account com AssumeRole
- **EC2**: Instance types, Placement Groups, EBS types (gp3 vs io2)
- **VPC**: Route tables (longest prefix match), Security Groups vs NACLs
- **Networking**: NAT Gateway por AZ, Elastic IPs cobrança

### ✅ Lambda + Serverless (Dias 3-4)
- **Lambda**: 15min timeout, 10GB memory, concurrent executions
- **Event Sources**: Sync vs Async vs Stream-based
- **API Gateway**: REST vs HTTP API, Lambda Authorizer
- **Step Functions**: State types, Error handling (Retry/Catch)

### ✅ Containers + Beanstalk (Dias 5-6)
- **ECS**: Task Definition, Service, Fargate vs EC2
- **EKS**: Control Plane gerenciado, Worker Nodes
- **Beanstalk**: Deployment strategies, .ebextensions

## 🧠 MINI SIMULADO - 25 QUESTÕES

### Questão 1
Uma aplicação Lambda está processando 1000 requests/segundo e algumas execuções estão falhando com "Rate exceeded". Qual é a causa mais provável?

A) Memory limit exceeded
B) Timeout limit exceeded  
C) Concurrent execution limit
D) Payload size limit

### Questão 2
Para uma aplicação web que precisa de alta disponibilidade, qual configuração de Auto Scaling Group é recomendada?

A) Min: 1, Max: 3, Desired: 2, Single AZ
B) Min: 2, Max: 6, Desired: 4, Multi-AZ
C) Min: 0, Max: 10, Desired: 5, Single AZ
D) Min: 1, Max: 1, Desired: 1, Multi-AZ

### Questão 3
Em uma política IAM, você tem Allow para s3:GetObject e Deny para s3:GetObject no mesmo recurso. Qual é o resultado?

A) Allow prevalece
B) Deny prevalece
C) Erro de política
D) Depende da ordem

### Questão 4
Para processar arquivos de 50MB via Lambda, qual é a melhor abordagem?

A) Aumentar memory para 10GB
B) Usar Step Functions com múltiplas Lambdas
C) Processar diretamente, Lambda suporta
D) Usar ECS Fargate

### Questão 5
No API Gateway, para implementar rate limiting por usuário, você deve usar:

A) Lambda Authorizer apenas
B) Usage Plans + API Keys
C) WAF rules
D) CloudFront

### Questões 6-25
[Continuação com questões sobre VPC, EBS, Step Functions, ECS, etc.]

## 📊 GABARITO E EXPLICAÇÕES

**1. C** - Concurrent execution limit (1000 por região por padrão)
**2. B** - Multi-AZ com capacidade adequada para failover
**3. B** - Explicit Deny sempre prevalece sobre Allow
**4. B** - Lambda tem limite de 15min, arquivos grandes precisam de processamento distribuído
**5. B** - Usage Plans permitem throttling por API Key

## 📈 ANÁLISE DE PERFORMANCE

**Pontuação:**
- 20-25: Excelente, pronto para Semana 2
- 15-19: Bom, revisar pontos fracos
- 10-14: Regular, reforçar conceitos
- <10: Revisar toda Semana 1

## 🎯 PRÓXIMOS PASSOS
- **Semana 2**: Storage, Databases, DevOps
- **Foco**: Pontos com menor pontuação no simulado
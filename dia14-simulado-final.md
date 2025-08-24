# DIA 14: SIMULADO FINAL + REVISÃO INTENSIVA

## 📋 Objetivo do Dia 14
**Simulado completo** de 65 questões no formato real da prova DVA-C02 + **revisão final**.

## 🎯 SIMULADO FINAL - 65 QUESTÕES

### DOMÍNIO 1: DESENVOLVIMENTO COM SERVIÇOS AWS (32%)

**Questão 1**
Uma aplicação serverless precisa processar uploads de imagens de até 100MB. Qual é a melhor arquitetura?

A) API Gateway → Lambda (15min timeout)
B) S3 → Lambda → Step Functions
C) API Gateway → S3 (presigned URL) → Lambda
D) CloudFront → Lambda@Edge

**Questão 2**
Para uma aplicação que precisa de consistência forte em reads no DynamoDB:

A) Usar eventually consistent reads (padrão)
B) Usar strongly consistent reads
C) Implementar retry logic
D) Usar DynamoDB Accelerator (DAX)

**Questão 3**
Uma Lambda function está sendo throttled. Qual métrica CloudWatch indica isso?

A) Duration
B) Errors
C) Throttles
D) Invocations

### DOMÍNIO 2: SEGURANÇA (26%)

**Questão 4**
Para permitir que uma aplicação EC2 acesse S3 sem hardcoded credentials:

A) Usar Access Keys no código
B) IAM Role anexada à instância
C) Credentials no User Data
D) AWS Secrets Manager

**Questão 5**
Em uma política IAM, qual statement prevalece?

```json
{
  "Statement": [
    {"Effect": "Allow", "Action": "s3:GetObject", "Resource": "*"},
    {"Effect": "Deny", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::secret-bucket/*"}
  ]
}
```

A) Allow para todos os buckets
B) Deny para secret-bucket, Allow para outros
C) Erro de política
D) Depende da ordem

### DOMÍNIO 3: DEPLOYMENT (24%)

**Questão 6**
Para deployment Blue/Green no Elastic Beanstalk:

A) Rolling deployment
B) Immutable deployment
C) Swap environment URLs
D) All at once deployment

**Questão 7**
No CodeDeploy, para rollback automático em caso de falha:

A) Configurar Auto Rollback
B) Usar CloudWatch Alarms
C) Implementar health checks
D) Todas as anteriores

### DOMÍNIO 4: TROUBLESHOOTING E OTIMIZAÇÃO (18%)

**Questão 8**
Uma Lambda function tem cold starts frequentes. Melhor solução:

A) Aumentar memory allocation
B) Provisioned Concurrency
C) Usar container images
D) Reduzir package size

**Questão 9**
Para debug de performance em aplicação distribuída:

A) CloudWatch Logs
B) CloudWatch Metrics
C) AWS X-Ray
D) VPC Flow Logs

### [Questões 10-65 continuam...]

## 📊 GABARITO COMPLETO

**Domínio 1 - Desenvolvimento:**
1. C - Presigned URLs para uploads grandes
2. B - Strongly consistent reads quando necessário
3. C - Throttles métrica específica

**Domínio 2 - Segurança:**
4. B - IAM Roles são best practice
5. B - Explicit Deny prevalece, mas é específico

**Domínio 3 - Deployment:**
6. C - Blue/Green via environment swap
7. D - Combinação de todas as opções

**Domínio 4 - Troubleshooting:**
8. B - Provisioned Concurrency elimina cold starts
9. C - X-Ray para tracing distribuído

## 🎯 ANÁLISE DE PERFORMANCE

### Pontuação por Domínio:
- **Desenvolvimento (21 questões)**: ___/21
- **Segurança (17 questões)**: ___/17
- **Deployment (16 questões)**: ___/16
- **Troubleshooting (11 questões)**: ___/11

### Interpretação:
- **52-65 (80%+)**: Excelente, pronto para a prova
- **45-51 (70-79%)**: Bom, revisar pontos fracos
- **39-44 (60-69%)**: Regular, mais estudo necessário
- **<39 (<60%)**: Revisar conceitos fundamentais

## 📚 REVISÃO FINAL - CONCEITOS CRÍTICOS

### ⚡ LAMBDA
- **Limits**: 15min timeout, 10GB memory, 6MB payload sync
- **Concurrency**: 1000 default, reserved vs provisioned
- **Cold Starts**: Provisioned concurrency elimina

### 🔐 SECURITY
- **IAM**: Explicit Deny > Allow, least privilege
- **Cognito**: User Pools (auth) vs Identity Pools (access)
- **Secrets Manager**: Automatic rotation, cross-region

### 🚀 DEPLOYMENT
- **CodeDeploy**: In-place vs Blue/Green
- **Beanstalk**: Rolling, Immutable, Blue/Green
- **Lambda**: Canary, Linear, All-at-once

### 📊 MONITORING
- **CloudWatch**: Metrics, Logs, Alarms
- **X-Ray**: Distributed tracing, segments
- **Custom Metrics**: PutMetricData API

### 💾 STORAGE
- **S3**: Storage classes, lifecycle, versioning
- **DynamoDB**: Partition key design, GSI vs LSI
- **RDS**: Multi-AZ vs Read Replicas

## 🎯 PLANO DE REVISÃO - ÚLTIMOS 3 DIAS

### **Dia -3: Pontos Fracos**
- Revisar domínios com menor pontuação
- Refazer questões erradas
- Estudar explicações detalhadas

### **Dia -2: Simulados Rápidos**
- 2-3 simulados de 20 questões
- Focar em timing (1.5min por questão)
- Revisar conceitos duvidosos

### **Dia -1: Revisão Final**
- Ler resumos de cada serviço
- Revisar limites e quotas
- Descansar bem antes da prova

## 🏆 DICAS FINAIS PARA A PROVA

1. **Gerenciamento de Tempo**: 130 minutos para 65 questões
2. **Leia Cuidadosamente**: Identifique palavras-chave
3. **Eliminação**: Descarte opções claramente erradas
4. **Cenários Reais**: Pense em best practices AWS
5. **Não Mude**: Primeira impressão geralmente está certa

## 🎉 PARABÉNS!

Você completou o **curso intensivo de 14 dias** para AWS DVA-C02!

**Próximos passos:**
1. Agendar a prova
2. Revisar pontos fracos identificados
3. Fazer simulados adicionais se necessário
4. Manter confiança - você está preparado!

**Boa sorte na sua certificação! 🚀**
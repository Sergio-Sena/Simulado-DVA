# 🚀 Deploy Guide - DVA-C02 Course

## 📋 **Fases de Deploy**

### **Fase 1: Preparação**
```bash
# 1. Instalar dependências
npm install

# 2. Domínio já configurado: sstechnologies-cloud.com

# 3. Configurar AWS CLI
aws configure
```

### **Fase 2: Deploy Manual (Primeira vez)**
```bash
# Development
npm run deploy:dev

# Staging  
npm run deploy:staging

# Production (após aprovação)
npm run deploy:prod
```

### **Fase 3: CI/CD Automático**

#### **Configuração GitHub Secrets:**
```
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
```

#### **Fluxo Automático:**
- **Push para `develop`** → Deploy automático para DEV
- **Push para `main`** → Deploy automático para STAGING
- **Aprovação manual** → Deploy para PRODUCTION

## 🌍 **Ambientes**

| Ambiente | URL | Branch | Deploy |
|----------|-----|--------|--------|
| **Development** | https://dev-dva.sstechnologies-cloud.com | `develop` | Automático |
| **Staging** | https://staging-dva.sstechnologies-cloud.com | `main` | Automático |
| **Production** | https://dva.sstechnologies-cloud.com | `main` | Manual |

## 🔄 **Comandos Úteis**

### **Deploy**
```bash
# Deploy específico por ambiente
npm run deploy:dev
npm run deploy:staging  
npm run deploy:prod

# Sync arquivos para S3
npm run sync:dev
npm run sync:staging
npm run sync:prod

# Invalidar cache CloudFront
npm run invalidate:dev
npm run invalidate:staging
npm run invalidate:prod
```

### **Rollback**
```bash
# Rollback para versão estável
npm run rollback
git push origin v1.0-stable:main --force

# Ou via GitHub Actions (manual trigger)
# Ir em Actions → Rollback to Stable → Run workflow
```

### **Remoção**
```bash
# Remover stack completo
npm run remove:dev
npm run remove:staging
npm run remove:prod
```

## 🏗️ **Arquitetura AWS**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Route53       │───▶│   CloudFront     │───▶│      S3         │
│  DNS Records    │    │   Distribution   │    │   Static Site   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  ACM Certificate │
                       │   SSL/TLS        │
                       └──────────────────┘
```

## 📊 **Custos Estimados**

| Serviço | Custo Mensal (estimado) |
|---------|-------------------------|
| **S3** | $1-5 (storage + requests) |
| **CloudFront** | $1-10 (data transfer) |
| **Route53** | $0.50 (hosted zone) |
| **ACM Certificate** | Gratuito |
| **Total** | **~$3-16/mês** |

## 🔧 **Troubleshooting**

### **Erro de Domínio**
```bash
# Verificar se domínio está configurado
dig dva.sstechnologies-cloud.com

# Verificar certificado SSL
openssl s_client -connect dva.sstechnologies-cloud.com:443
```

### **Cache CloudFront**
```bash
# Forçar invalidação
npm run invalidate:prod

# Verificar distribuição
aws cloudfront list-distributions
```

### **Logs**
```bash
# Logs do Serverless
serverless logs -f deploy --stage prod

# Logs CloudFormation
aws cloudformation describe-stack-events --stack-name dva-c02-course-prod
```

## 🚨 **Rollback de Emergência**

### **Método 1: Git**
```bash
git checkout v1.0-stable
npm run deploy:prod
```

### **Método 2: GitHub Actions**
1. Ir para **Actions** no GitHub
2. Selecionar **Rollback to Stable**
3. Clicar **Run workflow**
4. Confirmar rollback

### **Método 3: AWS Console**
1. CloudFormation → Stacks
2. Selecionar stack `dva-c02-course-prod`
3. **Actions** → **Update Stack**
4. **Use previous template**
5. Reverter para versão anterior

## ✅ **Checklist de Deploy**

### **Pré-Deploy**
- [ ] Código testado localmente
- [ ] Domínio configurado no DNS
- [ ] AWS credentials configuradas
- [ ] Secrets do GitHub configurados

### **Pós-Deploy**
- [ ] Site acessível via HTTPS
- [ ] Todas as páginas carregando
- [ ] JavaScript funcionando
- [ ] Formulários/quizzes operacionais
- [ ] Performance aceitável (< 3s load time)

### **Monitoramento**
- [ ] CloudWatch alarms configurados
- [ ] Logs sendo coletados
- [ ] Métricas de performance
- [ ] Backup/rollback testado
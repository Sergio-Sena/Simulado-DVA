# 🧪 Teste da Pipeline CI/CD

## ✅ **Status do Repositório**
- **Repo**: https://github.com/Sergio-Sena/Simulado-DVA.git
- **Domínio**: sstechnologies-cloud.com
- **Branches**: master, develop
- **Tag estável**: v1.0-stable

## 🚀 **Teste da Pipeline**

### **1. Configurar GitHub Secrets**
Vá para: `Settings` → `Secrets and variables` → `Actions`

Adicionar secrets:
```
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
```

### **2. Configurar Environments**
Vá para: `Settings` → `Environments`

Criar environments:
- **development** (auto-deploy)
- **staging** (auto-deploy) 
- **production** (manual approval required)

### **3. Testar Deploy DEV**
```bash
# Fazer mudança simples
echo "<!-- Pipeline test -->" >> index.html
git add .
git commit -m "test: Pipeline CI/CD test"
git push origin develop
```

### **4. Testar Deploy STAGING**
```bash
# Merge para main
git checkout master
git merge develop
git push origin master
```

### **5. Verificar Pipeline**
- Ir para **Actions** no GitHub
- Verificar jobs executando:
  - ✅ Validate & Test
  - ✅ Deploy to Development  
  - ✅ Deploy to Staging
  - ⏳ Deploy to Production (aguardando aprovação)

### **6. URLs de Teste**
Após deploy bem-sucedido:
- **DEV**: https://dev-dva.sstechnologies-cloud.com
- **STAGING**: https://staging-dva.sstechnologies-cloud.com
- **PROD**: https://dva.sstechnologies-cloud.com (após aprovação)

## 🔧 **Troubleshooting**

### **Erro de Permissions**
```bash
# Verificar AWS credentials
aws sts get-caller-identity
```

### **Erro de Domínio**
```bash
# Verificar se domínio existe
nslookup sstechnologies-cloud.com
```

### **Erro de Certificate**
- Certificado SSL será criado automaticamente
- Pode levar até 30 minutos para validação DNS

## 📊 **Monitoramento**
- **CloudFormation**: Verificar stacks criados
- **S3**: Verificar buckets criados
- **CloudFront**: Verificar distribuições
- **Route53**: Verificar records DNS
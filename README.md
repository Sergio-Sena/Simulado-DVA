# 🚀 AWS DVA-C02 Intensive Course

> Curso intensivo de 14 dias para certificação AWS Developer Associate com diagnóstico personalizado, laboratórios simulados e simulados reais.

## 🎯 **Funcionalidades**

- **📊 Diagnóstico Interativo** - Avaliação personalizada com questões técnicas reais
- **📚 Curso Completo** - 8 módulos com conteúdo detalhado e quizzes
- **🧪 Laboratórios Simulados** - Hands-on sem custo AWS
- **🎯 Simulados Reais** - 3 níveis com 65 questões cada
- **📈 Progress Tracking** - Acompanhamento real do progresso

## 🏗️ **Arquitetura**

```
Frontend (Static Site)
├── HTML/CSS/JavaScript
├── localStorage para dados
└── Banco de 200+ questões

Deploy (Serverless)
├── S3 (Static Hosting)
├── CloudFront (CDN)
├── Route53 (DNS)
└── ACM (SSL Certificate)
```

## 🚀 **Deploy**

### **Desenvolvimento Local**
```bash
# Abrir index.html no navegador
open index.html
```

### **Deploy AWS**
```bash
# Instalar dependências
npm install

# Deploy para desenvolvimento
npm run deploy:dev

# Deploy para produção
npm run deploy:prod
```

### **CI/CD Automático**
- **Push para `develop`** → Deploy automático para DEV
- **Push para `main`** → Deploy automático para STAGING  
- **Aprovação manual** → Deploy para PRODUCTION

## 🌍 **URLs**

| Ambiente | URL |
|----------|-----|
| **Development** | https://dev-dva.sstechnologies-cloud.com |
| **Staging** | https://staging-dva.sstechnologies-cloud.com |
| **Production** | https://dva.sstechnologies-cloud.com |

## 📋 **Estrutura do Projeto**

```
dva-c02-course/
├── index.html              # Página principal com diagnóstico
├── curso-completo.html     # Curso com 8 módulos
├── laboratorios.html       # Labs simulados interativos
├── simulados.html          # Simulados por nível
├── simulado-execucao.html  # Interface de execução
├── banco-questoes.js       # 200+ questões DVA-C02
├── styles-final.css        # Estilos principais
├── serverless.yml          # Configuração AWS
├── .github/workflows/      # CI/CD Pipeline
└── docs/                   # Documentação

Exemplos de Código/
├── dia2-vpc-setup.sh       # Scripts VPC
├── dia3-lambda-s3.py       # Lambda + S3
├── dia4-authorizer.py      # JWT Authorizer
└── *.yaml                  # Templates CloudFormation
```

## 🎓 **Conteúdo do Curso**

### **Semana 1: Fundamentos e Compute**
- **Dias 1-2**: AWS Core + EC2 Deep Dive
- **Dias 3-4**: Lambda + Serverless Architecture  
- **Dias 5-6**: Containers + Elastic Beanstalk
- **Dia 7**: Revisão + Mini Simulado

### **Semana 2: Storage, Database e DevOps**
- **Dias 8-9**: S3 + Storage + Databases
- **Dias 10-11**: API Gateway + Integration
- **Dias 12-13**: CI/CD + Monitoring + Security

## 🧪 **Laboratórios Disponíveis**

- **🌐 VPC Setup** - Infraestrutura de rede completa
- **⚡ Lambda + S3** - Processamento serverless
- **🚪 API Gateway** - APIs com autenticação
- **🔄 Step Functions** - Orquestração de workflows
- **📋 CloudFormation** - Infrastructure as Code
- **📊 Monitoring** - CloudWatch e X-Ray

## 🎯 **Simulados**

| Nível | Questões | Aprovação | Público |
|-------|----------|-----------|---------|
| **Básico** | 65 | 72% | Iniciantes |
| **Intermediário** | 65 | 75% | Intermediário |
| **Avançado** | 65 | 80% | Experientes |

**Distribuição por Domínio DVA-C02:**
- Development: 32% (21 questões)
- Security: 26% (17 questões)  
- Deployment: 24% (16 questões)
- Troubleshooting: 18% (11 questões)

## 🔄 **Rollback**

### **Ponto de Rollback Estável**
```bash
# Versão estável taggeada
git checkout v1.0-stable
npm run deploy:prod
```

### **Rollback via GitHub Actions**
1. Actions → Rollback to Stable → Run workflow

## 💰 **Custos AWS**

| Serviço | Custo Mensal |
|---------|--------------|
| S3 | $1-5 |
| CloudFront | $1-10 |
| Route53 | $0.50 |
| **Total** | **~$3-16** |

## 🛠️ **Tecnologias**

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Deploy**: Serverless Framework
- **CI/CD**: GitHub Actions
- **AWS**: S3, CloudFront, Route53, ACM
- **Monitoramento**: CloudWatch

## 📞 **Suporte**

- **Documentação**: [DEPLOY.md](DEPLOY.md)
- **Issues**: GitHub Issues
- **Rollback**: Automático via pipeline

## 📄 **Licença**

MIT License - Projeto educacional open source.

---

**🎯 Objetivo**: Preparar desenvolvedores para certificação AWS DVA-C02 com experiência prática e simulados reais.
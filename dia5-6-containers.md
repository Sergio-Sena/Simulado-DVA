# DIA 5-6: CONTAINERS + ELASTIC BEANSTALK

## 📋 Objetivo dos Dias 5-6
Dominar **ECS, EKS, Fargate** e **Elastic Beanstalk** para deployment e orquestração de containers.

## 🎯 TEORIA ESSENCIAL

### 1. Amazon ECS (Elastic Container Service)

**Modos de Launch:**
- **EC2 Launch Type**: Você gerencia instâncias EC2
- **Fargate Launch Type**: Serverless, AWS gerencia infraestrutura

**Componentes principais:**
- **Cluster**: Grupo lógico de recursos
- **Task Definition**: Blueprint do container
- **Service**: Mantém número desejado de tasks
- **Task**: Instância em execução da task definition

### 2. Amazon EKS (Elastic Kubernetes Service)

**Conceitos críticos:**
- **Control Plane**: Gerenciado pela AWS
- **Worker Nodes**: EC2 ou Fargate
- **Pod**: Menor unidade deployável
- **Service**: Abstração de rede para pods

### 3. AWS Fargate

**Vantagens:**
- **Serverless**: Sem gerenciamento de EC2
- **Billing**: Por vCPU e memória usados
- **Segurança**: Isolamento por task

### 4. Elastic Beanstalk

**Plataformas suportadas:**
- Java, .NET, PHP, Node.js, Python, Ruby, Go
- Docker (single/multi-container)

**Deployment Options:**
- **All at once**: Downtime, mais rápido
- **Rolling**: Sem downtime, gradual
- **Rolling with additional batch**: Capacidade extra
- **Immutable**: Nova versão completa
- **Blue/Green**: Troca completa de ambiente

## 🛠️ HANDS-ON PRÁTICO

### Exercício 1: ECS com Fargate
```yaml
# task-definition.json
{
  "family": "dva-web-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "web-server",
      "image": "nginx:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/dva-web-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Exercício 2: Elastic Beanstalk com Docker
```dockerfile
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```yaml
# .ebextensions/01-environment.config
option_settings:
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    PORT: 3000
  aws:autoscaling:launchconfiguration:
    InstanceType: t3.micro
  aws:elasticbeanstalk:environment:
    LoadBalancerType: application
```

## 🧠 MINI QUIZ

1. **Qual é a diferença principal entre ECS e EKS?**
   A) ECS usa Docker, EKS usa containerd
   B) ECS é proprietário AWS, EKS é Kubernetes padrão
   C) ECS é mais caro que EKS
   D) Não há diferença significativa

2. **Para zero downtime deployment no Beanstalk:**
   A) All at once
   B) Rolling
   C) Immutable
   D) Blue/Green

3. **Fargate cobra por:**
   A) Número de containers
   B) vCPU e memória utilizados
   C) Tempo de execução apenas
   D) Requests processados

**Respostas:** 1-B, 2-C, 3-B
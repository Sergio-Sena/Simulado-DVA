// Módulos 3-8 com quizzes completos
const modulosRestantes = [
    {
        id: 3,
        title: "Dia 5-6: Containers + Elastic Beanstalk",
        quiz: [
            {
                question: "Qual é a principal diferença entre ECS e EKS?",
                options: ["ECS usa Docker, EKS usa containerd", "ECS é proprietário AWS, EKS é Kubernetes padrão", "ECS é mais caro", "Não há diferença"],
                correct: 1,
                explanation: "ECS é o serviço proprietário da AWS, enquanto EKS roda Kubernetes padrão."
            },
            {
                question: "Fargate cobra por:",
                options: ["Número de containers", "vCPU e memória utilizados", "Tempo de execução apenas", "Requests processados"],
                correct: 1,
                explanation: "Fargate tem billing baseado em vCPU e memória alocados para as tasks."
            },
            {
                question: "Para zero downtime no Elastic Beanstalk:",
                options: ["All at once", "Rolling", "Immutable", "Blue/Green"],
                correct: 2,
                explanation: "Immutable deployment cria nova versão completa antes de trocar, garantindo zero downtime."
            },
            {
                question: "Task Definition define:",
                options: ["Apenas a imagem Docker", "Blueprint completo do container", "Apenas networking", "Apenas recursos"],
                correct: 1,
                explanation: "Task Definition é o blueprint completo: imagem, recursos, networking, volumes, etc."
            },
            {
                question: "ECS Service garante:",
                options: ["Performance", "Número desejado de tasks", "Baixo custo", "Segurança"],
                correct: 1,
                explanation: "ECS Service mantém o número desejado de tasks rodando e as substitui se falharem."
            },
            {
                question: "Para configurações customizadas no Beanstalk:",
                options: [".ebextensions", "Dockerfile", "docker-compose", "CloudFormation"],
                correct: 0,
                explanation: ".ebextensions permite configurações customizadas do ambiente Beanstalk."
            },
            {
                question: "Fargate networking mode:",
                options: ["bridge", "host", "awsvpc", "none"],
                correct: 2,
                explanation: "Fargate usa exclusivamente o modo awsvpc para networking."
            },
            {
                question: "Para otimizar imagem Docker:",
                options: ["Usar Ubuntu base", "Multi-stage build", "Instalar tudo", "Usar root user"],
                correct: 1,
                explanation: "Multi-stage builds reduzem significativamente o tamanho da imagem final."
            },
            {
                question: "EKS Control Plane é:",
                options: ["Gerenciado pelo usuário", "Gerenciado pela AWS", "Opcional", "Gratuito"],
                correct: 1,
                explanation: "AWS gerencia completamente o Control Plane do EKS."
            },
            {
                question: "Health checks no Beanstalk verificam:",
                options: ["CPU apenas", "Memória apenas", "Application health", "Network apenas"],
                correct: 2,
                explanation: "Health checks verificam se a aplicação está respondendo corretamente."
            }
        ]
    },
    {
        id: 4,
        title: "Dia 7: Revisão + Mini Simulado",
        quiz: [
            {
                question: "IAM best practice para aplicações:",
                options: ["Root credentials", "IAM Users", "IAM Roles", "Access Keys"],
                correct: 2,
                explanation: "IAM Roles são a melhor prática para aplicações, evitando credenciais hardcoded."
            },
            {
                question: "Lambda cold start é causado por:",
                options: ["Erro no código", "Primeira execução ou inatividade", "Falta de memória", "Timeout"],
                correct: 1,
                explanation: "Cold start ocorre na primeira execução ou após período de inatividade."
            },
            {
                question: "VPC com alta disponibilidade precisa:",
                options: ["1 AZ", "2 AZs", "Mínimo 2 AZs", "Todas as AZs"],
                correct: 2,
                explanation: "Alta disponibilidade requer recursos distribuídos em pelo menos 2 AZs."
            },
            {
                question: "Container strategy para microservices:",
                options: ["Monolito", "Um serviço por container", "Todos em um container", "Sem containers"],
                correct: 1,
                explanation: "Microservices devem ter um serviço por container para isolamento e escalabilidade."
            },
            {
                question: "Para debugging distribuído:",
                options: ["CloudWatch Logs", "CloudWatch Metrics", "X-Ray", "CloudTrail"],
                correct: 2,
                explanation: "X-Ray oferece tracing distribuído para debug de aplicações complexas."
            },
            {
                question: "Security Group é:",
                options: ["Stateless", "Stateful", "Opcional", "Apenas inbound"],
                correct: 1,
                explanation: "Security Groups são stateful - return traffic é automático."
            },
            {
                question: "API Gateway rate limiting usa:",
                options: ["Lambda", "Usage Plans", "CloudFront", "WAF"],
                correct: 1,
                explanation: "Usage Plans com API Keys implementam rate limiting no API Gateway."
            },
            {
                question: "ECS vs Lambda para long-running tasks:",
                options: ["Lambda sempre", "ECS sempre", "ECS para >15min", "Não importa"],
                correct: 2,
                explanation: "ECS é melhor para tasks >15min devido ao limite de timeout do Lambda."
            },
            {
                question: "Beanstalk deployment com rollback automático:",
                options: ["Rolling", "All at once", "Immutable", "Blue/Green"],
                correct: 3,
                explanation: "Blue/Green permite rollback instantâneo trocando URLs."
            },
            {
                question: "Para cache distribuído:",
                options: ["DynamoDB", "RDS", "ElastiCache", "S3"],
                correct: 2,
                explanation: "ElastiCache (Redis/Memcached) é otimizado para cache distribuído."
            }
        ]
    },
    {
        id: 5,
        title: "Dia 8-9: S3 + Storage + Databases",
        quiz: [
            {
                question: "S3 Standard oferece quantos 9s de durabilidade?",
                options: ["9 noves", "11 noves", "99%", "99.9%"],
                correct: 1,
                explanation: "S3 Standard oferece 99.999999999% (11 noves) de durabilidade."
            },
            {
                question: "Para otimizar custos S3 automaticamente:",
                options: ["Versioning", "Lifecycle policies", "CRR", "Encryption"],
                correct: 1,
                explanation: "Lifecycle policies movem objetos automaticamente para classes mais baratas."
            },
            {
                question: "DynamoDB eventual consistency se aplica a:",
                options: ["Writes", "Strongly consistent reads", "Eventually consistent reads", "Scans"],
                correct: 2,
                explanation: "Eventually consistent reads podem não refletir writes recentes imediatamente."
            },
            {
                question: "RDS Multi-AZ oferece:",
                options: ["Read scaling", "Write scaling", "High availability", "Backup apenas"],
                correct: 2,
                explanation: "Multi-AZ oferece alta disponibilidade com failover automático."
            },
            {
                question: "Para read scaling no RDS:",
                options: ["Multi-AZ", "Read Replicas", "Bigger instance", "Sharding"],
                correct: 1,
                explanation: "Read Replicas distribuem carga de leitura para múltiplas instâncias."
            },
            {
                question: "ElastiCache Redis vs Memcached:",
                options: ["Redis é mais simples", "Memcached tem persistência", "Redis tem mais features", "São idênticos"],
                correct: 2,
                explanation: "Redis oferece persistência, replicação, clustering e pub/sub."
            },
            {
                question: "DynamoDB hot partition é causada por:",
                options: ["Muitos dados", "Partition key mal distribuída", "Falta de GSI", "Pouca memória"],
                correct: 1,
                explanation: "Partition key deve distribuir uniformemente os dados entre partições."
            },
            {
                question: "S3 Cross-Region Replication requer:",
                options: ["Versioning habilitado", "Encryption", "Lifecycle", "Public access"],
                correct: 0,
                explanation: "CRR requer versioning habilitado no bucket source e destination."
            },
            {
                question: "Para backup cross-region automatizado:",
                options: ["Manual snapshots", "AWS Backup", "Scripts customizados", "Não é possível"],
                correct: 1,
                explanation: "AWS Backup oferece backup automatizado cross-region para múltiplos serviços."
            },
            {
                question: "DynamoDB Streams capturam:",
                options: ["Apenas inserts", "Apenas updates", "Apenas deletes", "Todas as mudanças"],
                correct: 3,
                explanation: "DynamoDB Streams capturam todas as mudanças (insert, update, delete)."
            }
        ]
    },
    {
        id: 6,
        title: "Dia 10-11: API Gateway + Integration",
        quiz: [
            {
                question: "API Gateway cache TTL máximo:",
                options: ["300 segundos", "3600 segundos", "86400 segundos", "Unlimited"],
                correct: 1,
                explanation: "API Gateway cache TTL máximo é 3600 segundos (1 hora)."
            },
            {
                question: "SQS FIFO garante:",
                options: ["Alta performance", "Ordem das mensagens", "Baixo custo", "Durabilidade"],
                correct: 1,
                explanation: "SQS FIFO garante ordem das mensagens e exactly-once processing."
            },
            {
                question: "SNS Fan-out pattern permite:",
                options: ["Uma mensagem para um subscriber", "Uma mensagem para múltiplos subscribers", "Múltiplas mensagens para um", "Nenhuma das anteriores"],
                correct: 1,
                explanation: "Fan-out envia uma mensagem para múltiplos subscribers simultaneamente."
            },
            {
                question: "EventBridge é sucessor de:",
                options: ["SNS", "SQS", "CloudWatch Events", "Kinesis"],
                correct: 2,
                explanation: "EventBridge é a evolução do CloudWatch Events com mais funcionalidades."
            },
            {
                question: "Para filtrar mensagens SNS:",
                options: ["Lambda function", "Filter policies", "SQS filter", "Manual processing"],
                correct: 1,
                explanation: "SNS filter policies permitem filtrar mensagens por atributos."
            },
            {
                question: "SQS visibility timeout serve para:",
                options: ["Deletar mensagens", "Evitar processamento duplo", "Ordenar mensagens", "Criptografar"],
                correct: 1,
                explanation: "Visibility timeout esconde mensagem temporariamente para evitar processamento duplo."
            },
            {
                question: "API Gateway REST vs HTTP API:",
                options: ["REST é mais rápido", "HTTP é mais barato", "São idênticos", "REST tem mais features"],
                correct: 1,
                explanation: "HTTP API é mais barato e rápido, REST API tem mais features."
            },
            {
                question: "EventBridge custom event bus permite:",
                options: ["Apenas eventos AWS", "Eventos de aplicação customizada", "Apenas eventos de parceiros", "Nenhum evento"],
                correct: 1,
                explanation: "Custom event bus permite eventos de aplicações customizadas."
            },
            {
                question: "Para throttling por usuário no API Gateway:",
                options: ["Lambda Authorizer", "Usage Plans + API Keys", "WAF", "CloudFront"],
                correct: 1,
                explanation: "Usage Plans com API Keys implementam throttling granular por usuário."
            },
            {
                question: "SQS Dead Letter Queue é usado para:",
                options: ["Performance", "Mensagens que falharam múltiplas vezes", "Ordenação", "Backup"],
                correct: 1,
                explanation: "DLQ recebe mensagens que falharam após esgotar tentativas de retry."
            }
        ]
    },
    {
        id: 7,
        title: "Dia 12-13: CI/CD + Monitoring + Security",
        quiz: [
            {
                question: "CodePipeline stages executam:",
                options: ["Paralelo sempre", "Sequencial sempre", "Sequencial por padrão", "Aleatório"],
                correct: 2,
                explanation: "Stages executam sequencialmente, mas actions dentro de um stage podem ser paralelas."
            },
            {
                question: "CloudWatch custom metrics usam:",
                options: ["PutMetricData API", "Logs automaticamente", "X-Ray", "CloudTrail"],
                correct: 0,
                explanation: "PutMetricData API é usado para enviar métricas customizadas."
            },
            {
                question: "X-Ray segments representam:",
                options: ["Erros", "Chamadas de serviço", "Logs", "Métricas"],
                correct: 1,
                explanation: "Segments representam chamadas para serviços AWS, APIs ou databases."
            },
            {
                question: "Para rollback automático no CodeDeploy:",
                options: ["Manual apenas", "CloudWatch Alarms", "Não é possível", "Sempre automático"],
                correct: 1,
                explanation: "CloudWatch Alarms podem triggerar rollback automático no CodeDeploy."
            },
            {
                question: "IAM policy condition por IP:",
                options: ["IpAddress", "SourceIp", "aws:SourceIp", "ClientIp"],
                correct: 2,
                explanation: "aws:SourceIp é a condition key para restringir por endereço IP."
            },
            {
                question: "CodeBuild executa em:",
                options: ["EC2 instances", "Lambda", "Docker containers", "ECS"],
                correct: 2,
                explanation: "CodeBuild executa builds em containers Docker gerenciados."
            },
            {
                question: "Para deployment canary no Lambda:",
                options: ["Manual", "CodeDeploy", "CloudFormation", "SAM"],
                correct: 1,
                explanation: "CodeDeploy oferece deployment canary automático para Lambda."
            },
            {
                question: "X-Ray annotations vs metadata:",
                options: ["Annotations são indexadas", "Metadata são indexadas", "São idênticos", "Não há diferença"],
                correct: 0,
                explanation: "Annotations são indexadas e podem ser usadas para filtros e busca."
            },
            {
                question: "CloudWatch Logs retention máximo:",
                options: ["1 ano", "5 anos", "10 anos", "Indefinido"],
                correct: 3,
                explanation: "CloudWatch Logs podem ter retenção indefinida (never expire)."
            },
            {
                question: "Para secrets rotation automática:",
                options: ["Parameter Store", "Secrets Manager", "IAM", "KMS"],
                correct: 1,
                explanation: "Secrets Manager oferece rotação automática de secrets."
            }
        ]
    },
    {
        id: 8,
        title: "Dia 14: Simulado Final + Revisão Intensiva",
        quiz: [
            {
                question: "DVA-C02 tem quantas questões?",
                options: ["50", "65", "75", "100"],
                correct: 1,
                explanation: "O exame DVA-C02 tem 65 questões de múltipla escolha."
            },
            {
                question: "Tempo do exame DVA-C02:",
                options: ["90 minutos", "130 minutos", "180 minutos", "120 minutos"],
                correct: 1,
                explanation: "O exame tem duração de 130 minutos (2 horas e 10 minutos)."
            },
            {
                question: "Pontuação mínima para passar:",
                options: ["65%", "70%", "72%", "75%"],
                correct: 2,
                explanation: "A pontuação mínima é 720 de 1000 pontos (72%)."
            },
            {
                question: "Domínio com maior peso no exame:",
                options: ["Security", "Development", "Deployment", "Troubleshooting"],
                correct: 1,
                explanation: "Development with AWS Services tem 32% do peso do exame."
            },
            {
                question: "Para gerenciar tempo na prova:",
                options: ["2 min por questão", "1.5 min por questão", "3 min por questão", "Sem limite"],
                correct: 1,
                explanation: "Aproximadamente 1.5-2 minutos por questão é ideal para completar no tempo."
            },
            {
                question: "Estratégia para questões difíceis:",
                options: ["Pular e voltar depois", "Gastar muito tempo", "Chutar imediatamente", "Desistir"],
                correct: 0,
                explanation: "Marque questões difíceis e volte depois para otimizar o tempo."
            },
            {
                question: "Lambda timeout máximo (revisão):",
                options: ["5 min", "10 min", "15 min", "30 min"],
                correct: 2,
                explanation: "Lambda tem timeout máximo de 15 minutos."
            },
            {
                question: "S3 durabilidade (revisão):",
                options: ["99.9%", "99.99%", "99.999999999%", "100%"],
                correct: 2,
                explanation: "S3 oferece 99.999999999% (11 noves) de durabilidade."
            },
            {
                question: "DynamoDB consistency padrão:",
                options: ["Strong", "Eventual", "Immediate", "Delayed"],
                correct: 1,
                explanation: "DynamoDB usa eventual consistency por padrão para reads."
            },
            {
                question: "Melhor prática para credenciais AWS:",
                options: ["Hardcode no código", "Environment variables", "IAM Roles", "Config files"],
                correct: 2,
                explanation: "IAM Roles são a melhor prática para evitar credenciais hardcoded."
            }
        ]
    }
];

// Função para adicionar os módulos restantes ao courseData
function adicionarModulosCompletos() {
    // Esta função seria chamada para adicionar os módulos 3-8 ao courseData principal
    return modulosRestantes;
}
// Banco de 200 questões DVA-C02 distribuídas por domínio
const bancoQuestoes = {
    // DOMÍNIO 1: DEVELOPMENT (32% - 64 questões)
    development: [
        {
            question: "Uma aplicação Lambda precisa processar arquivos de 50MB. Qual é a melhor abordagem?",
            options: ["Aumentar memory para 10GB", "Usar Step Functions com múltiplas Lambdas", "Processar diretamente", "Usar ECS Fargate"],
            correct: 3,
            explanation: "Para arquivos grandes >6MB, ECS Fargate é melhor que Lambda devido aos limites de payload."
        },
        {
            question: "Qual é o timeout máximo para AWS Lambda?",
            options: ["5 minutos", "10 minutos", "15 minutos", "30 minutos"],
            correct: 2,
            explanation: "Lambda tem timeout máximo de 15 minutos."
        },
        {
            question: "Para eliminar cold starts no Lambda:",
            options: ["Aumentar memory", "Provisioned Concurrency", "Usar containers", "Reduzir código"],
            correct: 1,
            explanation: "Provisioned Concurrency mantém funções warm eliminando cold starts."
        },
        {
            question: "DynamoDB eventual consistency se aplica a:",
            options: ["Writes", "Strongly consistent reads", "Eventually consistent reads", "Scans"],
            correct: 2,
            explanation: "Eventually consistent reads podem não refletir writes recentes imediatamente."
        },
        {
            question: "Para otimizar custos no S3 automaticamente:",
            options: ["Versioning", "Lifecycle policies", "CRR", "Encryption"],
            correct: 1,
            explanation: "Lifecycle policies movem objetos automaticamente para classes mais baratas."
        },
        {
            question: "API Gateway payload máximo síncrono:",
            options: ["1MB", "6MB", "10MB", "256KB"],
            correct: 1,
            explanation: "API Gateway suporta até 6MB de payload para requests síncronos."
        },
        {
            question: "Step Functions Parallel state permite:",
            options: ["Execução sequencial", "Execução paralela", "Loops", "Condições"],
            correct: 1,
            explanation: "Parallel state executa múltiplos branches simultaneamente."
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
            question: "Lambda concurrent executions padrão:",
            options: ["100", "500", "1000", "Unlimited"],
            correct: 2,
            explanation: "Limite padrão é 1000 concurrent executions por região."
        },
        {
            question: "Para cache distribuído:",
            options: ["DynamoDB", "RDS", "ElastiCache", "S3"],
            correct: 2,
            explanation: "ElastiCache (Redis/Memcached) é otimizado para cache distribuído."
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
            question: "API Gateway cache TTL máximo:",
            options: ["300 segundos", "3600 segundos", "86400 segundos", "Unlimited"],
            correct: 1,
            explanation: "API Gateway cache TTL máximo é 3600 segundos (1 hora)."
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
            question: "Lambda Authorizer deve retornar:",
            options: ["Boolean", "Policy IAM", "Token", "User ID"],
            correct: 1,
            explanation: "Lambda Authorizer deve retornar uma policy IAM válida."
        }
    ],
    
    // DOMÍNIO 2: SECURITY (26% - 52 questões)
    security: [
        {
            question: "Em uma política IAM, se houver Allow e Deny para a mesma ação:",
            options: ["Allow prevalece", "Deny prevalece", "Erro de política", "Depende da ordem"],
            correct: 1,
            explanation: "Explicit Deny sempre prevalece sobre Allow em políticas IAM."
        },
        {
            question: "Para permitir que uma aplicação EC2 acesse S3 sem hardcoded credentials:",
            options: ["Usar Access Keys no código", "IAM Role anexada à instância", "Credentials no User Data", "AWS Secrets Manager"],
            correct: 1,
            explanation: "IAM Roles anexadas à instância EC2 são a melhor prática para acesso seguro aos serviços AWS."
        },
        {
            question: "Cross-account access é melhor implementado com:",
            options: ["Shared credentials", "AssumeRole", "Root access", "API Keys"],
            correct: 1,
            explanation: "AssumeRole é a melhor prática para acesso cross-account seguro."
        },
        {
            question: "IAM policy condition por IP:",
            options: ["IpAddress", "SourceIp", "aws:SourceIp", "ClientIp"],
            correct: 2,
            explanation: "aws:SourceIp é a condition key para restringir por endereço IP."
        },
        {
            question: "Para secrets rotation automática:",
            options: ["Parameter Store", "Secrets Manager", "IAM", "KMS"],
            correct: 1,
            explanation: "Secrets Manager oferece rotação automática de secrets."
        },
        {
            question: "KMS Customer Managed Keys permitem:",
            options: ["Apenas encryption", "Key rotation automática", "Controle total sobre políticas", "Apenas decryption"],
            correct: 2,
            explanation: "Customer Managed Keys oferecem controle total sobre políticas e rotação."
        },
        {
            question: "Para auditoria de API calls:",
            options: ["CloudWatch", "CloudTrail", "X-Ray", "Config"],
            correct: 1,
            explanation: "CloudTrail registra todas as chamadas de API para auditoria."
        },
        {
            question: "Cognito User Pools vs Identity Pools:",
            options: ["User Pools para autenticação", "Identity Pools para autenticação", "São idênticos", "User Pools para autorização"],
            correct: 0,
            explanation: "User Pools fazem autenticação, Identity Pools fazem autorização (acesso AWS)."
        },
        {
            question: "Para criptografia em trânsito no RDS:",
            options: ["KMS", "SSL/TLS", "IAM", "VPC"],
            correct: 1,
            explanation: "SSL/TLS é usado para criptografia em trânsito no RDS."
        },
        {
            question: "WAF pode bloquear baseado em:",
            options: ["IP address", "SQL injection patterns", "Request size", "Todas as anteriores"],
            correct: 3,
            explanation: "WAF pode bloquear baseado em IP, padrões maliciosos, tamanho de request, etc."
        },
        {
            question: "Para controle de acesso granular no S3:",
            options: ["Bucket policies", "ACLs", "IAM policies", "Todas as anteriores"],
            correct: 3,
            explanation: "S3 suporta múltiplas camadas de controle de acesso."
        },
        {
            question: "VPC Security Groups são:",
            options: ["Stateless", "Stateful", "Opcionais", "Apenas outbound"],
            correct: 1,
            explanation: "Security Groups são stateful - return traffic é automático."
        },
        {
            question: "Para compliance PCI DSS:",
            options: ["Qualquer instância", "Dedicated instances", "Shared tenancy", "Spot instances"],
            correct: 1,
            explanation: "Compliance PCI DSS pode requerer dedicated instances para isolamento."
        }
    ],
    
    // DOMÍNIO 3: DEPLOYMENT (24% - 48 questões)
    deployment: [
        {
            question: "Para deployment Blue/Green no Elastic Beanstalk:",
            options: ["Rolling deployment", "Immutable deployment", "Swap environment URLs", "All at once deployment"],
            correct: 2,
            explanation: "Blue/Green no Beanstalk é feito através do swap de environment URLs."
        },
        {
            question: "CodePipeline stages executam:",
            options: ["Paralelo sempre", "Sequencial sempre", "Sequencial por padrão", "Aleatório"],
            correct: 2,
            explanation: "Stages executam sequencialmente, mas actions dentro de um stage podem ser paralelas."
        },
        {
            question: "CodeBuild executa em:",
            options: ["EC2 instances", "Lambda", "Docker containers", "ECS"],
            correct: 2,
            explanation: "CodeBuild executa builds em containers Docker gerenciados."
        },
        {
            question: "Para rollback automático no CodeDeploy:",
            options: ["Manual apenas", "CloudWatch Alarms", "Não é possível", "Sempre automático"],
            correct: 1,
            explanation: "CloudWatch Alarms podem triggerar rollback automático no CodeDeploy."
        },
        {
            question: "SAM é baseado em:",
            options: ["Terraform", "CloudFormation", "Ansible", "Kubernetes"],
            correct: 1,
            explanation: "SAM é uma extensão do CloudFormation para aplicações serverless."
        },
        {
            question: "Para deployment canary no Lambda:",
            options: ["Manual", "CodeDeploy", "CloudFormation", "SAM"],
            correct: 1,
            explanation: "CodeDeploy oferece deployment canary automático para Lambda."
        },
        {
            question: "CloudFormation stack updates podem ser:",
            options: ["Direct update apenas", "Change sets apenas", "Ambos", "Nenhum"],
            correct: 2,
            explanation: "CloudFormation suporta direct updates e change sets para preview."
        },
        {
            question: "Para zero downtime deployment:",
            options: ["All at once", "Rolling", "Blue/Green", "Canary"],
            correct: 2,
            explanation: "Blue/Green deployment garante zero downtime trocando ambientes."
        },
        {
            question: "Elastic Beanstalk .ebextensions permite:",
            options: ["Apenas configuração de instâncias", "Configuração completa do ambiente", "Apenas networking", "Apenas security"],
            correct: 1,
            explanation: ".ebextensions permite configuração completa do ambiente Beanstalk."
        },
        {
            question: "Para versionamento de APIs:",
            options: ["Query parameters", "Headers", "Path parameters", "Todas as anteriores"],
            correct: 3,
            explanation: "API Gateway suporta versionamento via query, headers ou path."
        },
        {
            question: "CodeCommit é baseado em:",
            options: ["SVN", "Git", "Mercurial", "Perforce"],
            correct: 1,
            explanation: "CodeCommit é um serviço Git gerenciado pela AWS."
        },
        {
            question: "Para deployment multi-region:",
            options: ["Manual em cada região", "CodePipeline cross-region", "Não é possível", "Apenas CloudFormation"],
            correct: 1,
            explanation: "CodePipeline suporta deployment cross-region automatizado."
        }
    ],
    
    // DOMÍNIO 4: TROUBLESHOOTING (18% - 36 questões)
    troubleshooting: [
        {
            question: "Para debug de performance em aplicação distribuída:",
            options: ["CloudWatch Logs", "CloudWatch Metrics", "AWS X-Ray", "VPC Flow Logs"],
            correct: 2,
            explanation: "X-Ray oferece tracing distribuído para debug de aplicações complexas."
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
            question: "Para monitorar Lambda throttling:",
            options: ["Duration metric", "Errors metric", "Throttles metric", "Invocations metric"],
            correct: 2,
            explanation: "Throttles metric indica quando Lambda functions estão sendo throttled."
        },
        {
            question: "CloudWatch Logs retention máximo:",
            options: ["1 ano", "5 anos", "10 anos", "Indefinido"],
            correct: 3,
            explanation: "CloudWatch Logs podem ter retenção indefinida (never expire)."
        },
        {
            question: "Para troubleshooting de conectividade VPC:",
            options: ["CloudTrail", "VPC Flow Logs", "CloudWatch", "X-Ray"],
            correct: 1,
            explanation: "VPC Flow Logs capturam informações sobre tráfego de rede na VPC."
        },
        {
            question: "X-Ray annotations vs metadata:",
            options: ["Annotations são indexadas", "Metadata são indexadas", "São idênticos", "Não há diferença"],
            correct: 0,
            explanation: "Annotations são indexadas e podem ser usadas para filtros e busca."
        },
        {
            question: "Para debug de API Gateway:",
            options: ["CloudWatch Logs", "X-Ray tracing", "Access logs", "Todas as anteriores"],
            correct: 3,
            explanation: "API Gateway oferece múltiplas opções de logging e tracing."
        },
        {
            question: "CloudWatch Alarms podem triggerar:",
            options: ["SNS notifications", "Auto Scaling actions", "EC2 actions", "Todas as anteriores"],
            correct: 3,
            explanation: "CloudWatch Alarms podem triggerar múltiplas ações automatizadas."
        }
    ]
};

// Função para gerar simulado com distribuição correta
function gerarSimulado(nivel = 'intermediario', numQuestoes = 65) {
    const distribuicao = {
        development: Math.round(numQuestoes * 0.32), // 32%
        security: Math.round(numQuestoes * 0.26),    // 26%
        deployment: Math.round(numQuestoes * 0.24),  // 24%
        troubleshooting: Math.round(numQuestoes * 0.18) // 18%
    };
    
    let questoes = [];
    
    // Selecionar questões de cada domínio
    Object.keys(distribuicao).forEach(dominio => {
        const questoesDominio = bancoQuestoes[dominio];
        const quantidade = distribuicao[dominio];
        
        // Embaralhar e selecionar
        const selecionadas = questoesDominio
            .sort(() => Math.random() - 0.5)
            .slice(0, quantidade);
            
        questoes = questoes.concat(selecionadas);
    });
    
    // Embaralhar questões finais
    return questoes.sort(() => Math.random() - 0.5);
}

// Mini simulados específicos
const miniSimulados = {
    semana1: [
        {
            question: "Qual é o número mínimo de AZs por região AWS?",
            options: ["2", "3", "4", "5"],
            correct: 1,
            explanation: "Cada região AWS tem no mínimo 3 Availability Zones."
        },
        {
            question: "Lambda timeout máximo:",
            options: ["5 min", "10 min", "15 min", "30 min"],
            correct: 2,
            explanation: "Lambda tem timeout máximo de 15 minutos."
        },
        {
            question: "ECS vs EKS principal diferença:",
            options: ["Preço", "ECS é AWS native, EKS é Kubernetes", "Performance", "Região"],
            correct: 1,
            explanation: "ECS é proprietário AWS, EKS roda Kubernetes padrão."
        }
        // ... mais 22 questões
    ],
    
    semana2: [
        {
            question: "S3 durabilidade:",
            options: ["99.9%", "99.99%", "99.999999999%", "100%"],
            correct: 2,
            explanation: "S3 oferece 99.999999999% (11 noves) de durabilidade."
        },
        {
            question: "Para CI/CD completo:",
            options: ["CodeCommit apenas", "CodePipeline", "CodeBuild apenas", "Manual"],
            correct: 1,
            explanation: "CodePipeline orquestra todo o pipeline CI/CD."
        }
        // ... mais 23 questões
    ]
};
// Dados do curso completo - 14 dias com cards detalhados
const courseData = {
    modules: [
        {
            id: 1,
            title: "Dia 1-2: AWS Core + EC2 Deep Dive",
            description: "Fundamentos AWS, IAM avançado, VPC networking, EC2 otimização",
            duration: "2 dias",
            progress: 0,
            topics: [
                {
                    name: "Global Infrastructure",
                    description: "Regiões, AZs, Edge Locations e como escolher a região ideal",
                    keyPoints: ["Mínimo 3 AZs por região", "400+ Edge Locations", "Latência < 50ms", "Compliance regional"],
                    example: "Para uma aplicação global, usar múltiplas regiões com CloudFront"
                },
                {
                    name: "IAM Policies Avançadas",
                    description: "Políticas complexas, cross-account access, conditions",
                    keyPoints: ["Explicit Deny > Allow", "Resource vs Identity policies", "Conditions avançadas", "AssumeRole pattern"],
                    example: "Policy com condition por IP e horário de acesso"
                },
                {
                    name: "VPC Networking",
                    description: "Route tables, Security Groups vs NACLs, NAT Gateway",
                    keyPoints: ["Longest prefix match", "Stateful vs Stateless", "Multi-AZ NAT", "VPC Peering"],
                    example: "VPC com subnets públicas/privadas em múltiplas AZs"
                },
                {
                    name: "EC2 Storage (EBS)",
                    description: "Tipos de EBS, performance, snapshots, encryption",
                    keyPoints: ["gp3 vs io2", "IOPS vs Throughput", "EBS-optimized", "Encryption at rest"],
                    example: "Volume gp3 com 10,000 IOPS para database"
                },
                {
                    name: "Security Groups vs NACLs",
                    description: "Diferenças, casos de uso, troubleshooting",
                    keyPoints: ["Stateful vs Stateless", "Allow vs Deny rules", "Instance vs Subnet level", "Return traffic"],
                    example: "NACL bloqueando tráfego malicioso + SG permitindo aplicação"
                }
            ]
        },
        {
            id: 2,
            title: "Dia 3-4: Lambda + Serverless Architecture",
            description: "Lambda avançado, API Gateway, Step Functions, event-driven patterns",
            duration: "2 dias",
            progress: 0,
            topics: [
                {
                    name: "Lambda Lifecycle",
                    description: "Cold starts, warm containers, execution model",
                    keyPoints: ["Init → Invoke → Shutdown", "15min timeout máximo", "10GB memory máximo", "Provisioned Concurrency"],
                    example: "Function com Provisioned Concurrency para eliminar cold starts"
                },
                {
                    name: "Event Sources",
                    description: "Sync vs Async vs Stream-based triggers",
                    keyPoints: ["API Gateway (sync)", "S3 Events (async)", "DynamoDB Streams", "Error handling patterns"],
                    example: "S3 trigger → Lambda → DynamoDB com DLQ para falhas"
                },
                {
                    name: "API Gateway Auth",
                    description: "Lambda Authorizer, Cognito, IAM, API Keys",
                    keyPoints: ["JWT validation", "Policy generation", "Context passing", "Caching strategies"],
                    example: "Lambda Authorizer validando JWT com cache de 5 minutos"
                },
                {
                    name: "Step Functions",
                    description: "Workflow orchestration, state types, error handling",
                    keyPoints: ["Task, Choice, Parallel states", "Retry/Catch patterns", "Express vs Standard", "ASL syntax"],
                    example: "Order processing workflow com parallel payment e inventory"
                },
                {
                    name: "SAM Deployment",
                    description: "Infrastructure as Code, deployment strategies",
                    keyPoints: ["SAM templates", "CodeDeploy integration", "Canary deployments", "Environment variables"],
                    example: "SAM template com API Gateway + Lambda + DynamoDB"
                }
            ]
        },
        {
            id: 3,
            title: "Dia 5-6: Containers + Elastic Beanstalk",
            description: "ECS, EKS, Fargate deployment strategies, Beanstalk configurations",
            duration: "2 dias",
            progress: 0,
            topics: [
                {
                    name: "ECS vs EKS",
                    description: "Diferenças entre ECS proprietário e EKS Kubernetes",
                    keyPoints: ["ECS: AWS native", "EKS: Kubernetes padrão", "Control plane gerenciado", "Worker nodes EC2/Fargate"],
                    example: "ECS para simplicidade, EKS para portabilidade Kubernetes"
                },
                {
                    name: "Fargate Serverless",
                    description: "Containers sem gerenciar infraestrutura",
                    keyPoints: ["Serverless containers", "vCPU + Memory billing", "Isolamento por task", "Networking awsvpc"],
                    example: "Task Fargate com 0.5 vCPU e 1GB RAM para microservice"
                },
                {
                    name: "Task Definitions",
                    description: "Blueprint dos containers, networking, resources",
                    keyPoints: ["Container definitions", "CPU/Memory allocation", "Port mappings", "Environment variables"],
                    example: "Task definition com nginx + sidecar logging container"
                },
                {
                    name: "Beanstalk Deployment",
                    description: "Estratégias de deployment, configurações",
                    keyPoints: ["Rolling vs Immutable", "Blue/Green deployment", ".ebextensions", "Health monitoring"],
                    example: "Deployment Blue/Green com health checks automáticos"
                },
                {
                    name: "Docker Optimization",
                    description: "Multi-stage builds, image size, security",
                    keyPoints: ["Multi-stage Dockerfile", "Alpine base images", "Layer caching", "Security scanning"],
                    example: "Dockerfile multi-stage reduzindo imagem de 1GB para 100MB"
                }
            ]
        },
        {
            id: 4,
            title: "Dia 7: Revisão + Mini Simulado",
            description: "Consolidação Semana 1, simulado 25 questões, análise performance",
            duration: "1 dia",
            progress: 0,
            topics: [
                {
                    name: "Revisão Conceitos",
                    description: "Consolidação dos conceitos da Semana 1",
                    keyPoints: ["IAM best practices", "Lambda patterns", "VPC networking", "Container strategies"],
                    example: "Checklist de conceitos críticos para DVA-C02"
                },
                {
                    name: "Mini Simulado",
                    description: "25 questões cobrindo Semana 1",
                    keyPoints: ["Formato real da prova", "Timing 1.5min/questão", "Análise de performance", "Identificação gaps"],
                    example: "Simulado com questões de EC2, Lambda, ECS e VPC"
                },
                {
                    name: "Análise Gaps",
                    description: "Identificação de pontos fracos para reforço",
                    keyPoints: ["Performance por domínio", "Conceitos a revisar", "Priorização estudos", "Plano correção"],
                    example: "Se <70% em Lambda, revisar event sources e error handling"
                },
                {
                    name: "Preparação Semana 2",
                    description: "Overview dos tópicos da segunda semana",
                    keyPoints: ["Storage services", "Database patterns", "Integration services", "DevOps practices"],
                    example: "Roadmap S3 → DynamoDB → API Gateway → CI/CD"
                }
            ]
        },
        {
            id: 5,
            title: "Dia 8-9: S3 + Storage + Databases",
            description: "S3 avançado, RDS, DynamoDB, ElastiCache, storage optimization",
            duration: "2 dias",
            progress: 0,
            topics: [
                {
                    name: "S3 Storage Classes",
                    description: "Otimização de custos com classes de armazenamento",
                    keyPoints: ["Standard vs IA vs Glacier", "Lifecycle policies", "Cross-Region Replication", "Versioning strategies"],
                    example: "Lifecycle: Standard → IA (30d) → Glacier (90d) → Deep Archive (365d)"
                },
                {
                    name: "DynamoDB Design",
                    description: "Partition key design, GSI/LSI, capacity planning",
                    keyPoints: ["Hot partitions", "GSI vs LSI", "Provisioned vs On-Demand", "DynamoDB Streams"],
                    example: "User table com GSI por email e LSI por created_date"
                },
                {
                    name: "RDS Multi-AZ",
                    description: "Alta disponibilidade, read replicas, backup strategies",
                    keyPoints: ["Multi-AZ vs Read Replicas", "Automated backups", "Point-in-time recovery", "Cross-region replicas"],
                    example: "RDS MySQL Multi-AZ com 3 read replicas para scale de leitura"
                },
                {
                    name: "ElastiCache Redis",
                    description: "Caching strategies, Redis vs Memcached",
                    keyPoints: ["Redis clustering", "Persistence options", "Pub/Sub patterns", "Session storage"],
                    example: "Redis cluster para cache de sessões web distribuído"
                },
                {
                    name: "Backup Strategies",
                    description: "Cross-service backup, disaster recovery",
                    keyPoints: ["AWS Backup service", "Cross-region backups", "RTO/RPO planning", "Automated testing"],
                    example: "Backup diário S3 + RDS com retenção 30 dias"
                }
            ]
        },
        {
            id: 6,
            title: "Dia 10-11: API Gateway + Integration",
            description: "API Gateway avançado, SQS, SNS, EventBridge, integration patterns",
            duration: "2 dias",
            progress: 0,
            topics: [
                {
                    name: "API Caching",
                    description: "Performance optimization, cache strategies",
                    keyPoints: ["TTL configuration", "Cache keys", "Cache invalidation", "Cost optimization"],
                    example: "Cache de 300s para GET /users/{id} com invalidação manual"
                },
                {
                    name: "SQS FIFO",
                    description: "Ordered message processing, deduplication",
                    keyPoints: ["Message ordering", "Deduplication ID", "Message groups", "Throughput limits"],
                    example: "FIFO queue para processamento sequencial de pedidos"
                },
                {
                    name: "SNS Fan-out",
                    description: "Publish-subscribe patterns, message distribution",
                    keyPoints: ["Topic subscriptions", "Message filtering", "Dead letter queues", "Cross-region delivery"],
                    example: "SNS topic → 3 SQS queues (email, SMS, push notifications)"
                },
                {
                    name: "EventBridge Rules",
                    description: "Event-driven architecture, custom events",
                    keyPoints: ["Event patterns", "Custom event bus", "Partner integrations", "Rule targets"],
                    example: "EventBridge rule: order-placed → Lambda + SQS + SNS"
                },
                {
                    name: "Message Filtering",
                    description: "Selective message processing, cost optimization",
                    keyPoints: ["SNS filter policies", "EventBridge patterns", "Attribute-based routing", "Conditional processing"],
                    example: "Filter: apenas pedidos > $100 para processamento VIP"
                }
            ]
        },
        {
            id: 7,
            title: "Dia 12-13: CI/CD + Monitoring + Security",
            description: "CodePipeline, CloudWatch, X-Ray, security best practices",
            duration: "2 dias",
            progress: 0,
            topics: [
                {
                    name: "CodePipeline",
                    description: "End-to-end CI/CD automation",
                    keyPoints: ["Source → Build → Deploy", "Approval actions", "Parallel stages", "Rollback strategies"],
                    example: "Pipeline: CodeCommit → CodeBuild → CodeDeploy com approval manual"
                },
                {
                    name: "CloudWatch Custom Metrics",
                    description: "Application monitoring, custom dashboards",
                    keyPoints: ["PutMetricData API", "Custom namespaces", "Dimensions", "Alarm thresholds"],
                    example: "Métrica customizada: orders_processed_per_minute com alarm"
                },
                {
                    name: "X-Ray Tracing",
                    description: "Distributed tracing, performance analysis",
                    keyPoints: ["Traces e segments", "Annotations vs Metadata", "Service map", "Performance insights"],
                    example: "Trace: API Gateway → Lambda → DynamoDB com latency analysis"
                },
                {
                    name: "Security Policies",
                    description: "IAM best practices, least privilege",
                    keyPoints: ["Resource-based policies", "Cross-account access", "Temporary credentials", "Policy conditions"],
                    example: "Policy: acesso S3 apenas de VPC específica e horário comercial"
                },
                {
                    name: "Deployment Strategies",
                    description: "Blue/Green, Canary, Rolling deployments",
                    keyPoints: ["Zero-downtime deployment", "Rollback automation", "Health checks", "Traffic shifting"],
                    example: "Canary deployment: 10% → 50% → 100% com rollback automático"
                }
            ]
        },
        {
            id: 8,
            title: "Dia 14: Simulado Final + Revisão Intensiva",
            description: "Simulado 65 questões formato real, revisão final, plano últimos 3 dias",
            duration: "1 dia",
            progress: 0,
            topics: [
                {
                    name: "Simulado Completo",
                    description: "65 questões no formato real DVA-C02",
                    keyPoints: ["4 domínios da prova", "130 minutos", "Formato múltipla escolha", "Cenários reais"],
                    example: "Simulado com distribuição: 32% Development, 26% Security, 24% Deployment, 18% Troubleshooting"
                },
                {
                    name: "Análise Performance",
                    description: "Avaliação detalhada por domínio",
                    keyPoints: ["Score por domínio", "Identificação gaps", "Pontos fortes/fracos", "Plano correção"],
                    example: "Se <70% em Security, focar IAM policies e encryption"
                },
                {
                    name: "Revisão Final",
                    description: "Conceitos críticos, limites, best practices",
                    keyPoints: ["Service limits", "Pricing models", "Architecture patterns", "Troubleshooting guides"],
                    example: "Checklist: Lambda 15min, DynamoDB eventual consistency, S3 11 9's"
                },
                {
                    name: "Estratégias Prova",
                    description: "Técnicas para maximizar performance na prova",
                    keyPoints: ["Time management", "Question analysis", "Elimination techniques", "Confidence building"],
                    example: "1.5min por questão, ler palavras-chave, eliminar opções óbvias"
                }
            ]
        }
    ],
    
    quizzes: [
        {
            day: 1,
            questions: [
                {
                    question: "Qual é o limite padrão de instâncias EC2 por região?",
                    options: ["10", "20", "50", "100"],
                    correct: 1,
                    explanation: "O limite padrão é 20 instâncias por região, mas pode ser aumentado via Service Quotas."
                }
            ]
        }
    ]
};

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    loadModules();
    setupNavigation();
    setupProgressTracking();
});

// Carregar módulos dinamicamente
function loadModules() {
    const modulesGrid = document.getElementById('modulesGrid');
    
    courseData.modules.forEach(module => {
        const moduleCard = createModuleCard(module);
        modulesGrid.appendChild(moduleCard);
    });
}

// Criar card do módulo
function createModuleCard(module) {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
        <h4>${module.title}</h4>
        <p>${module.description}</p>
        <div class="module-progress">
            <div class="progress-bar" style="width: ${module.progress}%"></div>
        </div>
        <div class="module-info">
            <span><i class="fas fa-clock"></i> ${module.duration}</span>
            <span><i class="fas fa-list"></i> ${module.topics.length} tópicos</span>
        </div>
        <button class="btn-primary" onclick="startModule(${module.id})">
            ${module.progress > 0 ? 'Continuar' : 'Iniciar'} Módulo
        </button>
    `;
    return card;
}

// Navegação suave
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sistema de progresso
function setupProgressTracking() {
    const savedProgress = localStorage.getItem('dva-c02-progress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        updateProgressDisplay(progress);
    }
}

// Iniciar módulo
function startModule(moduleId) {
    const module = courseData.modules.find(m => m.id === moduleId);
    if (module) {
        showModuleContent(module);
    }
}

// Mostrar conteúdo do módulo com cards detalhados
function showModuleContent(module) {
    const modal = document.createElement('div');
    modal.className = 'module-modal';
    
    const topicsHtml = module.topics.map(topic => {
        return `
            <div class="topic-card">
                <div class="topic-header">
                    <h5>${topic.name}</h5>
                    <span class="topic-toggle">+</span>
                </div>
                <div class="topic-content" style="display: none;">
                    <p class="topic-description">${topic.description}</p>
                    <div class="key-points">
                        <h6>Pontos-chave:</h6>
                        <ul>
                            ${topic.keyPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="topic-example">
                        <h6>Exemplo prático:</h6>
                        <p><em>${topic.example}</em></p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${module.title}</h3>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <h4>Tópicos do Módulo:</h4>
                <div class="topics-container">
                    ${topicsHtml}
                </div>
                <div class="module-actions">
                    <button class="btn-primary" onclick="startLearning(${module.id})">
                        Começar Aprendizado
                    </button>
                    <button class="btn-secondary" onclick="takeQuiz(${module.id})">
                        Fazer Quiz
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Adicionar event listeners para toggle dos tópicos
    modal.querySelectorAll('.topic-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const toggle = this.querySelector('.topic-toggle');
            
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggle.textContent = '-';
                this.parentElement.classList.add('expanded');
            } else {
                content.style.display = 'none';
                toggle.textContent = '+';
                this.parentElement.classList.remove('expanded');
            }
        });
    });
}

// Fechar modal
function closeModal() {
    const modal = document.querySelector('.module-modal');
    if (modal) {
        modal.remove();
    }
}

// Iniciar aprendizado
function startLearning(moduleId) {
    alert(`Iniciando aprendizado detalhado do módulo ${moduleId}. Aqui você teria acesso ao conteúdo completo, exercícios práticos e laboratórios hands-on.`);
    closeModal();
}

// Fazer quiz
function takeQuiz(moduleId) {
    alert(`Iniciando quiz do módulo ${moduleId}. Aqui você teria questões específicas sobre os tópicos estudados.`);
    closeModal();
}

// Atualizar progresso
function updateProgress(moduleId, progress) {
    const savedProgress = JSON.parse(localStorage.getItem('dva-c02-progress') || '{}');
    savedProgress[moduleId] = progress;
    localStorage.setItem('dva-c02-progress', JSON.stringify(savedProgress));
    
    updateProgressDisplay(savedProgress);
}

// Atualizar display do progresso
function updateProgressDisplay(progress) {
    Object.keys(progress).forEach(moduleId => {
        const progressBar = document.querySelector(`[data-module="${moduleId}"] .progress-bar`);
        if (progressBar) {
            progressBar.style.width = `${progress[moduleId]}%`;
        }
    });
}
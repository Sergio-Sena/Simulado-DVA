// Dados do curso completo com quizzes
const courseData = {
    modules: [
        {
            id: 1,
            title: "Dia 1-2: AWS Core + EC2 Deep Dive",
            description: "Fundamentos AWS, IAM avançado, VPC networking, EC2 otimização",
            duration: "2 dias",
            progress: 0,
            completed: false,
            topics: [
                {
                    name: "Global Infrastructure",
                    description: "Regiões, AZs, Edge Locations e como escolher a região ideal",
                    keyPoints: ["Mínimo 3 AZs por região", "400+ Edge Locations", "Latência < 50ms", "Compliance regional"],
                    example: "Para uma aplicação global, usar múltiplas regiões com CloudFront",
                    completed: false
                },
                {
                    name: "IAM Policies Avançadas",
                    description: "Políticas complexas, cross-account access, conditions",
                    keyPoints: ["Explicit Deny > Allow", "Resource vs Identity policies", "Conditions avançadas", "AssumeRole pattern"],
                    example: "Policy com condition por IP e horário de acesso",
                    completed: false
                },
                {
                    name: "VPC Networking",
                    description: "Route tables, Security Groups vs NACLs, NAT Gateway",
                    keyPoints: ["Longest prefix match", "Stateful vs Stateless", "Multi-AZ NAT", "VPC Peering"],
                    example: "VPC com subnets públicas/privadas em múltiplas AZs",
                    completed: false
                },
                {
                    name: "EC2 Storage (EBS)",
                    description: "Tipos de EBS, performance, snapshots, encryption",
                    keyPoints: ["gp3 vs io2", "IOPS vs Throughput", "EBS-optimized", "Encryption at rest"],
                    example: "Volume gp3 com 10,000 IOPS para database",
                    completed: false
                },
                {
                    name: "Security Groups vs NACLs",
                    description: "Diferenças, casos de uso, troubleshooting",
                    keyPoints: ["Stateful vs Stateless", "Allow vs Deny rules", "Instance vs Subnet level", "Return traffic"],
                    example: "NACL bloqueando tráfego malicioso + SG permitindo aplicação",
                    completed: false
                }
            ],
            quiz: [
                {
                    question: "Qual é o número mínimo de AZs por região AWS?",
                    options: ["2", "3", "4", "5"],
                    correct: 1,
                    explanation: "Cada região AWS tem no mínimo 3 Availability Zones para garantir alta disponibilidade."
                },
                {
                    question: "Em uma política IAM, se houver Allow e Deny para a mesma ação:",
                    options: ["Allow prevalece", "Deny prevalece", "Erro de política", "Depende da ordem"],
                    correct: 1,
                    explanation: "Explicit Deny sempre prevalece sobre Allow em políticas IAM."
                },
                {
                    question: "Qual é a principal diferença entre Security Groups e NACLs?",
                    options: ["SG é stateful, NACL é stateless", "SG é stateless, NACL é stateful", "Não há diferença", "SG é mais seguro"],
                    correct: 0,
                    explanation: "Security Groups são stateful (return traffic automático), NACLs são stateless (precisa regras explícitas)."
                },
                {
                    question: "Para 10,000 IOPS consistentes, qual tipo de EBS usar?",
                    options: ["gp2", "gp3", "io1/io2", "st1"],
                    correct: 2,
                    explanation: "io1/io2 são otimizados para IOPS altos e consistentes, ideais para databases."
                },
                {
                    question: "Route tables usam qual critério para escolher rotas?",
                    options: ["Primeira rota", "Última rota", "Longest prefix match", "Ordem alfabética"],
                    correct: 2,
                    explanation: "Route tables usam longest prefix match - a rota mais específica prevalece."
                },
                {
                    question: "Para alta disponibilidade de NAT Gateway:",
                    options: ["Um por VPC", "Um por AZ", "Um por subnet", "Não é necessário"],
                    correct: 1,
                    explanation: "Para alta disponibilidade, deve-se ter um NAT Gateway por Availability Zone."
                },
                {
                    question: "Edge Locations são usadas principalmente para:",
                    options: ["Compute", "Storage", "CDN (CloudFront)", "Database"],
                    correct: 2,
                    explanation: "Edge Locations são pontos de presença para CloudFront CDN e Route 53."
                },
                {
                    question: "EBS-optimized instances oferecem:",
                    options: ["Mais CPU", "Mais memória", "Bandwidth dedicada para EBS", "Mais storage"],
                    correct: 2,
                    explanation: "EBS-optimized garante bandwidth de rede dedicada para tráfego EBS."
                },
                {
                    question: "Cross-account access é melhor implementado com:",
                    options: ["Shared credentials", "AssumeRole", "Root access", "API Keys"],
                    correct: 1,
                    explanation: "AssumeRole é a melhor prática para acesso cross-account seguro."
                },
                {
                    question: "VPC Peering permite:",
                    options: ["Conectar VPCs na mesma região apenas", "Conectar VPCs cross-region", "Conectar todas as VPCs automaticamente", "Apenas VPCs da mesma conta"],
                    correct: 1,
                    explanation: "VPC Peering permite conectar VPCs na mesma região ou cross-region."
                }
            ]
        },
        {
            id: 2,
            title: "Dia 3-4: Lambda + Serverless Architecture",
            description: "Lambda avançado, API Gateway, Step Functions, event-driven patterns",
            duration: "2 dias",
            progress: 0,
            completed: false,
            topics: [
                {
                    name: "Lambda Lifecycle",
                    description: "Cold starts, warm containers, execution model",
                    keyPoints: ["Init → Invoke → Shutdown", "15min timeout máximo", "10GB memory máximo", "Provisioned Concurrency"],
                    example: "Function com Provisioned Concurrency para eliminar cold starts",
                    completed: false
                },
                {
                    name: "Event Sources",
                    description: "Sync vs Async vs Stream-based triggers",
                    keyPoints: ["API Gateway (sync)", "S3 Events (async)", "DynamoDB Streams", "Error handling patterns"],
                    example: "S3 trigger → Lambda → DynamoDB com DLQ para falhas",
                    completed: false
                },
                {
                    name: "API Gateway Auth",
                    description: "Lambda Authorizer, Cognito, IAM, API Keys",
                    keyPoints: ["JWT validation", "Policy generation", "Context passing", "Caching strategies"],
                    example: "Lambda Authorizer validando JWT com cache de 5 minutos",
                    completed: false
                },
                {
                    name: "Step Functions",
                    description: "Workflow orchestration, state types, error handling",
                    keyPoints: ["Task, Choice, Parallel states", "Retry/Catch patterns", "Express vs Standard", "ASL syntax"],
                    example: "Order processing workflow com parallel payment e inventory",
                    completed: false
                },
                {
                    name: "SAM Deployment",
                    description: "Infrastructure as Code, deployment strategies",
                    keyPoints: ["SAM templates", "CodeDeploy integration", "Canary deployments", "Environment variables"],
                    example: "SAM template com API Gateway + Lambda + DynamoDB",
                    completed: false
                }
            ],
            quiz: [
                {
                    question: "Qual é o timeout máximo para Lambda?",
                    options: ["5 minutos", "10 minutos", "15 minutos", "30 minutos"],
                    correct: 2,
                    explanation: "Lambda tem timeout máximo de 15 minutos."
                },
                {
                    question: "Para eliminar cold starts:",
                    options: ["Aumentar memory", "Provisioned Concurrency", "Usar containers", "Reduzir código"],
                    correct: 1,
                    explanation: "Provisioned Concurrency mantém funções warm eliminando cold starts."
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
                    question: "Lambda Authorizer deve retornar:",
                    options: ["Boolean", "Policy IAM", "Token", "User ID"],
                    correct: 1,
                    explanation: "Lambda Authorizer deve retornar uma policy IAM válida."
                },
                {
                    question: "DLQ (Dead Letter Queue) é usado para:",
                    options: ["Performance", "Mensagens falhadas", "Logging", "Monitoring"],
                    correct: 1,
                    explanation: "DLQ armazena mensagens que falharam após tentativas de retry."
                },
                {
                    question: "SAM é baseado em:",
                    options: ["Terraform", "CloudFormation", "Ansible", "Kubernetes"],
                    correct: 1,
                    explanation: "SAM é uma extensão do CloudFormation para aplicações serverless."
                },
                {
                    question: "Lambda concurrent executions padrão:",
                    options: ["100", "500", "1000", "Unlimited"],
                    correct: 2,
                    explanation: "Limite padrão é 1000 concurrent executions por região."
                },
                {
                    question: "EventBridge é sucessor de:",
                    options: ["SNS", "SQS", "CloudWatch Events", "Kinesis"],
                    correct: 2,
                    explanation: "EventBridge é a evolução do CloudWatch Events."
                },
                {
                    question: "Para deployment canary no Lambda:",
                    options: ["Blue/Green", "CodeDeploy", "Rolling", "All-at-once"],
                    correct: 1,
                    explanation: "CodeDeploy oferece deployment canary para Lambda functions."
                }
            ]
        },
        {
            id: 3,
            title: "Dia 5-6: Containers + Elastic Beanstalk",
            description: "ECS, EKS, Fargate deployment strategies, Beanstalk configurations",
            duration: "2 dias",
            progress: 0,
            completed: false,
            topics: [
                {
                    name: "ECS vs EKS",
                    description: "Diferenças entre ECS proprietário e EKS Kubernetes",
                    keyPoints: ["ECS: AWS native", "EKS: Kubernetes padrão", "Control plane gerenciado", "Worker nodes EC2/Fargate"],
                    example: "ECS para simplicidade, EKS para portabilidade Kubernetes",
                    completed: false
                },
                {
                    name: "Fargate Serverless",
                    description: "Containers sem gerenciar infraestrutura",
                    keyPoints: ["Serverless containers", "vCPU + Memory billing", "Isolamento por task", "Networking awsvpc"],
                    example: "Task Fargate com 0.5 vCPU e 1GB RAM para microservice",
                    completed: false
                },
                {
                    name: "Task Definitions",
                    description: "Blueprint dos containers, networking, resources",
                    keyPoints: ["Container definitions", "CPU/Memory allocation", "Port mappings", "Environment variables"],
                    example: "Task definition com nginx + sidecar logging container",
                    completed: false
                },
                {
                    name: "Beanstalk Deployment",
                    description: "Estratégias de deployment, configurações",
                    keyPoints: ["Rolling vs Immutable", "Blue/Green deployment", ".ebextensions", "Health monitoring"],
                    example: "Deployment Blue/Green com health checks automáticos",
                    completed: false
                },
                {
                    name: "Docker Optimization",
                    description: "Multi-stage builds, image size, security",
                    keyPoints: ["Multi-stage Dockerfile", "Alpine base images", "Layer caching", "Security scanning"],
                    example: "Dockerfile multi-stage reduzindo imagem de 1GB para 100MB",
                    completed: false
                }
            ],
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
        }
    ]
};

// Estado global do progresso
let moduleProgress = JSON.parse(localStorage.getItem('dva-c02-progress') || '{}');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadModules();
    setupNavigation();
    updateAllProgress();
});

// Carregar módulos
function loadModules() {
    const modulesGrid = document.getElementById('modulesGrid');
    if (!modulesGrid) return;
    
    courseData.modules.forEach(module => {
        const moduleCard = createModuleCard(module);
        modulesGrid.appendChild(moduleCard);
    });
}

// Criar card do módulo
function createModuleCard(module) {
    const progress = calculateModuleProgress(module.id);
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
        <h4>${module.title}</h4>
        <p>${module.description}</p>
        <div class="module-progress">
            <div class="progress-bar" style="width: ${progress}%" data-module="${module.id}"></div>
        </div>
        <div class="module-info">
            <span><i class="fas fa-clock"></i> ${module.duration}</span>
            <span><i class="fas fa-list"></i> ${module.topics.length} tópicos</span>
            <span><i class="fas fa-chart-line"></i> ${progress}% completo</span>
        </div>
        <button class="btn-primary" onclick="startModule(${module.id})">
            ${progress > 0 ? 'Continuar' : 'Iniciar'} Módulo
        </button>
    `;
    return card;
}

// Calcular progresso do módulo
function calculateModuleProgress(moduleId) {
    const module = courseData.modules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const completedTopics = module.topics.filter(topic => 
        moduleProgress[`${moduleId}-${topic.name}`]
    ).length;
    
    return Math.round((completedTopics / module.topics.length) * 100);
}

// Iniciar módulo
function startModule(moduleId) {
    const module = courseData.modules.find(m => m.id === moduleId);
    if (module) {
        showModuleContent(module);
    }
}

// Mostrar conteúdo do módulo
function showModuleContent(module) {
    const modal = document.createElement('div');
    modal.className = 'module-modal';
    
    const progress = calculateModuleProgress(module.id);
    const allCompleted = progress === 100;
    
    const topicsHtml = module.topics.map(topic => {
        const isCompleted = moduleProgress[`${module.id}-${topic.name}`];
        return `
            <div class="topic-card ${isCompleted ? 'completed' : ''}">
                <div class="topic-header" onclick="toggleTopic(this, ${module.id}, '${topic.name}')">
                    <h5>${topic.name} ${isCompleted ? '✓' : ''}</h5>
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
                    ${!isCompleted ? `<button class="btn-complete" onclick="completeTopic(${module.id}, '${topic.name}')">Marcar como Concluído</button>` : ''}
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
                <div class="module-progress-header">
                    <h4>Progresso: ${progress}%</h4>
                    <div class="progress-bar-large">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                <h4>Tópicos do Módulo:</h4>
                <div class="topics-container">
                    ${topicsHtml}
                </div>
                <div class="module-actions">
                    <button class="btn-secondary ${allCompleted ? '' : 'disabled'}" 
                            onclick="${allCompleted ? `takeQuiz(${module.id})` : 'alert(\'Complete todos os tópicos primeiro!\')'}"
                            ${allCompleted ? '' : 'disabled'}>
                        <i class="fas fa-question-circle"></i> Fazer Quiz (${allCompleted ? 'Liberado' : 'Bloqueado'})
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Toggle tópico
function toggleTopic(header, moduleId, topicName) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.topic-toggle');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = '-';
        header.parentElement.classList.add('expanded');
    } else {
        content.style.display = 'none';
        toggle.textContent = '+';
        header.parentElement.classList.remove('expanded');
    }
}

// Completar tópico
function completeTopic(moduleId, topicName) {
    moduleProgress[`${moduleId}-${topicName}`] = true;
    localStorage.setItem('dva-c02-progress', JSON.stringify(moduleProgress));
    
    // Atualizar UI
    updateAllProgress();
    
    // Recarregar modal
    closeModal();
    setTimeout(() => startModule(moduleId), 100);
}

// Fazer quiz
function takeQuiz(moduleId) {
    const module = courseData.modules.find(m => m.id === moduleId);
    if (!module || !module.quiz) {
        alert('Quiz não disponível para este módulo.');
        return;
    }
    
    closeModal();
    showQuiz(module);
}

// Mostrar quiz
function showQuiz(module) {
    let currentQuestion = 0;
    let score = 0;
    let answers = [];
    
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    
    function showQuestion() {
        const question = module.quiz[currentQuestion];
        modal.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-header">
                    <h3>Quiz: ${module.title}</h3>
                    <span class="question-counter">Questão ${currentQuestion + 1} de ${module.quiz.length}</span>
                </div>
                <div class="quiz-body">
                    <h4>${question.question}</h4>
                    <div class="quiz-options">
                        ${question.options.map((option, index) => `
                            <label class="quiz-option">
                                <input type="radio" name="answer" value="${index}">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="quiz-actions">
                        <button class="btn-primary" onclick="nextQuestion()">
                            ${currentQuestion === module.quiz.length - 1 ? 'Finalizar' : 'Próxima'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    window.nextQuestion = function() {
        const selected = modal.querySelector('input[name="answer"]:checked');
        if (!selected) {
            alert('Selecione uma resposta!');
            return;
        }
        
        const answer = parseInt(selected.value);
        answers.push(answer);
        
        if (answer === module.quiz[currentQuestion].correct) {
            score++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < module.quiz.length) {
            showQuestion();
        } else {
            showResults();
        }
    };
    
    function showResults() {
        const percentage = Math.round((score / module.quiz.length) * 100);
        const passed = percentage >= 70;
        
        modal.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-header">
                    <h3>Resultado do Quiz</h3>
                </div>
                <div class="quiz-body">
                    <div class="quiz-result ${passed ? 'passed' : 'failed'}">
                        <h2>${score}/${module.quiz.length}</h2>
                        <p>${percentage}%</p>
                        <p class="result-message">
                            ${passed ? '🎉 Parabéns! Você passou!' : '📚 Continue estudando!'}
                        </p>
                    </div>
                    <div class="quiz-review">
                        <h4>Revisão das Respostas:</h4>
                        ${module.quiz.map((q, i) => `
                            <div class="review-item ${answers[i] === q.correct ? 'correct' : 'incorrect'}">
                                <p><strong>Q${i+1}:</strong> ${q.question}</p>
                                <p><strong>Sua resposta:</strong> ${q.options[answers[i]]}</p>
                                <p><strong>Resposta correta:</strong> ${q.options[q.correct]}</p>
                                <p><em>${q.explanation}</em></p>
                            </div>
                        `).join('')}
                    </div>
                    <div class="quiz-actions">
                        <button class="btn-primary" onclick="closeQuiz()">Fechar</button>
                        <button class="btn-secondary" onclick="retakeQuiz()">Refazer Quiz</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    window.closeQuiz = function() {
        modal.remove();
    };
    
    window.retakeQuiz = function() {
        currentQuestion = 0;
        score = 0;
        answers = [];
        showQuestion();
    };
    
    document.body.appendChild(modal);
    showQuestion();
}

// Fechar modal
function closeModal() {
    const modal = document.querySelector('.module-modal');
    if (modal) {
        modal.remove();
    }
}

// Atualizar todo o progresso
function updateAllProgress() {
    courseData.modules.forEach(module => {
        const progress = calculateModuleProgress(module.id);
        const progressBar = document.querySelector(`[data-module="${module.id}"]`);
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            const moduleCard = progressBar.closest('.module-card');
            const progressText = moduleCard.querySelector('.module-info span:last-child');
            if (progressText) {
                progressText.innerHTML = `<i class="fas fa-chart-line"></i> ${progress}% completo`;
            }
        }
    });
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
// Dados do curso completo - 14 dias
const courseData = {
    modules: [
        {
            id: 1,
            title: "Dia 1-2: AWS Core + EC2 Deep Dive",
            description: "Fundamentos AWS, IAM avançado, VPC networking, EC2 otimização",
            duration: "2 dias",
            progress: 0,
            topics: ["Global Infrastructure", "IAM Policies", "VPC Advanced", "EC2 Storage", "Security Groups vs NACLs"],
            content: "dia1-2-core-ec2.md",
            quiz: [
                {
                    question: "Uma aplicação EC2 precisa acessar S3 sem hardcoded credentials. Qual é a melhor prática?",
                    options: ["Access Keys no código", "IAM Role anexada à instância", "Credentials no User Data", "Environment variables"],
                    correct: 1,
                    explanation: "IAM Roles anexadas à instância EC2 são a melhor prática para acesso seguro aos serviços AWS."
                }
            ]
        },
        {
            id: 2,
            title: "Dia 3-4: Lambda + Serverless Architecture",
            description: "Lambda avançado, API Gateway, Step Functions, event-driven patterns",
            duration: "2 dias",
            progress: 0,
            topics: ["Lambda Lifecycle", "Event Sources", "API Gateway Auth", "Step Functions", "SAM Deployment"],
            content: "dia3-4-lambda-serverless.md",
            quiz: [
                {
                    question: "Uma Lambda function está tendo cold starts frequentes. Qual é a melhor solução?",
                    options: ["Aumentar memory allocation", "Provisioned Concurrency", "Usar container images", "Reduzir timeout"],
                    correct: 1,
                    explanation: "Provisioned Concurrency mantém funções 'warm' eliminando cold starts."
                }
            ]
        },
        {
            id: 3,
            title: "Dia 5-6: Containers + Elastic Beanstalk",
            description: "ECS, EKS, Fargate deployment strategies, Beanstalk configurations",
            duration: "2 dias",
            progress: 0,
            topics: ["ECS vs EKS", "Fargate Serverless", "Task Definitions", "Beanstalk Deployment", "Docker Optimization"],
            content: "dia5-6-containers.md"
        },
        {
            id: 4,
            title: "Dia 7: Revisão + Mini Simulado",
            description: "Consolidação Semana 1, simulado 25 questões, análise performance",
            duration: "1 dia",
            progress: 0,
            topics: ["Revisão Conceitos", "Mini Simulado", "Análise Gaps", "Preparação Semana 2"],
            content: "dia7-revisao.md"
        },
        {
            id: 5,
            title: "Dia 8-9: S3 + Storage + Databases",
            description: "S3 avançado, RDS, DynamoDB, ElastiCache, storage optimization",
            duration: "2 dias",
            progress: 0,
            topics: ["S3 Storage Classes", "DynamoDB Design", "RDS Multi-AZ", "ElastiCache Redis", "Backup Strategies"],
            content: "dia8-9-storage-db.md"
        },
        {
            id: 6,
            title: "Dia 10-11: API Gateway + Integration",
            description: "API Gateway avançado, SQS, SNS, EventBridge, integration patterns",
            duration: "2 dias",
            progress: 0,
            topics: ["API Caching", "SQS FIFO", "SNS Fan-out", "EventBridge Rules", "Message Filtering"],
            content: "dia10-11-integration.md"
        },
        {
            id: 7,
            title: "Dia 12-13: CI/CD + Monitoring + Security",
            description: "CodePipeline, CloudWatch, X-Ray, security best practices",
            duration: "2 dias",
            progress: 0,
            topics: ["CodePipeline", "CloudWatch Custom Metrics", "X-Ray Tracing", "Security Policies", "Deployment Strategies"],
            content: "dia12-13-cicd-monitoring.md"
        },
        {
            id: 8,
            title: "Dia 14: Simulado Final + Revisão Intensiva",
            description: "Simulado 65 questões formato real, revisão final, plano últimos 3 dias",
            duration: "1 dia",
            progress: 0,
            topics: ["Simulado Completo", "Análise Performance", "Revisão Final", "Estratégias Prova"],
            content: "dia14-simulado-final.md"
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
    // Carregar progresso do localStorage
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
        // Redirecionar para página do módulo ou abrir modal
        showModuleContent(module);
    }
}

// Mostrar conteúdo do módulo
function showModuleContent(module) {
    // Criar modal ou nova página com conteúdo do módulo
    const modal = document.createElement('div');
    modal.className = 'module-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${module.title}</h3>
                <button class="close-modal" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <h4>Tópicos do Módulo:</h4>
                <ul>
                    ${module.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
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
    // Implementar sistema de aprendizado
    console.log(`Iniciando aprendizado do módulo ${moduleId}`);
    closeModal();
}

// Fazer quiz
function takeQuiz(moduleId) {
    // Implementar sistema de quiz
    console.log(`Iniciando quiz do módulo ${moduleId}`);
    closeModal();
}

// Atualizar progresso
function updateProgress(moduleId, progress) {
    const savedProgress = JSON.parse(localStorage.getItem('dva-c02-progress') || '{}');
    savedProgress[moduleId] = progress;
    localStorage.setItem('dva-c02-progress', JSON.stringify(savedProgress));
    
    // Atualizar display
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

// Adicionar estilos do modal via JavaScript
const modalStyles = `
.module-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.modal-content {
    background: white;
    border-radius: 15px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    color: #232f3e;
}

.close-modal {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
}

.modal-body {
    padding: 2rem;
}

.modal-body ul {
    margin: 1rem 0;
    padding-left: 2rem;
}

.modal-body li {
    margin: 0.5rem 0;
}

.module-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn-secondary {
    background: #6c757d;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-secondary:hover {
    background: #5a6268;
}
`;

// Adicionar estilos ao head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
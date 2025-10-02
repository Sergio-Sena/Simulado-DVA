// Página de Resultados do Simulado AWS DVA-C02
class ExamResults {
    constructor() {
        this.examData = null;
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        this.loadExamData();
        if (this.examData) {
            this.renderResults();
            this.setupEventListeners();
        } else {
            this.redirectToHome();
        }
    }

    loadExamData() {
        const savedResults = localStorage.getItem('examResults');
        if (savedResults) {
            this.examData = JSON.parse(savedResults);
        }
    }

    redirectToHome() {
        alert('Nenhum resultado de exame encontrado. Redirecionando para a página inicial.');
        window.location.href = 'index.html';
    }

    renderResults() {
        this.renderMainResult();
        this.renderDomainAnalysis();
        this.renderDetailedReview();
    }

    renderMainResult() {
        const { awsScore, passed, correctAnswers, totalQuestions, scorePercentage, timeSpent } = this.examData;
        
        // Atualizar círculo de pontuação
        const scoreCircle = document.getElementById('score-circle');
        const scoreAngle = (awsScore / 1000) * 360;
        scoreCircle.style.setProperty('--score-angle', `${scoreAngle}deg`);
        
        // Definir cor baseada na pontuação
        let circleColor = '#e74c3c'; // Vermelho para reprovado
        if (passed) {
            if (awsScore >= 850) circleColor = '#27ae60'; // Verde para excelente
            else if (awsScore >= 780) circleColor = '#f39c12'; // Laranja para bom
            else circleColor = '#3498db'; // Azul para aprovado
        }
        
        const circleGradient = `conic-gradient(from 0deg, ${circleColor} 0deg, ${circleColor} ${scoreAngle}deg, #ecf0f1 ${scoreAngle}deg, #ecf0f1 360deg)`;
        scoreCircle.style.background = circleGradient;
        
        // Atualizar textos
        document.getElementById('aws-score').textContent = awsScore;
        
        const resultStatus = document.getElementById('result-status');
        const statusText = resultStatus.querySelector('.status-text');
        const statusIcon = resultStatus.querySelector('.status-icon');
        
        if (passed) {
            statusText.textContent = 'APROVADO';
            statusText.className = 'status-text passed';
            statusIcon.textContent = '✅';
        } else {
            statusText.textContent = 'REPROVADO';
            statusText.className = 'status-text failed';
            statusIcon.textContent = '❌';
        }
        
        document.getElementById('correct-answers').textContent = `${correctAnswers}/${totalQuestions}`;
        document.getElementById('percentage').textContent = `${scorePercentage}%`;
        document.getElementById('time-spent').textContent = this.formatTime(timeSpent);
    }

    renderDomainAnalysis() {
        const { domainStats } = this.examData;
        const domainsGrid = document.getElementById('domains-grid');
        domainsGrid.innerHTML = '';
        
        const domainOrder = ['Desenvolvimento', 'Segurança', 'Implantação', 'Otimização'];
        
        domainOrder.forEach(domain => {
            if (domainStats[domain]) {
                const stats = domainStats[domain];
                const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                
                const domainCard = document.createElement('div');
                domainCard.className = `domain-card ${domain.toLowerCase()}`;
                
                let scoreClass = 'poor';
                if (percentage >= 80) scoreClass = 'good';
                else if (percentage >= 60) scoreClass = 'average';
                
                domainCard.innerHTML = `
                    <div class="domain-header">
                        <div class="domain-name">${domain}</div>
                        <div class="domain-score ${scoreClass}">${percentage}%</div>
                    </div>
                    <div class="domain-progress">
                        <div class="domain-progress-fill ${domain.toLowerCase()}" style="width: ${percentage}%"></div>
                    </div>
                    <div class="domain-details">
                        ${stats.correct} de ${stats.total} questões corretas
                    </div>
                `;
                
                domainsGrid.appendChild(domainCard);
            }
        });
    }

    renderDetailedReview() {
        this.renderQuestions('all');
    }

    renderQuestions(filter) {
        const { examQuestions, userAnswers, flaggedQuestions } = this.examData;
        const reviewContainer = document.getElementById('questions-review');
        reviewContainer.innerHTML = '';
        
        const filteredQuestions = examQuestions.filter((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            const isFlagged = flaggedQuestions.includes(index);
            
            switch (filter) {
                case 'incorrect':
                    return userAnswer !== undefined && !isCorrect;
                case 'flagged':
                    return isFlagged;
                default:
                    return true;
            }
        });
        
        if (filteredQuestions.length === 0) {
            reviewContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #7f8c8d;">
                    <p>Nenhuma questão encontrada para este filtro.</p>
                </div>
            `;
            return;
        }
        
        filteredQuestions.forEach(question => {
            const originalIndex = examQuestions.indexOf(question);
            const userAnswer = userAnswers[originalIndex];
            const isCorrect = userAnswer === question.correct;
            const isFlagged = flaggedQuestions.includes(originalIndex);
            const isAnswered = userAnswer !== undefined;
            
            const questionItem = document.createElement('div');
            let statusClass = 'unanswered';
            if (isAnswered) {
                statusClass = isCorrect ? 'correct' : 'incorrect';
            }
            
            questionItem.className = `question-review-item ${statusClass}`;
            
            const statusBadges = [];
            if (isAnswered) {
                statusBadges.push(`<span class="status-badge ${statusClass}">${isCorrect ? 'Correta' : 'Incorreta'}</span>`);
            } else {
                statusBadges.push('<span class="status-badge unanswered">Não Respondida</span>');
            }
            
            if (isFlagged) {
                statusBadges.push('<span class="status-badge flagged">Marcada</span>');
            }
            
            const letters = ['A', 'B', 'C', 'D'];
            
            questionItem.innerHTML = `
                <div class="question-review-header">
                    <div class="question-number-badge">Questão ${originalIndex + 1}</div>
                    <div class="question-status">
                        ${statusBadges.join('')}
                    </div>
                </div>
                
                <div class="question-text">${question.question}</div>
                
                <div class="answer-comparison">
                    <div class="user-answer-section">
                        <h4>Sua Resposta</h4>
                        <div class="answer-text user-answer">
                            ${isAnswered ? `${letters[userAnswer]}. ${question.options[userAnswer]}` : 'Não respondida'}
                        </div>
                    </div>
                    
                    <div class="correct-answer-section">
                        <h4>Resposta Correta</h4>
                        <div class="answer-text correct-answer">
                            ${letters[question.correct]}. ${question.options[question.correct]}
                        </div>
                    </div>
                </div>
                
                <div class="explanation">
                    <h4>Explicação</h4>
                    <p>${question.explanation}</p>
                    <a href="${question.awsLink}" target="_blank" class="aws-link">
                        📖 Documentação AWS Oficial
                    </a>
                </div>
            `;
            
            reviewContainer.appendChild(questionItem);
        });
    }

    setupEventListeners() {
        // Filtros de revisão
        document.getElementById('show-all').addEventListener('click', () => {
            this.setActiveFilter('show-all');
            this.renderQuestions('all');
        });
        
        document.getElementById('show-incorrect').addEventListener('click', () => {
            this.setActiveFilter('show-incorrect');
            this.renderQuestions('incorrect');
        });
        
        document.getElementById('show-flagged').addEventListener('click', () => {
            this.setActiveFilter('show-flagged');
            this.renderQuestions('flagged');
        });
        
        // Ações
        document.getElementById('new-exam').addEventListener('click', () => {
            if (confirm('Deseja iniciar um novo simulado? O resultado atual será mantido no histórico.')) {
                window.location.href = 'simulado.html';
            }
        });
        
        document.getElementById('review-incorrect').addEventListener('click', () => {
            this.setActiveFilter('show-incorrect');
            this.renderQuestions('incorrect');
            document.getElementById('show-incorrect').scrollIntoView({ behavior: 'smooth' });
        });
        
        document.getElementById('back-home').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    setActiveFilter(activeButtonId) {
        // Remover classe active de todos os botões
        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Adicionar classe active ao botão clicado
        document.getElementById(activeButtonId).classList.add('active');
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}min`;
        }
        
        return `${minutes}min`;
    }
}

// Inicializar página de resultados
document.addEventListener('DOMContentLoaded', () => {
    new ExamResults();
});
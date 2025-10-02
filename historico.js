// Histórico e Análise de Performance
class HistoryManager {
    constructor() {
        this.history = JSON.parse(localStorage.getItem('examHistory') || '[]');
        this.init();
    }

    init() {
        this.displayOverview();
        this.displayDomainPerformance();
        this.displayTimeline();
    }

    displayOverview() {
        const totalAttempts = this.history.length;
        const scores = this.history.map(h => h.score);
        const averageScore = totalAttempts > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / totalAttempts) : 0;
        
        // Calcular melhoria (comparar últimos 3 com primeiros 3)
        let improvement = 0;
        if (totalAttempts >= 6) {
            const first3 = scores.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
            const last3 = scores.slice(-3).reduce((a, b) => a + b, 0) / 3;
            improvement = Math.round(((last3 - first3) / first3) * 100);
        }

        // Taxa de aprovação (720+ pontos)
        const passedAttempts = this.history.filter(h => h.score >= 720).length;
        const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

        document.getElementById('totalAttempts').textContent = totalAttempts;
        document.getElementById('averageScore').textContent = averageScore;
        document.getElementById('improvement').textContent = improvement > 0 ? `+${improvement}%` : `${improvement}%`;
        document.getElementById('passRate').textContent = `${passRate}%`;

        // Colorir melhoria
        const improvementEl = document.getElementById('improvement');
        improvementEl.style.color = improvement > 0 ? '#27ae60' : improvement < 0 ? '#e74c3c' : '#7f8c8d';
    }

    displayDomainPerformance() {
        const domains = ['Desenvolvimento', 'Segurança', 'Implantação', 'Otimização'];
        const domainStats = {};

        // Inicializar estatísticas
        domains.forEach(domain => {
            domainStats[domain] = {
                correct: 0,
                total: 0,
                percentage: 0
            };
        });

        // Calcular estatísticas por domínio
        this.history.forEach(exam => {
            if (exam.domainResults) {
                Object.keys(exam.domainResults).forEach(domain => {
                    const result = exam.domainResults[domain];
                    domainStats[domain].correct += result.correct;
                    domainStats[domain].total += result.total;
                });
            }
        });

        // Calcular percentuais
        Object.keys(domainStats).forEach(domain => {
            const stats = domainStats[domain];
            stats.percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        });

        // Renderizar
        const container = document.getElementById('domainPerformance');
        container.innerHTML = domains.map(domain => {
            const stats = domainStats[domain];
            const cssClass = domain.toLowerCase().replace('ç', 'c').replace('ã', 'a');
            
            return `
                <div class="domain-stat-card">
                    <div class="domain-header">
                        <span class="domain-badge ${cssClass}">${domain}</span>
                        <span class="domain-percentage ${this.getPerformanceClass(stats.percentage)}">${stats.percentage}%</span>
                    </div>
                    <div class="domain-progress">
                        <div class="domain-progress-fill ${cssClass}" style="width: ${stats.percentage}%"></div>
                    </div>
                    <div class="domain-details">
                        ${stats.correct}/${stats.total} questões corretas
                    </div>
                </div>
            `;
        }).join('');
    }

    displayTimeline() {
        const container = document.getElementById('timelineContainer');
        
        if (this.history.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📚</div>
                    <h3>Nenhum simulado realizado ainda</h3>
                    <p>Complete seu primeiro simulado para ver o histórico aqui!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.history.map((exam, index) => {
            const date = new Date(exam.date);
            const passed = exam.score >= 720;
            const modeText = this.getModeText(exam.mode, exam.domain);
            
            return `
                <div class="timeline-item">
                    <div class="timeline-marker ${passed ? 'passed' : 'failed'}">
                        ${passed ? '✅' : '❌'}
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h4>Simulado #${this.history.length - index}</h4>
                            <span class="timeline-date">${date.toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div class="timeline-details">
                            <div class="timeline-score ${passed ? 'passed' : 'failed'}">
                                ${exam.score} pontos
                            </div>
                            <div class="timeline-mode">${modeText}</div>
                            <div class="timeline-stats">
                                ${exam.correctAnswers}/${exam.totalQuestions} questões corretas (${Math.round((exam.correctAnswers/exam.totalQuestions)*100)}%)
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).reverse().join('');
    }

    getModeText(mode, domain) {
        switch(mode) {
            case 'pratica': return `Prática: ${domain}`;
            case 'revisao': return 'Modo Revisão';
            case 'completo':
            default: return 'Simulado Completo';
        }
    }

    getPerformanceClass(percentage) {
        if (percentage >= 80) return 'excellent';
        if (percentage >= 70) return 'good';
        if (percentage >= 60) return 'average';
        return 'poor';
    }
}

function clearHistory() {
    if (confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('examHistory');
        localStorage.removeItem('wrongQuestions');
        localStorage.removeItem('flaggedQuestions');
        location.reload();
    }
}

function goHome() {
    window.location.href = 'index.html';
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new HistoryManager();
});
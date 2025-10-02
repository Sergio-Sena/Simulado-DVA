// Simulador AWS DVA-C02
class ExamSimulator {
    constructor() {
        this.examQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.flaggedQuestions = new Set();
        this.examMode = localStorage.getItem('examMode') || 'completo';
        this.selectedDomain = localStorage.getItem('selectedDomain');
        this.timeRemaining = this.getTimeLimit();
        this.timerInterval = null;
        this.examStartTime = new Date();
        
        this.init();
    }
    
    getTimeLimit() {
        switch(this.examMode) {
            case 'pratica':
            case 'revisao':
                return 0; // Sem timer para prática e revisão
            case 'completo':
            default:
                return 130 * 60; // 130 minutos
        }
    }

    init() {
        this.generateExamQuestions();
        this.setupEventListeners();
        this.startTimer();
        this.renderQuestion();
        this.updateNavigationPanel();
    }

    generateExamQuestions() {
        switch(this.examMode) {
            case 'pratica':
                this.generatePracticeQuestions();
                break;
            case 'revisao':
                this.generateReviewQuestions();
                break;
            case 'completo':
            default:
                this.generateCompleteExamQuestions();
                break;
        }
        
        // Adicionar índices sequenciais
        this.examQuestions.forEach((question, index) => {
            question.examIndex = index + 1;
        });
    }
    
    generateCompleteExamQuestions() {
        // Distribuição por domínio baseada no exame real
        const distribution = {
            'Desenvolvimento': 21,  // 32% de 65
            'Segurança': 17,        // 26% de 65  
            'Implantação': 16,      // 24% de 65
            'Otimização': 11        // 18% de 65
        };

        const questionsByDomain = {
            'Desenvolvimento': questionsDatabase.filter(q => q.domain === 'Desenvolvimento'),
            'Segurança': questionsDatabase.filter(q => q.domain === 'Segurança'),
            'Implantação': questionsDatabase.filter(q => q.domain === 'Implantação'),
            'Otimização': questionsDatabase.filter(q => q.domain === 'Otimização')
        };

        // Selecionar questões aleatórias respeitando a distribuição
        for (const [domain, count] of Object.entries(distribution)) {
            const domainQuestions = questionsByDomain[domain];
            const selectedQuestions = this.getRandomQuestions(domainQuestions, count);
            this.examQuestions.push(...selectedQuestions);
        }

        // Embaralhar as questões
        this.examQuestions = this.shuffleArray(this.examQuestions);
    }
    
    generatePracticeQuestions() {
        const domainQuestions = questionsDatabase.filter(q => q.domain === this.selectedDomain);
        const practiceCount = Math.min(20, domainQuestions.length); // Máximo 20 questões
        this.examQuestions = this.getRandomQuestions(domainQuestions, practiceCount);
    }
    
    generateReviewQuestions() {
        const wrongQuestions = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
        const flaggedQuestions = JSON.parse(localStorage.getItem('flaggedQuestions') || '[]');
        
        // Combinar questões erradas e marcadas (sem duplicatas)
        const reviewQuestionIds = [...new Set([...wrongQuestions, ...flaggedQuestions])];
        
        // Buscar questões na base de dados
        this.examQuestions = reviewQuestionIds.map(id => {
            return questionsDatabase.find(q => this.getQuestionId(q) === id);
        }).filter(q => q !== undefined);
        
        // Se não há questões para revisão, usar algumas aleatórias
        if (this.examQuestions.length === 0) {
            this.examQuestions = this.getRandomQuestions(questionsDatabase, 10);
        }
    }
    
    getQuestionId(question) {
        // Criar ID único baseado no conteúdo da questão
        return btoa(question.question.substring(0, 50)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
    }

    getRandomQuestions(questions, count) {
        const shuffled = this.shuffleArray([...questions]);
        return shuffled.slice(0, count);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    setupEventListeners() {
        // Navegação
        document.getElementById('prev-question').addEventListener('click', () => {
            this.goToPreviousQuestion();
        });

        document.getElementById('next-question').addEventListener('click', () => {
            this.goToNextQuestion();
        });

        // Marcar questão
        document.getElementById('flag-question').addEventListener('click', () => {
            this.toggleFlag();
        });

        // Finalizar exame
        document.getElementById('finish-exam').addEventListener('click', () => {
            this.showFinishModal();
        });

        // Modal
        document.getElementById('cancel-finish').addEventListener('click', () => {
            this.hideFinishModal();
        });

        document.getElementById('confirm-finish').addEventListener('click', () => {
            this.finishExam();
        });

        // Fechar modal clicando fora
        document.getElementById('finish-modal').addEventListener('click', (e) => {
            if (e.target.id === 'finish-modal') {
                this.hideFinishModal();
            }
        });

        // Atalhos do teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.goToPreviousQuestion();
            } else if (e.key === 'ArrowRight') {
                this.goToNextQuestion();
            } else if (e.key === 'f' || e.key === 'F') {
                this.toggleFlag();
            } else if (e.key >= '1' && e.key <= '4') {
                this.selectOption(parseInt(e.key) - 1);
            }
        });
    }

    startTimer() {
        if (this.timeRemaining > 0) {
            this.updateTimerDisplay();
            this.timerInterval = setInterval(() => {
                this.timeRemaining--;
                this.updateTimerDisplay();
                
                if (this.timeRemaining <= 0) {
                    this.finishExam();
                }
            }, 1000);
        } else {
            // Ocultar timer para modos sem tempo
            const timerElement = document.getElementById('timer');
            if (timerElement) {
                timerElement.style.display = 'none';
            }
        }
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const timerElement = document.getElementById('timer');
        timerElement.textContent = timeString;
        
        // Adicionar classes de aviso
        timerElement.classList.remove('warning', 'critical');
        if (this.timeRemaining <= 300) { // 5 minutos
            timerElement.classList.add('critical');
        } else if (this.timeRemaining <= 900) { // 15 minutos
            timerElement.classList.add('warning');
        }
    }

    renderQuestion() {
        const question = this.examQuestions[this.currentQuestionIndex];
        
        // Atualizar informações da questão
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.examQuestions.length;
        document.getElementById('question-text').textContent = question.question;
        
        // Atualizar badge do domínio
        const domainBadge = document.getElementById('domain-badge');
        domainBadge.textContent = question.domain;
        const normalizedDomain = question.domain.toLowerCase()
            .replace(/ç/g, 'c')
            .replace(/ã/g, 'a')
            .replace(/á/g, 'a')
            .replace(/é/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ú/g, 'u');
        domainBadge.className = `domain-badge ${normalizedDomain}`;
        
        // Atualizar botão de flag
        const flagButton = document.getElementById('flag-question');
        if (this.flaggedQuestions.has(this.currentQuestionIndex)) {
            flagButton.classList.add('flagged');
            flagButton.textContent = '🚩 Marcada';
        } else {
            flagButton.classList.remove('flagged');
            flagButton.textContent = '🚩 Marcar';
        }
        
        // Renderizar opções
        this.renderOptions(question);
        
        // Atualizar botões de navegação
        document.getElementById('prev-question').disabled = this.currentQuestionIndex === 0;
        document.getElementById('next-question').textContent = 
            this.currentQuestionIndex === this.examQuestions.length - 1 ? 'Finalizar' : 'Próxima →';
    }

    renderOptions(question) {
        const container = document.getElementById('options-container');
        container.innerHTML = '';
        
        // Adicionar instrução para questões de múltipla escolha
        if (question.multipleCorrect) {
            const instruction = document.createElement('div');
            instruction.className = 'multiple-choice-instruction';
            instruction.innerHTML = '<strong>🔹 ATENÇÃO: Esta questão possui MÚLTIPLAS respostas corretas. Selecione todas as opções aplicáveis.</strong>';
            instruction.style.cssText = 'background: #e8f5e8; padding: 15px; border-radius: 10px; margin-bottom: 25px; color: #2e7d32; font-size: 16px; border-left: 4px solid #4caf50; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);';
            container.appendChild(instruction);
        }
        
        const letters = ['A', 'B', 'C', 'D'];
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.onclick = () => this.selectOption(index, question.multipleCorrect);
            
            // Verificar se esta opção está selecionada
            const userAnswer = this.userAnswers[this.currentQuestionIndex];
            if (question.multipleCorrect) {
                if (Array.isArray(userAnswer) && userAnswer.includes(index)) {
                    optionElement.classList.add('selected');
                }
            } else {
                if (userAnswer === index) {
                    optionElement.classList.add('selected');
                }
            }
            
            const isSelected = question.multipleCorrect ? 
                (Array.isArray(userAnswer) && userAnswer.includes(index)) :
                (userAnswer === index);
            
            const indicator = question.multipleCorrect ? 
                (isSelected ? '☑️' : '☐') : 
                (isSelected ? '🔘' : '⚪');
            
            optionElement.innerHTML = `
                <div class="option-letter">${letters[index]}</div>
                <div class="option-indicator" style="font-size: 20px; margin-right: 15px; margin-top: 2px;">${indicator}</div>
                <div class="option-text">${option}</div>
            `;
            
            container.appendChild(optionElement);
        });
    }

    selectOption(optionIndex, isMultipleChoice = false) {
        if (isMultipleChoice) {
            // Para questões de múltipla escolha
            let currentAnswers = this.userAnswers[this.currentQuestionIndex] || [];
            if (!Array.isArray(currentAnswers)) {
                currentAnswers = [];
            }
            
            if (currentAnswers.includes(optionIndex)) {
                // Remove se já está selecionado
                currentAnswers = currentAnswers.filter(idx => idx !== optionIndex);
            } else {
                // Adiciona se não está selecionado
                currentAnswers.push(optionIndex);
            }
            
            this.userAnswers[this.currentQuestionIndex] = currentAnswers;
        } else {
            // Para questões de escolha única
            this.userAnswers[this.currentQuestionIndex] = optionIndex;
        }
        
        this.renderQuestion();
        this.updateNavigationPanel();
    }

    toggleFlag() {
        if (this.flaggedQuestions.has(this.currentQuestionIndex)) {
            this.flaggedQuestions.delete(this.currentQuestionIndex);
        } else {
            this.flaggedQuestions.add(this.currentQuestionIndex);
        }
        this.renderQuestion();
        this.updateNavigationPanel();
    }

    goToPreviousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
            this.updateNavigationPanel();
        }
    }

    goToNextQuestion() {
        if (this.currentQuestionIndex < this.examQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
            this.updateNavigationPanel();
        } else {
            this.showFinishModal();
        }
    }

    // Função removida - navegação direta por índice não é mais necessária

    updateNavigationPanel() {
        // Atualizar progresso
        const answeredCount = Object.keys(this.userAnswers).length;
        const progressPercentage = (answeredCount / this.examQuestions.length) * 100;
        
        document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
        document.getElementById('answered-count').textContent = answeredCount;
        document.getElementById('total-questions-progress').textContent = this.examQuestions.length;
    }

    // Função removida - grid de navegação não é mais necessário na interface simplificada

    showFinishModal() {
        const answeredCount = Object.keys(this.userAnswers).length;
        document.getElementById('modal-answered').textContent = answeredCount;
        document.getElementById('modal-flagged').textContent = this.flaggedQuestions.size;
        document.getElementById('finish-modal').style.display = 'flex';
    }

    hideFinishModal() {
        document.getElementById('finish-modal').style.display = 'none';
    }

    finishExam() {
        clearInterval(this.timerInterval);
        
        // Calcular resultados
        const results = this.calculateResults();
        
        // Salvar no histórico
        this.saveToHistory(results);
        
        // Salvar questões erradas e marcadas
        this.saveWrongAndFlaggedQuestions();
        
        // Salvar resultados no localStorage
        localStorage.setItem('examResults', JSON.stringify({
            ...results,
            examQuestions: this.examQuestions,
            userAnswers: this.userAnswers,
            flaggedQuestions: Array.from(this.flaggedQuestions),
            examStartTime: this.examStartTime,
            examEndTime: new Date(),
            timeSpent: this.getTimeLimit() - this.timeRemaining,
            mode: this.examMode,
            domain: this.selectedDomain
        }));
        
        // Redirecionar para página de resultados
        window.location.href = 'resultado.html';
    }
    
    saveToHistory(results) {
        const history = JSON.parse(localStorage.getItem('examHistory') || '[]');
        
        const examRecord = {
            date: new Date().toISOString(),
            mode: this.examMode,
            domain: this.selectedDomain,
            score: results.awsScore,
            correctAnswers: results.correctAnswers,
            totalQuestions: results.totalQuestions,
            passed: results.passed,
            domainResults: results.domainStats,
            timeSpent: this.getTimeLimit() - this.timeRemaining
        };
        
        history.push(examRecord);
        localStorage.setItem('examHistory', JSON.stringify(history));
    }
    
    saveWrongAndFlaggedQuestions() {
        const wrongQuestions = [];
        const flaggedQuestions = [];
        
        this.examQuestions.forEach((question, index) => {
            const questionId = this.getQuestionId(question);
            
            // Salvar questões erradas
            const userAnswer = this.userAnswers[index];
            let isCorrect = false;
            
            if (question.multipleCorrect) {
                if (Array.isArray(userAnswer) && Array.isArray(question.correct)) {
                    const sortedUser = [...userAnswer].sort();
                    const sortedCorrect = [...question.correct].sort();
                    isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
                }
            } else {
                isCorrect = userAnswer === question.correct;
            }
            
            if (!isCorrect && userAnswer !== undefined) {
                wrongQuestions.push(questionId);
            }
            
            // Salvar questões marcadas
            if (this.flaggedQuestions.has(index)) {
                flaggedQuestions.push(questionId);
            }
        });
        
        // Manter histórico de questões erradas (máximo 100)
        const existingWrong = JSON.parse(localStorage.getItem('wrongQuestions') || '[]');
        const allWrong = [...new Set([...existingWrong, ...wrongQuestions])].slice(-100);
        localStorage.setItem('wrongQuestions', JSON.stringify(allWrong));
        
        // Manter questões marcadas (máximo 50)
        const existingFlagged = JSON.parse(localStorage.getItem('flaggedQuestions') || '[]');
        const allFlagged = [...new Set([...existingFlagged, ...flaggedQuestions])].slice(-50);
        localStorage.setItem('flaggedQuestions', JSON.stringify(allFlagged));
    }

    calculateResults() {
        let correctAnswers = 0;
        const domainStats = {
            'Desenvolvimento': { correct: 0, total: 0 },
            'Segurança': { correct: 0, total: 0 },
            'Implantação': { correct: 0, total: 0 },
            'Otimização': { correct: 0, total: 0 }
        };

        this.examQuestions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            let isCorrect = false;
            
            if (question.multipleCorrect) {
                // Para questões de múltipla escolha
                if (Array.isArray(userAnswer) && Array.isArray(question.correct)) {
                    const sortedUser = [...userAnswer].sort();
                    const sortedCorrect = [...question.correct].sort();
                    isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
                }
            } else {
                // Para questões de escolha única
                isCorrect = userAnswer === question.correct;
            }
            
            if (isCorrect) {
                correctAnswers++;
                domainStats[question.domain].correct++;
            }
            
            domainStats[question.domain].total++;
        });

        const totalQuestions = this.examQuestions.length;
        const scorePercentage = (correctAnswers / totalQuestions) * 100;
        const awsScore = Math.round(100 + (scorePercentage / 100) * 900); // Escala AWS: 100-1000
        const passed = awsScore >= 720;

        return {
            correctAnswers,
            totalQuestions,
            scorePercentage: Math.round(scorePercentage * 100) / 100,
            awsScore,
            passed,
            domainStats
        };
    }
}

// Inicializar simulador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Limpar configurações de modo após uso
    const mode = localStorage.getItem('examMode');
    if (mode) {
        localStorage.removeItem('examMode');
        localStorage.removeItem('selectedDomain');
    }
    
    new ExamSimulator();
});
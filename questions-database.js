// Base de dados de questões para o simulado AWS DVA-C02
const questionsDatabase = [
    // DOMÍNIO: DESENVOLVIMENTO (125 questões - 32%)
    {
        domain: "Desenvolvimento",
        question: "Sua empresa está migrando de uma arquitetura tradicional para uma solução serverless na AWS. A equipe de desenvolvimento precisa processar pedidos de e-commerce de forma assíncrona usando Amazon SQS para lidar com picos de tráfego durante promoções. O arquiteto de soluções quer otimizar os custos e reduzir a latência do processamento.\n\nQual é a melhor prática para implementar o polling de mensagens neste cenário?",
        options: [
            "Fazer requisições contínuas sem intervalo para garantir processamento imediato",
            "Usar polling curto (short polling) com intervalo de 1 segundo para reduzir latência",
            "Usar polling longo (long polling) configurando WaitTimeSeconds para até 20 segundos",
            "Implementar apenas triggers baseados em CloudWatch Events"
        ],
        correct: 2,
        explanation: "Long polling é mais eficiente pois reduz o número de requisições vazias e o custo. Configure WaitTimeSeconds para até 20 segundos para otimizar o consumo de mensagens e reduzir custos operacionais.",
        awsLink: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma startup de fintech está desenvolvendo uma aplicação de processamento de pagamentos que precisa lidar com grandes volumes de transações. A equipe decidiu usar AWS Lambda para garantir escalabilidade automática, mas precisa processar arquivos de reconciliação bancária que podem ser muito grandes e demandar bastante memória.\n\nQual é o limite máximo de memória que pode ser configurado para uma função AWS Lambda?",
        options: [
            "10.240 MB (10 GB)",
            "3.008 MB (3 GB)",
            "5.120 MB (5 GB)",
            "8.192 MB (8 GB)"
        ],
        correct: 0,
        explanation: "O limite máximo de memória para Lambda é 10.240 MB (10 GB), configurado em incrementos de 1 MB. Isso permite processar workloads que demandam muita memória.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de e-commerce global está implementando um catálogo de produtos usando Amazon DynamoDB para suportar milhões de consultas por segundo. A equipe de desenvolvimento precisa otimizar a performance das operações de leitura, mas também quer entender o comportamento padrão do banco para tomar decisões arquiteturais.\n\nEm DynamoDB, qual tipo de consistência é usado por padrão nas operações de leitura?",
        options: [
            "Strongly consistent reads para garantir dados sempre atualizados",
            "Eventually consistent reads para melhor performance e throughput",
            "Transactional reads para garantir ACID compliance",
            "Cached reads com TTL de 5 minutos"
        ],
        correct: 1,
        explanation: "Por padrão, DynamoDB usa eventually consistent reads, que oferecem melhor performance e throughput. Strongly consistent reads podem ser solicitadas explicitamente quando necessário.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de streaming de vídeo está desenvolvendo microserviços usando AWS Lambda para processar uploads de conteúdo. Durante os testes de carga, a equipe notou que algumas funções estão falhando por timeout, especialmente aquelas que fazem processamento de vídeo. O time precisa entender os limites padrão para configurar adequadamente as funções.\n\nQual é o timeout padrão para funções AWS Lambda?",
        options: [
            "15 minutos (máximo permitido)",
            "30 segundos",
            "3 segundos",
            "1 minuto"
        ],
        correct: 2,
        explanation: "O timeout padrão para Lambda é 3 segundos, mas pode ser configurado até 15 minutos. Para processamento de vídeo, é recomendado aumentar o timeout conforme necessário.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de saúde está desenvolvendo uma plataforma de telemedicina que precisa garantir alta disponibilidade e segurança. A arquitetura usará AWS Lambda para processar consultas médicas e precisa implementar múltiplas estratégias para otimizar performance e reduzir cold starts, especialmente durante horários de pico.\n\nQuais são as melhores práticas para otimizar cold starts em funções Lambda? (Selecione DUAS respostas)",
        options: [
            "Usar Provisioned Concurrency para manter funções aquecidas",
            "Reduzir o tamanho do deployment package removendo dependências desnecessárias",
            "Sempre configurar a memória máxima de 10GB para todas as funções",
            "Usar apenas runtime interpretado como Python para evitar compilação"
        ],
        correct: [0, 1],
        multipleCorrect: true,
        explanation: "Para otimizar cold starts: 1) Provisioned Concurrency mantém instâncias aquecidas, 2) Deployment packages menores reduzem tempo de inicialização, 3) Memória adequada (não máxima) otimiza custo/performance, 4) Runtime compilado pode ser mais rápido após inicialização.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de serviços financeiros está desenvolvendo uma API para processamento de transações bancárias que deve atender aos mais altos padrões de segurança. A API será exposta publicamente e precisa proteger dados sensíveis de clientes. O CISO da empresa exige implementação de defesa em profundidade (defense in depth) para mitigar múltiplos vetores de ataque.\n\nQuais medidas de segurança devem ser implementadas para proteger esta API? (Selecione TRÊS respostas)",
        options: [
            "Implementar AWS WAF com regras customizadas para filtrar tráfego malicioso",
            "Usar Amazon Cognito para autenticação e autorização de usuários",
            "Configurar AWS Shield Advanced para proteção contra ataques DDoS",
            "Armazenar todas as credenciais em variáveis de ambiente sem criptografia"
        ],
        correct: [0, 1, 2],
        multipleCorrect: true,
        explanation: "Defense in depth requer múltiplas camadas: WAF filtra ataques de aplicação, Cognito oferece autenticação robusta, Shield Advanced protege contra DDoS. Credenciais nunca devem ser armazenadas sem criptografia.",
        awsLink: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de logística está modernizando seu sistema de rastreamento de entregas. A nova arquitetura usará AWS Lambda para processar atualizações de status em tempo real, mas as funções precisam acessar um banco de dados RDS MySQL que contém informações críticas dos pedidos. Durante os testes de carga, a equipe observou erros de \"too many connections\" no banco de dados.\n\nQual é a melhor solução para implementar connection pooling eficiente neste cenário?",
        options: [
            "Criar nova conexão a cada invocação da função para garantir isolamento",
            "Implementar AWS RDS Proxy para gerenciar automaticamente o pool de conexões",
            "Usar variáveis globais na função Lambda para manter conexões abertas",
            "Migrar completamente para DynamoDB para evitar problemas de conexão"
        ],
        correct: 1,
        explanation: "RDS Proxy gerencia automaticamente o pool de conexões, evitando esgotamento de conexões e melhorando a performance com reutilização de conexões entre invocações Lambda. É a solução recomendada pela AWS para este cenário.",
        awsLink: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de tecnologia educacional está desenvolvendo uma plataforma de cursos online que atenderá milhões de estudantes globalmente. A API precisa implementar autenticação robusta para proteger conteúdo premium e dados pessoais dos usuários. A equipe decidiu usar tokens JWT para manter sessões de usuário, mas precisa de uma solução que permita validação customizada e cache para otimizar performance.\n\nComo implementar autenticação JWT personalizada em uma API Gateway?",
        options: [
            "Configurar autenticação básica HTTP com usuário e senha",
            "Usar apenas API Keys estáticas para cada usuário",
            "Usar apenas IAM roles sem tokens customizados",
            "Implementar Lambda Authorizer para validar tokens JWT com lógica customizada"
        ],
        correct: 3,
        explanation: "Lambda Authorizer permite validação customizada de tokens JWT, oferecendo flexibilidade para implementar lógica de autenticação específica, cache de resultados e integração com sistemas externos de autenticação.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-lambda-function-create.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de e-commerce que opera durante a Black Friday está enfrentando problemas de performance em seu banco de dados DynamoDB. Durante picos de tráfego, algumas partições estão recebendo muito mais requisições que outras, causando throttling e impactando a experiência do cliente. O time de arquitetura precisa implementar uma solução que distribua melhor a carga entre as partições.\n\nQual estratégia implementar para resolver o problema de hot partitions no DynamoDB?",
        options: [
            "Aumentar uniformemente a capacidade provisionada de todas as partições",
            "Implementar sharding na chave de partição adicionando sufixos aleatórios",
            "Migrar todos os dados para Amazon RDS para evitar partições",
            "Usar apenas Global Secondary Indexes para todas as consultas"
        ],
        correct: 1,
        explanation: "Sharding da chave de partição com sufixos aleatórios distribui a carga uniformemente entre partições, evitando hot partitions e melhorando o throughput. Esta é a prática recomendada pela AWS para resolver este problema.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html"
    },
    {
        domain: "Otimização",
        question: "Uma startup de delivery de comida está crescendo rapidamente e seus custos com AWS Lambda aumentaram 300% no último trimestre. A arquitetura tem tráfego muito variável - picos durante horários de almoço/jantar e baixo tráfego durante madrugadas. O CEO quer otimizar custos sem comprometer a experiência do usuário durante picos.\n\nQuais estratégias implementar para otimizar custos de Lambda? (Selecione DUAS respostas)",
        options: [
            "Usar sempre Provisioned Concurrency para garantir performance máxima",
            "Combinar on-demand pricing com Provisioned Concurrency apenas para funções críticas",
            "Otimizar configuração de memória baseado em profiling de performance real",
            "Migrar toda arquitetura para EC2 com Reserved Instances"
        ],
        correct: [1, 2],
        multipleCorrect: true,
        explanation: "Para otimizar custos: 1) On-demand para tráfego variável + Provisioned Concurrency seletivo para funções críticas, 2) Profiling de memória garante configuração ótima custo/performance, evitando over-provisioning.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de saúde digital que processa dados de pacientes precisa implementar criptografia robusta para compliance com HIPAA. A arquitetura usará DynamoDB para armazenar registros médicos sensíveis e o CISO exige controle total sobre chaves de criptografia, incluindo rotação e audit trails detalhados.\n\nComo implementar encryption at rest adequada para este cenário de compliance?",
        options: [
            "Usar apenas HTTPS para criptografia em trânsito, sem encryption at rest",
            "Implementar apenas application-level encryption no código da aplicação",
            "Habilitar DynamoDB encryption com AWS KMS customer managed keys",
            "Confiar na criptografia padrão do DynamoDB sem configurações adicionais"
        ],
        correct: 2,
        explanation: "DynamoDB encryption com KMS customer managed keys oferece controle total sobre chaves, rotação automática, audit trails detalhados via CloudTrail e compliance com regulamentações de saúde como HIPAA.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/EncryptionAtRest.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de serviços financeiros desenvolveu microserviços Lambda que fazem integrações com APIs de bancos externos para validação de contas e consulta de saldos. Durante horários comerciais, os cold starts de 2-4 segundos estão causando timeouts nas consultas bancárias e frustração dos clientes. As funções fazem chamadas HTTP para múltiplas APIs externas.\n\nComo otimizar cold starts em funções Lambda que integram com APIs externas?",
        options: [
            "Aumentar apenas a memória da função para 10GB",
            "Usar Provisioned Concurrency e otimizar inicialização de clientes SDK",
            "Reduzir o timeout da função para forçar execução mais rápida",
            "Migrar para runtime Python interpretado apenas"
        ],
        correct: 1,
        explanation: "Provisioned Concurrency mantém funções aquecidas eliminando cold starts, otimizar inicialização de clientes SDK (reutilizar conexões HTTP, connection pooling) reduz significativamente o tempo de setup para APIs externas.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de e-commerce com arquitetura serverless está enfrentando erros de 'too many connections' no banco RDS MySQL durante picos de tráfego. As funções Lambda que processam pedidos, pagamentos e atualizações de estoque estão criando centenas de conexões simultâneas, esgotando o pool de conexões do banco. O limite de conexões já foi aumentado, mas o problema persiste.\n\nComo resolver o problema de esgotamento de conexões entre Lambda e RDS?",
        options: [
            "Criar nova conexão a cada invocação Lambda para garantir isolamento",
            "Implementar connection pooling global dentro de cada função Lambda",
            "Implementar Amazon RDS Proxy para gerenciamento automático de conexões",
            "Migrar completamente para DynamoDB para evitar limites de conexão"
        ],
        correct: 2,
        explanation: "RDS Proxy gerencia automaticamente o pool de conexões, permitindo que centenas de funções Lambda compartilhem conexões eficientemente, evitando esgotamento e melhorando performance com reutilização de conexões.",
        awsLink: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma startup de ride-sharing está enfrentando throttling no DynamoDB durante horários de pico. A tabela de corridas usa 'driverId' como partition key, mas a maioria dos motoristas se concentra em áreas metropolitanas específicas, criando hot partitions. Alguns motoristas recebem centenas de solicitações por minuto enquanto outros em áreas rurais quase nenhuma.\n\nQual é a melhor solução para resolver hot partitions no DynamoDB?",
        options: [
            "Aumentar a capacidade de read/write uniformemente em todas as partições",
            "Redesenhar partition key com padrão de distribuição mais uniforme",
            "Migrar todas as consultas para usar apenas Global Secondary Indexes",
            "Migrar completamente para Amazon RDS com sharding manual"
        ],
        correct: 1,
        explanation: "Hot partitions ocorrem com concentração de tráfego. Redesenhar a partition key combinando 'driverId' com sufixos aleatórios ou usando 'region + driverId' distribui melhor os dados entre partições.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de IoT que coleta dados de sensores industriais está enfrentando falhas intermitentes ao enviar dados para APIs de terceiros devido à instabilidade da rede. As funções Lambda que processam os dados precisam implementar retry robusto para garantir que nenhuma leitura de sensor seja perdida, mas evitando sobrecarregar APIs já instáveis.\n\nComo implementar retry logic resiliente com backoff exponencial?",
        options: [
            "Usar apenas try-catch simples sem retry automático",
            "Implementar retry manual com setTimeout e intervalos fixos",
            "Usar AWS SDK retry configuration com exponential backoff nativo",
            "Deixar o API Gateway gerenciar todos os retries automaticamente"
        ],
        correct: 2,
        explanation: "AWS SDK possui configuração nativa de retry com exponential backoff, jitter e circuit breaker, mais confiável e testado que implementações manuais. Evita thundering herd e adapta-se automaticamente à instabilidade.",
        awsLink: "https://docs.aws.amazon.com/general/latest/gr/api-retries.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma aplicação web SPA (Single Page Application) hospedada em S3 precisa consumir APIs REST em diferentes domínios. O navegador está bloqueando as requisições com erro de CORS, impedindo que a aplicação funcione corretamente. A API usa API Gateway com Lambda backend e precisa suportar múltiplos origins.\n\nComo implementar CORS corretamente para APIs REST cross-domain?",
        options: [
            "Configurar CORS apenas no método OPTIONS do API Gateway",
            "Configurar CORS no API Gateway E retornar headers apropriados na Lambda",
            "Usar apenas headers CORS na resposta Lambda sem configuração no Gateway",
            "CORS não é necessário quando usando API Gateway como proxy"
        ],
        correct: 1,
        explanation: "CORS requer configuração completa: API Gateway para preflight OPTIONS requests E headers apropriados (Access-Control-Allow-Origin, etc.) nas respostas Lambda para suporte completo cross-domain.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma API pública de dados meteorológicos que serve desenvolvedores terceiros está sendo sobrecarregada por alguns clientes que fazem milhares de requisições por minuto, impactando a disponibilidade para outros usuários. A empresa quer implementar fair usage com diferentes tiers de acesso: gratuito (100 req/min), premium (1000 req/min) e enterprise (ilimitado).\n\nQual é a melhor abordagem para implementar rate limiting granular por usuário?",
        options: [
            "Implementar rate limiting apenas no código Lambda da aplicação",
            "Usar API Gateway Usage Plans com API Keys diferenciadas por tier",
            "Configurar rate limiting apenas no Application Load Balancer",
            "Não implementar rate limiting para não limitar desenvolvedores"
        ],
        correct: 1,
        explanation: "API Gateway Usage Plans com API Keys oferece rate limiting nativo por usuário/tier, com configuração granular de quotas (diárias/mensais) e throttling (req/seg) sem código adicional, ideal para APIs públicas com múltiplos tiers.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de rede social permite que usuários façam upload de fotos que precisam ser processadas para gerar thumbnails, aplicar filtros e detectar conteúdo inapropriado. O processamento atual síncrono na API está causando timeouts e frustração dos usuários. A empresa quer desacoplar o upload do processamento para melhorar a experiência do usuário.\n\nComo implementar processamento assíncrono eficiente de imagens?",
        options: [
            "Processar todas as imagens diretamente na função Lambda da API",
            "Usar S3 upload + Lambda triggers + SQS para processamento em lote",
            "Migrar para instâncias EC2 dedicadas para processamento de imagem",
            "Processar imagens no frontend usando JavaScript"
        ],
        correct: 1,
        explanation: "Upload direto para S3 (resposta imediata), Lambda triggers para processamento automático e SQS para gerenciar lotes oferece escalabilidade, desacoplamento e processamento eficiente sem impactar a API principal.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma aplicação de e-commerce com múltiplas instâncias Lambda precisa compartilhar dados de sessão de usuário, carrinho de compras e preferências entre diferentes funções. O cache local não funciona pois cada Lambda é stateless. A empresa precisa de uma solução de cache que ofereça baixa latência e alta disponibilidade.\n\nQual serviço implementar para cache distribuído entre funções Lambda?",
        options: [
            "Usar apenas cache local em memória em cada instância Lambda",
            "Implementar Amazon ElastiCache Redis Cluster para cache distribuído",
            "Usar Amazon S3 como sistema de cache com TTL",
            "Implementar cache diretamente no banco de dados principal"
        ],
        correct: 1,
        explanation: "ElastiCache Redis Cluster oferece cache distribuído de baixa latência (<1ms), alta disponibilidade com replicação automática, failover e escalabilidade horizontal, ideal para aplicações serverless.",
        awsLink: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Replication.Redis-RedisCluster.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de software que oferece API pública para desenvolvedores terceiros precisa lançar uma nova versão com breaking changes. Milhares de aplicações já integradas dependem da API v1, mas a v2 oferece funcionalidades essenciais. A empresa quer evitar quebrar integrações existentes enquanto permite migração gradual.\n\nComo implementar versionamento de API mantendo compatibilidade com clientes existentes?",
        options: [
            "Substituir a API v1 diretamente pela v2 forçando migração imediata",
            "Usar path-based versioning (/v1/, /v2/) com stages separados no API Gateway",
            "Usar apenas query parameters (?version=1) para controle de versão",
            "Não implementar versionamento para evitar complexidade"
        ],
        correct: 1,
        explanation: "Path-based versioning (/v1/, /v2/) com stages separados no API Gateway permite manter múltiplas versões simultaneamente, garantindo compatibilidade com clientes existentes enquanto permite migração gradual e controlada.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma aplicação bancária serverless precisa acessar credenciais de banco de dados de forma segura. As funções Lambda fazem conexões com múltiplos bancos (core banking, CRM, compliance) e cada um tem credenciais diferentes. O CISO exige rotação periódica de senhas e audit trail completo de acessos.\n\nQual é a melhor prática para gerenciar secrets de banco de dados em Lambda?",
        options: [
            "Armazenar todas as credentials em variáveis de ambiente criptografadas",
            "Usar AWS Secrets Manager com rotação automática e audit logging",
            "Fazer hardcode das credenciais no código da função",
            "Usar apenas IAM roles sem credenciais explícitas"
        ],
        correct: 1,
        explanation: "AWS Secrets Manager oferece armazenamento seguro com criptografia KMS, rotação automática de credentials, integração nativa com Lambda via SDK e audit trail completo via CloudTrail - essencial para compliance bancário.",
        awsLink: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html"
    },
    // Lote 1: Mais questões de Desenvolvimento (15-29)
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de mídia digital está desenvolvendo uma plataforma de compartilhamento de vídeos onde criadores de conteúdo fazem upload de arquivos de até 5GB. A arquitetura atual usa API Gateway REST para receber uploads, mas está enfrentando timeouts e limitações de payload. O time de produto quer uma solução que permita uploads diretos e seguros sem sobrecarregar a infraestrutura backend.\n\nQual é a melhor arquitetura para implementar uploads de arquivos grandes de forma eficiente?",
        options: [
            "Aumentar o limite de payload do API Gateway para suportar arquivos maiores",
            "Implementar presigned URLs do S3 para upload direto com validação de segurança",
            "Processar uploads via Lambda com timeout estendido de 15 minutos",
            "Usar apenas POST multipart através do API Gateway com chunking manual"
        ],
        correct: 1,
        explanation: "Presigned URLs do S3 permitem upload direto e seguro, evitando limitações do API Gateway (10MB), reduzindo latência, custos de data transfer e carga no backend. É a solução recomendada pela AWS para uploads grandes.",
        awsLink: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de e-commerce que integra com múltiplos fornecedores de pagamento está enfrentando problemas de cascading failures. Quando um provedor de pagamento fica indisponível, as funções Lambda continuam tentando se conectar, causando timeouts em cadeia que afetam todo o sistema. O arquiteto de soluções precisa implementar um padrão que detecte falhas rapidamente e evite sobrecarregar serviços já comprometidos.\n\nComo implementar circuit breaker pattern de forma eficiente para APIs externas em Lambda?",
        options: [
            "Usar apenas try-catch básico com logging de erros",
            "Implementar circuit breaker com DynamoDB para state tracking distribuído",
            "Aumentar timeout da função para 15 minutos e aguardar recovery",
            "Usar apenas retry exponential backoff sem limite de tentativas"
        ],
        correct: 1,
        explanation: "Circuit breaker com DynamoDB state tracking permite monitoramento distribuído do health de APIs externas, implementa fast-fail quando serviços estão down e previne cascading failures. O estado é compartilhado entre todas as instâncias Lambda.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um banco digital está desenvolvendo um sistema de transferência de dinheiro que precisa garantir consistência absoluta entre operações. Quando um usuário transfere dinheiro, o sistema deve debitar da conta origem, creditar na conta destino e registrar a transação no histórico - tudo de forma atômica. Se qualquer operação falhar, todas devem ser revertidas para manter a integridade financeira. A arquitetura usa DynamoDB para armazenar contas e transações em tabelas separadas.\n\nQual feature do DynamoDB implementar para garantir transações ACID em múltiplas tabelas?",
        options: [
            "Usar apenas eventual consistency e aceitar inconsistências temporárias",
            "Implementar DynamoDB Transactions com TransactWriteItems para atomicidade",
            "Executar múltiplas operações sequenciais com retry manual",
            "Migrar completamente para Amazon RDS com transações SQL"
        ],
        correct: 1,
        explanation: "DynamoDB Transactions com TransactWriteItems oferece ACID compliance para até 25 items em múltiplas tabelas, garantindo que todas as operações sejam executadas atomicamente ou todas sejam revertidas, essencial para operações financeiras.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de streaming de música com milhões de usuários precisa implementar funcionalidades de busca avançada. Os usuários querem filtrar músicas por gênero, artista, ano de lançamento e popularidade. A tabela principal do DynamoDB usa 'songId' como partition key, mas as consultas de busca precisam filtrar por outros atributos. As operações de scan estão consumindo muita capacidade e causando timeouts.\n\nComo otimizar performance de queries DynamoDB com filtros complexos em atributos não-chave?",
        options: [
            "Usar apenas scan operations com filtros mais específicos",
            "Implementar Global Secondary Indexes (GSI) para cada access pattern de busca",
            "Aumentar read capacity units para suportar mais scans simultâneos",
            "Usar apenas partition key queries e filtrar resultados no código"
        ],
        correct: 1,
        explanation: "GSIs permitem queries eficientes em atributos não-chave (gênero, artista, ano), evitando scans custosos da tabela principal. Cada GSI pode ser otimizado para access patterns específicos, melhorando drasticamente a performance e reduzindo custos.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma fintech que processa pagamentos PIX está enfrentando problemas com transações duplicadas. Devido à instabilidade da rede móvel, alguns clientes acabam enviando a mesma transferência múltiplas vezes quando o app não recebe confirmação imediata. Isso resultou em cobranças duplicadas e reclamações de clientes. O time de engenharia precisa garantir que cada transferência seja processada apenas uma vez, mesmo com múltiplas tentativas.\n\nQual estratégia implementar para garantir idempotência em operações críticas de pagamento?",
        options: [
            "Usar apenas timestamps para detectar requisições próximas no tempo",
            "Implementar idempotency keys com DynamoDB conditional writes",
            "Confiar apenas na validação do lado cliente para evitar duplicatas",
            "Usar apenas HTTP methods idêmpotentes como PUT"
        ],
        correct: 1,
        explanation: "Idempotency keys únicos (gerados pelo cliente) com DynamoDB conditional writes garantem que operações duplicadas sejam rejeitadas atomicamente, prevenindo side effects indesejados como cobranças duplicadas em sistemas financeiros.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#WorkingWithItems.ConditionalUpdate"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de jogos online está desenvolvendo um sistema de chat em tempo real para seus jogadores durante partidas multiplayer. O sistema precisa suportar milhares de jogadores simultâneos, enviando mensagens instantâneas, notificações de eventos do jogo e atualizações de status. A arquitetura atual usa polling HTTP a cada segundo, mas está gerando muito tráfego desnecessário e latência alta.\n\nComo implementar comunicação real-time eficiente em arquitetura serverless?",
        options: [
            "Manter polling HTTP mais frequente para reduzir latência",
            "Implementar WebSockets com API Gateway e Lambda para comunicação bidirecional",
            "Usar apenas email notifications para eventos importantes",
            "Implementar long polling HTTP com timeout de 30 segundos"
        ],
        correct: 1,
        explanation: "API Gateway WebSockets com Lambda oferece comunicação bidirecional real-time de baixa latência, ideal para chat, notifications instantâneas e updates live em jogos. Elimina overhead do polling e melhora a experiência do usuário.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema de gestão de estoque de uma rede de farmácias precisa processar atualizações de inventário em ordem cronológica exata. Quando um medicamento é vendido, transferido entre lojas ou recebido do fornecedor, essas operações devem ser processadas na sequência correta para manter a precisão do estoque. Processar eventos fora de ordem pode resultar em estoque negativo ou vendas de produtos indisponíveis.\n\nQual serviço AWS usar para garantir processamento de eventos em ordem cronológica?",
        options: [
            "Amazon SQS Standard Queue com processamento paralelo",
            "Amazon SQS FIFO Queue com message group ID por produto",
            "Amazon SNS apenas para broadcast de eventos",
            "AWS Lambda direct invocation síncrona"
        ],
        correct: 1,
        explanation: "SQS FIFO Queue com message group ID (por produto/loja) garante que eventos relacionados ao mesmo item sejam processados em ordem cronológica, essencial para manter consistência de estoque em sistemas críticos.",
        awsLink: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de saúde digital que gerencia prontuários eletrônicos precisa garantir que todos os dados de pacientes sejam rigorosamente validados antes do armazenamento. A API recebe informações críticas como CPF, data de nascimento, alergias e medicamentos. Dados inválidos podem comprometer diagnósticos e tratamentos. O sistema deve ser resiliente contra ataques de injeção e garantir compliance com LGPD.\n\nComo implementar validação de dados robusta e em múltiplas camadas?",
        options: [
            "Implementar validação apenas no frontend para melhor UX",
            "Usar API Gateway request validation combinado com Lambda input validation",
            "Confiar apenas na validação do cliente e bibliotecas JavaScript",
            "Validar dados apenas no banco de dados com constraints"
        ],
        correct: 1,
        explanation: "Validação em múltiplas camadas oferece defense in depth: API Gateway valida schema/formato básico (performance), Lambda implementa business rules complexas (CPF, regras médicas), garantindo segurança e compliance.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-method-request-validation.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de pesquisa de mercado recebe diariamente arquivos CSV de 2-5GB contendo dados de vendas de milhares de lojas. O processamento atual usando Lambda está falhando por timeout (15 min) e consumindo muita memória. A empresa precisa extrair apenas vendas de produtos específicos e calcular métricas agregadas. O time quer uma solução serverless que seja eficiente em custos e performance.\n\nQual estratégia usar para processar arquivos CSV grandes de forma eficiente?",
        options: [
            "Processar o arquivo completo em uma única invocação Lambda com timeout máximo",
            "Usar S3 Select para filtering combinado com processamento Lambda em chunks",
            "Aumentar memória Lambda para 10GB e processar tudo em memória",
            "Migrar para instâncias EC2 dedicadas para processamento batch"
        ],
        correct: 1,
        explanation: "S3 Select filtra dados diretamente no storage (reduzindo data transfer), Lambda processa chunks menores em paralelo (evitando timeouts), otimizando performance, custos e mantendo arquitetura serverless.",
        awsLink: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de streaming de vídeo tem arquitetura de microserviços onde o serviço de recomendações depende de APIs externas de machine learning para sugerir conteúdo personalizado. Durante picos de tráfego ou instabilidade das APIs de ML, o serviço de recomendações falha completamente, deixando usuários sem sugestões de conteúdo. O produto manager quer manter a funcionalidade básica mesmo quando dependências externas falham.\n\nComo implementar graceful degradation para manter funcionalidade parcial?",
        options: [
            "Falhar completamente e exibir mensagem de erro quando APIs externas estão indisponíveis",
            "Implementar fallback responses com conteúdo popular e circuit breakers",
            "Usar retry infinito até as APIs externas voltarem a funcionar",
            "Ignorar completamente erros de dependências e não exibir recomendações"
        ],
        correct: 1,
        explanation: "Fallback responses (conteúdo popular/trending) e circuit breakers mantêm funcionalidade parcial quando dependências falham, oferecendo melhor user experience que falha completa ou tela em branco.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de e-learning com milhões de cursos precisa implementar busca avançada onde estudantes possam encontrar conteúdo por palavras-chave, categoria, instrutor, avaliações e preço. O DynamoDB armazena metadados dos cursos, mas não suporta full-text search nativo. As operações de scan para busca textual estão consumindo muita capacidade e oferecendo resultados lentos e imprecisos.\n\nQual abordagem implementar para funcionalidade de busca avançada em dados DynamoDB?",
        options: [
            "Usar apenas scan operations com filtros mais específicos",
            "Integrar Amazon OpenSearch para full-text search e faceted filtering",
            "Implementar algoritmos de busca customizados no código da aplicação",
            "Usar apenas query operations com GSI para cada campo de busca"
        ],
        correct: 1,
        explanation: "Amazon OpenSearch oferece full-text search, faceted search, auto-complete, ranking por relevância e analytics avançados, complementando DynamoDB para casos de uso complexos de busca.",
        awsLink: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma API de pagamentos que processa 100.000 transações por minuto precisa implementar logging para auditoria e troubleshooting, mas os custos do CloudWatch estão crescendo exponencialmente. A equipe de compliance exige logs detalhados, mas o CFO quer otimizar custos sem perder visibilidade operacional crítica.\n\nComo implementar logging eficiente para APIs de alto volume?",
        options: [
            "Logar todas as requisições e respostas completas em CloudWatch",
            "Usar sampling inteligente com structured logging e retenção otimizada",
            "Não implementar logging para reduzir custos",
            "Logar apenas errors e exceptions críticas"
        ],
        correct: 1,
        explanation: "Sampling inteligente (1% para sucesso, 100% para errors) com structured logging (JSON) e retenção diferenciada reduz custos mantendo visibilidade crítica para troubleshooting e compliance.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de API pública que serve milhares de desenvolvedores terceiros precisa implementar rate limiting para prevenir abuso e garantir fair usage. O sistema atual permite que alguns clientes consumam recursos excessivos, impactando a performance para outros usuários. A solução deve ser distribuída entre múltiplas regiões AWS.\n\nQual estratégia implementar para rate limiting distribuído eficiente?",
        options: [
            "Implementar rate limiting apenas local em cada instância",
            "Usar ElastiCache Redis com sliding window algorithm distribuído",
            "Implementar rate limiting apenas no API Gateway sem persistência",
            "Não implementar rate limiting para não limitar desenvolvedores"
        ],
        correct: 1,
        explanation: "ElastiCache Redis com sliding window algorithm oferece rate limiting distribuído preciso, compartilhado entre múltiplas instâncias e regiões, garantindo fair usage e proteção contra abuso.",
        awsLink: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema bancário precisa implementar auditoria completa onde cada mudança em contas, transferências e transações seja rastreada para compliance regulatório. O sistema deve manter histórico imutável de eventos, permitir reconstrução do estado em qualquer momento e suportar consultas analíticas sobre padrões de transações.\n\nComo implementar event sourcing em arquitetura serverless para auditoria bancária?",
        options: [
            "Usar apenas database relacional tradicional com triggers",
            "Implementar DynamoDB Streams com Lambda para event processing e S3 para storage",
            "Usar apenas arquivos JSON em S3 para armazenar eventos",
            "Implementar event store em memória com persistência periódica"
        ],
        correct: 1,
        explanation: "DynamoDB Streams captura todas as mudanças como eventos imutáveis, Lambda processa para criar projections e views, S3 oferece storage durável para compliance de longo prazo.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html"
    },
    // DOMÍNIO: SEGURANÇA (101 questões - 26%)
    {
        domain: "Segurança",
        question: "Uma empresa de saúde que processa dados sensíveis de pacientes está migrando para arquitetura serverless. As funções Lambda precisam acessar um banco RDS em subnet privada para consultar prontuários médicos, mas também devem fazer chamadas para APIs externas de laboratórios para buscar resultados de exames. O CISO exige isolamento máximo dos dados sensíveis enquanto permite conectividade controlada.\n\nComo configurar Lambda para acessar recursos privados mantendo segurança adequada?",
        options: [
            "Colocar Lambda em subnet pública para facilitar acesso à internet",
            "Configurar Lambda em subnet privada com NAT Gateway para saída controlada",
            "Usar apenas security groups sem isolamento de rede",
            "Não usar VPC e confiar apenas em criptografia de trânsito"
        ],
        correct: 1,
        explanation: "Lambda em subnet privada isola recursos sensíveis, NAT Gateway permite saída controlada para APIs externas, security groups implementam firewall granular - essencial para compliance em saúde.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html"
    },
    {
        domain: "Segurança",
        question: "Uma fintech que opera globalmente precisa implementar HTTPS em todas as suas APIs e sites para proteger transações financeiras. A empresa quer automatizar o gerenciamento de certificados SSL/TLS, incluindo renovação automática e distribuição para múltiplos domínios e subdomínios em diferentes regiões AWS.\n\nQual serviço AWS usar para gerenciar certificados SSL/TLS de forma automatizada?",
        options: [
            "AWS Certificate Manager (ACM) com renovação automática",
            "AWS KMS para criptografia de certificados",
            "AWS Secrets Manager para armazenar certificados",
            "AWS CloudHSM para geração de chaves"
        ],
        correct: 0,
        explanation: "AWS Certificate Manager (ACM) é o serviço dedicado para provisionar, gerenciar e renovar automaticamente certificados SSL/TLS, com integração nativa com CloudFront, ALB e API Gateway.",
        awsLink: "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de tecnologia com equipes distribuídas globalmente precisa implementar gestão de permissões IAM eficiente. A empresa tem 500+ desenvolvedores, múltiplos projetos e ambientes (dev/staging/prod). O time de segurança quer reutilizar policies entre diferentes usuários e roles, mas também precisa de policies específicas para casos especiais.\n\nQual é a diferença entre inline policies e managed policies no contexto de gestão em escala?",
        options: [
            "Não há diferença prática entre os dois tipos",
            "Inline policies são mais reutilizáveis que managed policies",
            "Managed policies podem ser anexadas a múltiplos usuários/roles e versionadas",
            "Inline policies oferecem mais permissões que managed policies"
        ],
        correct: 2,
        explanation: "Managed policies são reutilizáveis entre múltiplos usuários/grupos/roles, oferecem versionamento e audit trail. Inline policies são 1:1 com a entidade, ideais para permissões específicas e únicas.",
        awsLink: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html"
    },
    {
        domain: "Segurança",
        question: "Uma startup de IoT que gerencia sensores industriais precisa criar IAM roles para diferentes tipos de dispositivos e aplicações. Sensores de temperatura devem apenas enviar dados para um tópico IoT específico, enquanto gateways podem ler configurações do Parameter Store. O CISO exige implementação rigorosa do princípio de menor privilégio para minimizar riscos de segurança.\n\nComo implementar least privilege para IAM roles que acessam múltiplos serviços AWS?",
        options: [
            "Usar managed policy AmazonFullAccess para simplificar gestão",
            "Criar custom policies com ações específicas e resource ARNs exatos",
            "Usar apenas inline policies sem especificar recursos",
            "Dar permissões de administrador para evitar problemas de acesso"
        ],
        correct: 1,
        explanation: "Custom policies com ações específicas (iot:Publish) e resource ARNs exatos (arn:aws:iot:region:account:topic/temperature/*) implementam least privilege, reduzindo superfície de ataque e limitando impacto de compromissos.",
        awsLink: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege"
    },
    {
        domain: "Segurança",
        question: "Uma plataforma de e-commerce que processa milhões de transações durante eventos como Black Friday está sendo alvo de ataques DDoS coordenados e tentativas de fraude. A API pública precisa manter disponibilidade para clientes legítimos enquanto bloqueia tráfego malicioso. A empresa quer uma solução em múltiplas camadas para máxima proteção.\n\nQual combinação de serviços implementar para proteção abrangente contra DDoS?",
        options: [
            "Usar apenas API Gateway throttling básico",
            "CloudFront + AWS Shield Advanced + WAF com rules customizadas",
            "Confiar apenas em security groups para filtering",
            "Usar apenas Application Load Balancer com health checks"
        ],
        correct: 1,
        explanation: "CloudFront distribui carga globalmente, Shield Advanced oferece proteção DDoS dedicada com response team, WAF implementa rules customizadas para filtering de application-layer attacks - solução completa em múltiplas camadas.",
        awsLink: "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-responding.html"
    },
    {
        domain: "Segurança",
        question: "Um hospital que implementa prontuários eletrônicos precisa garantir que dados de pacientes estejam protegidos em conformidade com LGPD e regulamentações de saúde. O DynamoDB armazena informações médicas sensíveis e o hospital precisa de controle total sobre chaves de criptografia, incluindo rotação e auditoria detalhada para inspeções regulatórias.\n\nComo implementar encryption at rest adequada para dados médicos sensíveis?",
        options: [
            "Usar apenas application-level encryption no código da aplicação",
            "Habilitar DynamoDB encryption com AWS KMS customer managed keys",
            "Confiar apenas em HTTPS para criptografia em trânsito",
            "Encryption at rest não é necessária para dados em DynamoDB"
        ],
        correct: 1,
        explanation: "DynamoDB encryption com KMS customer managed keys oferece controle total sobre chaves, rotação automática, audit trails detalhados via CloudTrail e compliance com regulamentações de saúde - essencial para dados médicos.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/EncryptionAtRest.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de tecnologia financeira está sendo alvo de ataques sofisticados incluindo tentativas de acesso não autorizado, mineração de criptomoedas e exfiltração de dados. A equipe de segurança quer implementar detecção automática de ameaças e resposta imediata para isolar recursos comprometidos sem intervenção manual 24/7.\n\nComo implementar detecção e resposta automática a atividades maliciosas?",
        options: [
            "Usar apenas CloudWatch alarms com thresholds manuais",
            "Amazon GuardDuty com EventBridge para automated incident response",
            "Implementar monitoramento manual com equipe dedicada",
            "Usar apenas AWS Config para compliance checking"
        ],
        correct: 1,
        explanation: "GuardDuty usa machine learning para detectar ameaças em tempo real, EventBridge permite automated response via Lambda para isolar recursos comprometidos, bloquear IPs maliciosos e notificar equipes - essencial para fintech.",
        awsLink: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_cloudwatch.html"
    },
    {
        domain: "Segurança",
        question: "Uma startup de delivery desenvolveu um app móvel para entregadores e clientes que precisa autenticar usuários de forma segura. O app acessa APIs sensíveis (localização, pagamentos, dados pessoais) e precisa suportar login social (Google, Facebook), autenticação multifator e gestão de sessões com expiração automática.\n\nComo implementar autenticação segura e robusta para mobile apps?",
        options: [
            "Usar API keys hardcoded no código do app móvel",
            "Implementar Amazon Cognito com JWT tokens e refresh mechanism",
            "Usar apenas basic authentication com usuário e senha",
            "Não implementar autenticação para simplificar UX"
        ],
        correct: 1,
        explanation: "Amazon Cognito oferece user pools, federated identity (Google/Facebook), JWT tokens com expiração, refresh tokens, MFA e gestão completa de sessões - solução robusta para mobile apps.",
        awsLink: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de e-commerce que opera 24/7 precisa armazenar credenciais de APIs de pagamento (Stripe, PayPal) e chaves de integração com fornecedores. Por compliance PCI-DSS, as credenciais devem ser rotacionadas mensalmente e todo acesso deve ser auditado. A empresa quer automatizar completamente a rotação para evitar interrupções no serviço.\n\nQual serviço usar para gerenciar secrets com rotação automática?",
        options: [
            "Armazenar credenciais em variáveis de ambiente criptografadas",
            "AWS Secrets Manager com Lambda rotation functions customizadas",
            "Fazer hardcode das credenciais no código com deploy para atualizar",
            "Usar apenas Systems Manager Parameter Store sem rotação"
        ],
        correct: 1,
        explanation: "AWS Secrets Manager oferece rotação automática via Lambda functions, encryption com KMS, fine-grained access control, audit trail completo e integração nativa - essencial para compliance PCI-DSS.",
        awsLink: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de saúde digital com arquitetura de microserviços precisa implementar isolamento rigoroso entre diferentes tipos de dados (prontuários, billing, analytics). Cada microserviço deve acessar apenas recursos específicos e o tráfego entre serviços deve ser controlado granularmente para compliance HIPAA.\n\nComo implementar network segmentation eficaz para microserviços em VPC?",
        options: [
            "Usar apenas uma subnet pública para todos os microserviços",
            "Implementar subnets privadas com NACLs e security groups granulares",
            "Usar apenas security groups sem segmentação de rede",
            "Não implementar segmentação para simplificar arquitetura"
        ],
        correct: 1,
        explanation: "Subnets privadas isolam microserviços por função, NACLs controlam tráfego no nível de subnet, security groups oferecem controle granular por instância - essencial para compliance HIPAA.",
        awsLink: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html"
    },
    {
        domain: "Segurança",
        question: "Uma instituição financeira precisa implementar auditoria completa de todas as ações realizadas em sua infraestrutura AWS para compliance com regulamentações bancárias (BACEN). Toda mudança de configuração, acesso a dados e operação administrativa deve ser registrada de forma imutável e auditável por órgãos reguladores.\n\nQual estratégia implementar para audit logging robusto e compliance?",
        options: [
            "Logar eventos apenas em arquivos locais nas instâncias",
            "Usar CloudTrail + CloudWatch Logs com S3 tamper-proof storage",
            "Implementar logging manual com planilhas Excel",
            "Não implementar audit logging para evitar overhead"
        ],
        correct: 1,
        explanation: "CloudTrail captura todas as API calls, CloudWatch Logs oferece centralized logging, S3 com MFA delete e Object Lock garante tamper-proof storage imutável - essencial para compliance bancário.",
        awsLink: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
    },
    {
        domain: "Segurança",
        question: "Uma plataforma de e-commerce que processa dados de cartão de crédito está sendo alvo de ataques de injeção SQL e XSS através de formulários de checkout. As funções Lambda que processam pagamentos recebem dados diretamente de formulários web e fazem consultas ao banco de dados. A empresa precisa implementar múltiplas camadas de proteção para compliance PCI-DSS.\n\nComo proteger funções Lambda contra ataques de injeção?",
        options: [
            "Confiar apenas na validação de input do lado cliente",
            "Implementar input sanitization + parameterized queries + AWS WAF",
            "Usar apenas try-catch para capturar erros de injeção",
            "Ataques de injeção não afetam funções Lambda"
        ],
        correct: 1,
        explanation: "Defense in depth: input sanitization previne injeção no código, parameterized queries protegem database, AWS WAF filtra requests maliciosos antes de chegarem à Lambda - essencial para PCI-DSS.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html"
    },
    // DOMÍNIO: IMPLANTAÇÃO (94 questões - 24%)
    {
        domain: "Implantação",
        question: "Uma startup de delivery que cresceu rapidamente precisa profissionalizar seus processos de desenvolvimento. Atualmente, os desenvolvedores fazem deploy manual via console AWS, o que está causando inconsistências entre ambientes e bugs em produção. O CTO quer implementar CI/CD completo com testes automatizados, validação de qualidade e deploy seguro para a arquitetura serverless existente.\n\nQual arquitetura de CI/CD implementar para aplicações serverless com automação completa?",
        options: [
            "Continuar com deploy manual via console para manter controle",
            "CodeCommit + CodeBuild + CodePipeline + SAM com testes automatizados",
            "Usar apenas scripts bash executados localmente pelos desenvolvedores",
            "Deploy direto via AWS CLI sem pipeline estruturado"
        ],
        correct: 1,
        explanation: "Pipeline completo com CodeCommit (source control), CodeBuild (build/test), CodePipeline (orchestration) e SAM (Infrastructure as Code) oferece automação total, consistência entre ambientes e deploy seguro.",
        awsLink: "https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-serverless-applications.html"
    },
    {
        domain: "Implantação",
        question: "Uma plataforma de streaming que opera 24/7 globalmente precisa fazer deploys de novas features sem causar interrupções no serviço. A arquitetura serverless atual usa Lambda para processamento de vídeo, e qualquer downtime durante deploy resulta em perda de receita significativa. O time de produto quer capacidade de rollback instantâneo caso problemas sejam detectados.\n\nComo implementar deployment strategy com zero downtime para Lambda?",
        options: [
            "Substituir a função Lambda diretamente durante horários de baixo tráfego",
            "Usar Lambda Aliases com weighted traffic shifting e rollback automático",
            "Fazer deploy apenas durante janelas de manutenção programadas",
            "Usar apenas versões numeradas sem estratégia de traffic shifting"
        ],
        correct: 1,
        explanation: "Lambda Aliases com weighted routing permite shift gradual de tráfego (ex: 10% -> 50% -> 100%) entre versões, monitoramento de métricas e rollback instantâneo se problemas forem detectados, garantindo zero downtime.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa global de e-commerce opera em 5 regiões AWS (US, Europa, Ásia, América Latina e Oceania) para atender clientes localmente com baixa latência. A arquitetura serverless precisa ser idêntica em todas as regiões para garantir consistência de funcionalidades. Atualmente, o deploy manual em cada região está causando inconsistências e demora 2 dias para completar todas as regiões.\n\nQual ferramenta usar para deployment coordenado e consistente em múltiplas regiões?",
        options: [
            "Continuar com deploy manual sequencial em cada região",
            "AWS CloudFormation StackSets para deployment multi-region coordenado",
            "Scripts bash com loops para automatizar deploy sequencial",
            "Deploy manual paralelo com equipes dedicadas por região"
        ],
        correct: 1,
        explanation: "CloudFormation StackSets permite deployment coordenado e simultâneo em múltiplas regiões/contas, garantindo consistência de infraestrutura, rollback automático em caso de falhas e redução drástica do tempo de deploy.",
        awsLink: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html"
    },
    {
        domain: "Implantação",
        question: "Uma fintech que processa pagamentos críticos precisa implementar uma estratégia de deploy que minimize riscos para o negócio. Novas features da API de pagamentos devem ser testadas com uma pequena porção do tráfego real antes do rollout completo. O sistema deve detectar automaticamente problemas (aumento de errors, latência) e reverter para a versão anterior sem intervenção manual.\n\nComo implementar canary deployment com monitoring e rollback automáticos?",
        options: [
            "Fazer deploy completo imediatamente após testes unitários",
            "API Gateway canary deployment com CloudWatch alarms para rollback automático",
            "Usar apenas feature flags sem monitoring de métricas",
            "Deploy manual gradual com monitoramento visual"
        ],
        correct: 1,
        explanation: "API Gateway canary deployment direciona percentual controlado de tráfego (ex: 5% -> 25% -> 100%), CloudWatch alarms monitoram métricas críticas (error rate, latency) e executam rollback automático quando thresholds são ultrapassados.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de software que cresceu rapidamente tem 50+ desenvolvedores fazendo deploys manuais via console, causando inconsistências entre ambientes e configuration drift. O CTO quer implementar Infrastructure as Code para garantir reprodutibilidade, versionamento e rollback automático da infraestrutura. A equipe prefere usar linguagens de programação familiares.\n\nQual ferramenta usar para Infrastructure as Code com state management robusto?",
        options: [
            "Continuar com scripts bash manuais para cada ambiente",
            "AWS CDK com CloudFormation backend para state management",
            "Configuração manual via console AWS com documentação",
            "Usar apenas arquivos YAML estáticos sem versionamento"
        ],
        correct: 1,
        explanation: "AWS CDK oferece programação type-safe em linguagens familiares (TypeScript, Python), CloudFormation gerencia state automaticamente, drift detection e rollback automático - ideal para equipes de desenvolvimento.",
        awsLink: "https://docs.aws.amazon.com/cdk/v2/guide/home.html"
    },
    {
        domain: "Implantação",
        question: "Uma fintech que opera serviços críticos 24/7 precisa implementar promoção de código entre ambientes (dev -> staging -> prod) com validação rigorosa. Cada ambiente deve ter testes específicos e gates de qualidade antes da promoção. Falhas em produção podem resultar em perdas financeiras significativas.\n\nComo implementar environment promotion com validação automática robusta?",
        options: [
            "Promover código diretamente de dev para produção",
            "Pipeline com dev -> staging -> prod e automated testing gates",
            "Deploy manual em cada ambiente com aprovação visual",
            "Usar apenas um ambiente para simplificar processo"
        ],
        correct: 1,
        explanation: "Pipeline com gates automatizados garante qualidade progressiva: unit tests em dev, integration tests em staging, smoke tests em prod, com rollback automático - essencial para serviços financeiros críticos.",
        awsLink: "https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html"
    },
    {
        domain: "Implantação",
        question: "Uma plataforma de e-commerce que processa milhões de transações precisa fazer alterações no schema do banco de dados para adicionar novas funcionalidades. Durante a Black Friday, qualquer downtime ou corrupção de dados pode causar perdas milionárias. A empresa precisa de estratégia que permita rollback rápido se problemas forem detectados.\n\nQual abordagem usar para database migrations com rollback seguro?",
        options: [
            "Executar migrations apenas forward sem possibilidade de rollback",
            "Implementar backward-compatible migrations com rollback scripts testados",
            "Não implementar rollback para evitar complexidade",
            "Confiar apenas em restore de backup completo"
        ],
        correct: 1,
        explanation: "Backward-compatible migrations (additive changes) com rollback scripts testados permitem rollback seguro de aplicação sem quebrar database schema ou causar downtime - essencial para e-commerce crítico.",
        awsLink: "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_BestPractices.html"
    },
    {
        domain: "Implantação",
        question: "Uma startup de tecnologia quer lançar novas features gradualmente para diferentes segmentos de usuários (beta testers, premium users, todos) para minimizar riscos de deploy. A empresa precisa de capacidade de ativar/desativar features instantaneamente sem fazer novo deploy, especialmente durante eventos de alto tráfego.\n\nComo implementar feature flags para mitigação de riscos de deployment?",
        options: [
            "Usar apenas branches git separados para cada feature",
            "AWS AppConfig para gerenciamento centralizado de feature flags",
            "Fazer hardcode de flags booleanos no código da aplicação",
            "Usar apenas environment variables estáticas"
        ],
        correct: 1,
        explanation: "AWS AppConfig oferece feature flags centralizados, gradual rollout por segmento, instant rollback sem deploy, monitoring integrado e validação de configurações - ideal para deployment risk mitigation.",
        awsLink: "https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html"
    },
    {
        domain: "Implantação",
        question: "Uma plataforma de streaming de vídeo que atende milhões de usuários simultaneamente precisa detectar regressões de performance antes que afetem a experiência do usuário. Deploys anteriores causaram aumento de latência que resultou em churn de usuários. A empresa quer detectar automaticamente quando novas versões degradam performance.\n\nQual estratégia usar para detectar regressões de performance em deployments?",
        options: [
            "Não monitorar performance para acelerar deployments",
            "Automated performance testing com baseline comparison e thresholds",
            "Monitoramento manual de métricas após deploy",
            "Confiar apenas em feedback de usuários e reclamações"
        ],
        correct: 1,
        explanation: "Performance testing automatizado com baseline comparison detecta regressões (latência, throughput) antes de afetar usuários, com rollback automático quando thresholds são ultrapassados - essencial para streaming.",
        awsLink: "https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker-custom-image.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de serviços financeiros precisa gerenciar configurações sensíveis (URLs de APIs, chaves de criptografia, parâmetros de compliance) de forma segura entre múltiplos ambientes. As configurações mudam frequentemente e devem ser auditadas. Hardcoding no código viola políticas de segurança.\n\nComo implementar configuration management seguro para deployments?",
        options: [
            "Fazer hardcode de todas as configurações no código",
            "AWS Systems Manager Parameter Store com encryption e versionamento",
            "Usar apenas environment variables sem criptografia",
            "Armazenar configurações em arquivos no repositório git"
        ],
        correct: 1,
        explanation: "Parameter Store oferece configuration management centralizado, encryption com KMS, versionamento, access control granular e audit trail - essencial para configurações sensíveis financeiras.",
        awsLink: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"
    },
    // DOMÍNIO: OTIMIZAÇÃO (70 questões - 18%)
    {
        domain: "Otimização",
        question: "Uma plataforma de e-learning que serve conteúdo educacional para estudantes globalmente está enfrentando problemas de performance. As funções Lambda que processam uploads de vídeos e geram transcrições têm cold starts de 3-5 segundos, impactando a experiência do usuário. Durante horários de pico (manhã e noite), a latência aumenta significativamente.\n\nQual combinação de otimizações implementar para reduzir cold starts e melhorar performance?",
        options: [
            "Apenas aumentar memória das funções para 10GB",
            "Provisioned Concurrency + otimização de package + connection pooling",
            "Apenas reduzir timeout para forçar execução mais rápida",
            "Migrar completamente para instâncias EC2 dedicadas"
        ],
        correct: 1,
        explanation: "Combinação de Provisioned Concurrency (mantém funções aquecidas), package otimizado (reduz init time) e connection pooling (reutiliza conexões) minimiza cold starts e melhora performance significativamente.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html"
    },
    {
        domain: "Otimização",
        question: "Um sistema de e-commerce durante a Black Friday está enfrentando throttling no DynamoDB. Análises mostram que 80% das consultas se concentram em apenas 20% dos produtos (bestsellers), criando hot partitions. O tráfego é altamente desigual - alguns produtos recebem milhares de consultas por segundo enquanto outros quase nenhuma. A capacidade provisionada já está no máximo orçamentário.\n\nQual estratégia de otimização usar para resolver hot partitions sem aumentar custos?",
        options: [
            "Aumentar read/write capacity uniformemente em todas as partições",
            "Redesenhar partition key com sharding pattern e habilitar adaptive capacity",
            "Migrar todas as consultas para usar apenas Global Secondary Indexes",
            "Migrar completamente para Amazon RDS com read replicas"
        ],
        correct: 1,
        explanation: "Redesign da partition key com sharding (ex: productId + random suffix) distribui carga uniformemente, adaptive capacity redistribui automaticamente capacidade não utilizada para hot partitions, resolvendo o problema sem custos adicionais.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html"
    },
    {
        domain: "Otimização",
        question: "Uma startup de food delivery que cresceu 500% durante a pandemia está enfrentando custos crescentes de AWS Lambda. O tráfego é altamente variável - picos durante almoço/jantar (12h-14h, 19h-21h) e baixo tráfego durante madrugadas. Algumas funções críticas (processamento de pedidos) precisam de latência baixa sempre, enquanto outras (relatórios) podem tolerar cold starts.\n\nComo otimizar custos mantendo performance adequada para tráfego variável?",
        options: [
            "Usar Provisioned Concurrency em todas as funções para garantir performance",
            "Combinar on-demand pricing com Provisioned Concurrency seletivo",
            "Migrar toda arquitetura para EC2 com Reserved Instances",
            "Usar apenas containers em ECS com auto scaling"
        ],
        correct: 1,
        explanation: "On-demand pricing para funções com tráfego variável (paga apenas pelo uso), Provisioned Concurrency apenas para funções críticas (processamento de pedidos) otimiza custos mantendo performance onde necessário.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de jogos online que atende jogadores em América do Norte, Europa e Ásia está enfrentando reclamações sobre latência alta. Jogadores europeus relatam delays de 200-300ms ao acessar APIs hospedadas apenas em us-east-1. A experiência de jogo em tempo real é crítica para retenção de usuários e receita.\n\nQual arquitetura implementar para reduzir latência globalmente?",
        options: [
            "Manter apenas uma região central para simplificar arquitetura",
            "CloudFront + API Gateway regional + edge-optimized caching",
            "Usar apenas Application Load Balancer com health checks",
            "Construir data centers próprios em cada continente"
        ],
        correct: 1,
        explanation: "CloudFront edge locations (200+ globalmente) + API Gateway regional endpoints + caching em múltiplas camadas reduzem latência para <50ms globalmente, melhorando drasticamente a experiência de jogo.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-basic-concept.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de e-commerce com catálogo de milhões de produtos está enfrentando timeouts ao carregar listas de produtos. As queries DynamoDB retornam datasets grandes (10MB+) causando latência alta e consumo excessivo de read capacity. A interface precisa mostrar apenas nome, preço e imagem, mas as queries trazem todos os atributos dos produtos.\n\nComo otimizar performance de queries DynamoDB com large result sets?",
        options: [
            "Usar apenas scan operations para buscar todos os produtos",
            "Implementar paginação com LastEvaluatedKey e projection expressions",
            "Aumentar read capacity units infinitamente para suportar queries grandes",
            "Carregar todo o catálogo em memória da aplicação"
        ],
        correct: 1,
        explanation: "Paginação com LastEvaluatedKey evita timeouts, projection expressions retornam apenas atributos necessários (nome, preço, imagem), otimizando performance e reduzindo custos de data transfer.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Pagination.html"
    },
    {
        domain: "Otimização",
        question: "Uma startup global que serve conteúdo para usuários em 6 continentes está enfrentando custos crescentes de data transfer entre regiões AWS. Os custos de transfer representam 40% da conta mensal. A empresa precisa otimizar sem comprometer a experiência do usuário ou disponibilidade global.\n\nQual estratégia usar para otimizar custos de data transfer globalmente?",
        options: [
            "Ignorar custos de transfer e focar apenas em performance",
            "CloudFront + S3 Transfer Acceleration + otimização regional",
            "Usar apenas single AZ para reduzir custos de transfer",
            "Implementar compressão apenas no lado cliente"
        ],
        correct: 1,
        explanation: "CloudFront reduz transfer costs com cache global, S3 Transfer Acceleration otimiza uploads, otimização regional minimiza cross-region costs - combinação ideal para redução de custos globais.",
        awsLink: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de trading de alta frequencia precisa de observabilidade detalhada para detectar problemas de latência, mas o logging atual está adicionando 50ms de overhead por transação. Com milhões de transações por segundo, o overhead de observability está impactando a performance crítica do sistema.\n\nComo otimizar observability sem impactar performance crítica?",
        options: [
            "Logar todas as transações com detalhes completos sempre",
            "Sampling inteligente + async logging + structured data otimizado",
            "Não implementar observability para maximizar performance",
            "Logar apenas errors e exceptions críticas"
        ],
        correct: 1,
        explanation: "Sampling inteligente (1% normal, 100% errors) reduz overhead, async logging não bloqueia requests críticos, structured data facilita análise eficiente - essencial para trading de alta frequência.",
        awsLink: "https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html"
    },
    {
        domain: "Otimização",
        question: "Uma aplicação de gaming online com milhões de jogadores simultâneos está enfrentando hot spots no cache Redis que causam lag durante batalhas. Alguns shards do cache recebem 10x mais requisições que outros, criando gargalos. A latência do cache deve ser <1ms para manter a experiência de jogo fluida.\n\nComo otimizar performance de cache distribuído evitando hot spots?",
        options: [
            "Usar apenas cache local em cada servidor de jogo",
            "ElastiCache Redis Cluster com consistent hashing e TTL optimization",
            "Implementar cache apenas no banco de dados principal",
            "Usar cache em arquivos locais no sistema de arquivos"
        ],
        correct: 1,
        explanation: "Redis Cluster com consistent hashing distribui dados uniformemente evitando hot spots, TTL optimization melhora hit rate, replicação automática garante baixa latência - ideal para gaming.",
        awsLink: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Replication.Redis-RedisCluster.html"
    },
    {
        domain: "Otimização",
        question: "Uma empresa de mídia que armazena petábytes de conteúdo de vídeo tem diferentes padrões de acesso: vídeos recentes (acessados diariamente), arquivo mensal (acessado ocasionalmente) e arquivo histórico (raramente acessado). Os custos de storage representam 60% do orçamento de infraestrutura.\n\nComo otimizar custos de storage para dados com diferentes access patterns?",
        options: [
            "Usar apenas S3 Standard para todos os tipos de conteúdo",
            "S3 Intelligent Tiering + Lifecycle policies para otimização automática",
            "Manter todo conteúdo em volumes EBS de alta performance",
            "Não otimizar storage para evitar complexidade operacional"
        ],
        correct: 1,
        explanation: "S3 Intelligent Tiering move dados automaticamente entre tiers baseado em access patterns, Lifecycle policies automatizam transições (Standard -> IA -> Glacier -> Deep Archive) reduzindo custos em até 90%.",
        awsLink: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html"
    },
    {
        domain: "Otimização",
        question: "Uma arquitetura de microserviços com 50+ serviços está enfrentando latência alta devido a chamadas síncronas em cadeia. Cada requisição do usuário aciona 10-15 chamadas entre serviços, criando gargalos e pontos de falha. A empresa quer reduzir coupling e melhorar throughput.\n\nQual pattern usar para otimizar comunicação entre microserviços?",
        options: [
            "Manter todas as chamadas síncronas para garantir consistência",
            "Event-driven architecture com async messaging e batching",
            "Compartilhar banco de dados diretamente entre todos os serviços",
            "Implementar polling contínuo entre todos os serviços"
        ],
        correct: 1,
        explanation: "Event-driven architecture com EventBridge/SQS reduz coupling, async messaging melhora throughput eliminando blocking calls, batching otimiza network overhead - transformação essencial para microserviços escaláveis.",
        awsLink: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"
    }
];

// Continuação das questões de alta qualidade para completar 390
// Mais questões de Desenvolvimento (30-125)
const additionalDevelopmentQuestions = [
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de e-commerce durante eventos como Black Friday precisa garantir que apenas uma instância processe cada pedido para evitar cobranças duplicadas. Com centenas de funções Lambda processando pedidos simultaneamente, a empresa precisa implementar distributed locking que funcione em escala e seja resiliente a falhas.\n\nComo implementar distributed locking para evitar concurrent processing?",
        options: [
            "Usar apenas timestamps para detectar processamento simultâneo",
            "DynamoDB conditional writes com TTL para automatic lock expiration",
            "Implementar locking apenas em memória local de cada Lambda",
            "Usar apenas try-catch para detectar conflitos"
        ],
        correct: 1,
        explanation: "DynamoDB conditional writes garantem atomicidade para locks distribuídos, TTL oferece automatic cleanup de locks expirados evitando deadlocks, essencial para prevent duplicate processing em sistemas críticos.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#WorkingWithItems.ConditionalUpdate"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma fintech que processa transferências PIX precisa implementar retry logic robusto para chamadas a APIs do Banco Central. Durante instabilidades de rede, algumas requisições falham temporariamente, mas o sistema deve garantir que todas as transferências sejam processadas sem duplicação.\n\nQual estratégia implementar para retry resiliente?",
        options: [
            "Retry imediato sem delay entre tentativas",
            "Exponential backoff com jitter e circuit breaker",
            "Retry apenas uma vez após falha",
            "Não implementar retry para evitar duplicação"
        ],
        correct: 1,
        explanation: "Exponential backoff reduz carga em sistemas instáveis, jitter evita thundering herd, circuit breaker previne cascading failures - combinação essencial para sistemas financeiros críticos.",
        awsLink: "https://docs.aws.amazon.com/general/latest/gr/api-retries.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma startup de IoT que monitora sensores industriais recebe milhões de eventos por segundo. O sistema atual processa eventos sequencialmente, causando atrasos de até 30 minutos. A empresa precisa processar eventos em tempo real para alertas críticos de segurança.\n\nComo implementar stream processing para eventos IoT em tempo real?",
        options: [
            "Usar apenas SQS standard com polling sequencial",
            "Kinesis Data Streams com Lambda parallel processing",
            "Armazenar todos os eventos em S3 e processar em batch",
            "Usar apenas API Gateway com processamento síncrono"
        ],
        correct: 1,
        explanation: "Kinesis Data Streams oferece ingestão massiva de dados, Lambda parallel processing permite escalabilidade automática, ideal para processamento real-time de eventos IoT críticos.",
        awsLink: "https://docs.aws.amazon.com/kinesis/latest/dev/lambda-preprocessing.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de delivery precisa calcular rotas otimizadas em tempo real considerando tráfego, distância e prioridade de entrega. O algoritmo é computacionalmente intensivo e pode demorar até 45 segundos. A API precisa responder em menos de 3 segundos para manter boa UX.\n\nComo implementar processamento assíncrono com resposta rápida?",
        options: [
            "Aumentar timeout da Lambda para 15 minutos",
            "API Gateway + SQS + Lambda assíncrono com polling de status",
            "Processar tudo síncronamente na API principal",
            "Usar apenas cache estático de rotas pré-calculadas"
        ],
        correct: 1,
        explanation: "API Gateway responde imediatamente com job ID, SQS processa assincronamente, polling de status permite acompanhar progresso - padrão ideal para processamento longo com UX responsiva.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de educação online precisa implementar upload de vídeos de até 10GB. Professores relatam timeouts e falhas durante upload. A solução deve permitir resumo de uploads interrompidos e validação de integridade.\n\nQual arquitetura implementar para uploads grandes e confiáveis?",
        options: [
            "API Gateway REST com payload de 10MB máximo",
            "S3 Multipart Upload com presigned URLs e resumable uploads",
            "Lambda com timeout estendido para receber uploads",
            "Usar apenas FTP tradicional para uploads grandes"
        ],
        correct: 1,
        explanation: "S3 Multipart Upload permite uploads de até 5TB, presigned URLs oferecem segurança, resumable uploads garantem confiabilidade - solução ideal para arquivos grandes.",
        awsLink: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema de e-commerce precisa sincronizar inventário entre múltiplas lojas físicas e online em tempo real. Quando um produto é vendido em qualquer canal, o estoque deve ser atualizado instantaneamente em todos os outros para evitar overselling.\n\nComo implementar sincronização de dados em tempo real?",
        options: [
            "Polling de banco de dados a cada segundo",
            "DynamoDB Streams + EventBridge para propagação de eventos",
            "Sincronização manual via batch jobs noturnos",
            "Usar apenas cache local em cada loja"
        ],
        correct: 1,
        explanation: "DynamoDB Streams captura mudanças em tempo real, EventBridge distribui eventos para múltiplos targets, garantindo sincronização instantânea e confiável entre todos os canais.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma API de pagamentos que processa 50.000 transações por minuto está enfrentando throttling no DynamoDB durante picos. A tabela usa 'transactionId' como partition key, mas algumas transações são processadas em lote, criando hot partitions.\n\nComo resolver hot partitions mantendo performance?",
        options: [
            "Aumentar apenas read/write capacity units",
            "Redesenhar partition key com composite key + random suffix",
            "Migrar para Amazon RDS com sharding manual",
            "Usar apenas Global Secondary Indexes"
        ],
        correct: 1,
        explanation: "Composite key (ex: customerId + timestamp + random) distribui carga uniformemente, random suffix evita hot partitions, mantendo performance alta sem custos excessivos.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de streaming de música precisa implementar recomendações personalizadas baseadas no histórico de escuta. O algoritmo de ML precisa processar dados de milhões de usuários e deve ser atualizado diariamente com novos padrões de consumo.\n\nComo implementar pipeline de ML para recomendações em escala?",
        options: [
            "Processar tudo em Lambda com timeout máximo",
            "Step Functions + SageMaker + S3 para pipeline automatizado",
            "Usar apenas algoritmos simples em tempo real",
            "Processar manualmente em instâncias EC2"
        ],
        correct: 1,
        explanation: "Step Functions orquestra workflow complexo, SageMaker oferece ML managed, S3 armazena datasets massivos - pipeline completo para ML em produção.",
        awsLink: "https://docs.aws.amazon.com/step-functions/latest/dg/sample-project-container-task.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de jogos online precisa implementar matchmaking em tempo real para conectar jogadores com habilidades similares. O sistema deve considerar latência geográfica, nível de habilidade e tempo de espera para criar partidas balanceadas.\n\nComo implementar matchmaking distribuído eficiente?",
        options: [
            "Algoritmo centralizado em uma única região",
            "ElastiCache Redis Cluster + Lambda para matching distribuído",
            "Banco de dados relacional com queries complexas",
            "Matching manual por administradores"
        ],
        correct: 1,
        explanation: "Redis Cluster oferece baixa latência global, estruturas de dados avançadas para matching, Lambda processa algoritmos complexos - ideal para gaming real-time.",
        awsLink: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Replication.Redis-RedisCluster.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma fintech precisa implementar auditoria completa onde cada operação financeira gere eventos imutáveis para compliance. O sistema deve permitir reconstruir o estado de qualquer conta em qualquer momento histórico e suportar consultas analíticas.\n\nComo implementar event sourcing para auditoria financeira?",
        options: [
            "Logs simples em arquivos de texto",
            "EventBridge + S3 + Athena para event sourcing completo",
            "Apenas snapshots diários do estado atual",
            "Backup tradicional de banco de dados"
        ],
        correct: 1,
        explanation: "EventBridge captura todos os eventos, S3 oferece storage imutável e durável, Athena permite queries analíticas - arquitetura completa para event sourcing e compliance.",
        awsLink: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de logística precisa rastrear milhões de pacotes em tempo real. Cada pacote gera eventos de localização a cada 5 minutos. O sistema deve detectar anomalias (pacotes parados, rotas incorretas) e alertar automaticamente.\n\nComo implementar tracking e alertas em tempo real?",
        options: [
            "Polling manual de GPS a cada hora",
            "Kinesis Analytics + CloudWatch Alarms para detecção de anomalias",
            "Planilhas Excel com atualização manual",
            "Apenas relatórios diários de posição"
        ],
        correct: 1,
        explanation: "Kinesis Analytics processa streams em tempo real, detecta padrões e anomalias, CloudWatch Alarms dispara notificações automáticas - solução completa para tracking inteligente.",
        awsLink: "https://docs.aws.amazon.com/kinesisanalytics/latest/dev/what-is.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de e-learning precisa implementar sistema de chat em tempo real para aulas ao vivo com até 10.000 estudantes simultâneos. O chat deve suportar mensagens, reações, polls e moderação automática de conteúdo.\n\nComo implementar chat escalável para educação online?",
        options: [
            "WebSockets simples em EC2",
            "API Gateway WebSocket + Lambda + DynamoDB para chat distribuído",
            "Apenas comentários assíncronos",
            "Chat terceirizado sem integração"
        ],
        correct: 1,
        explanation: "API Gateway WebSocket escala automaticamente, Lambda processa mensagens, DynamoDB armazena histórico - arquitetura serverless ideal para chat de alta escala.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema bancário precisa processar transferências internacionais que envolvem validações em múltiplos sistemas (compliance, câmbio, limites, fraude). Se qualquer validação falhar, toda a operação deve ser revertida atomicamente.\n\nComo implementar transações distribuídas com rollback automático?",
        options: [
            "Transações SQL tradicionais entre sistemas",
            "Step Functions com saga pattern e compensating transactions",
            "Processamento manual com planilhas",
            "Aceitar inconsistências temporárias"
        ],
        correct: 1,
        explanation: "Step Functions orquestra saga pattern, compensating transactions revertem operações automaticamente, garantindo consistência em sistemas distribuídos - essencial para operações financeiras.",
        awsLink: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-standard-vs-express.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma startup de delivery precisa otimizar rotas de entrega considerando múltiplas variáveis: tráfego em tempo real, prioridade de pedidos, capacidade de veículos e janelas de entrega. O cálculo deve ser refeito dinamicamente quando novos pedidos chegam.\n\nComo implementar otimização de rotas dinâmica?",
        options: [
            "Algoritmos estáticos calculados uma vez por dia",
            "Lambda + SQS + ElastiCache para otimização contínua",
            "Rotas manuais definidas por despachantes",
            "Usar apenas GPS básico sem otimização"
        ],
        correct: 1,
        explanation: "Lambda executa algoritmos de otimização, SQS gerencia fila de recálculos, ElastiCache armazena rotas otimizadas - sistema dinâmico que se adapta em tempo real.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de IoT industrial monitora sensores críticos de segurança em fábricas. Quando valores excedem limites perigosos, o sistema deve disparar alertas instantâneos e acionar sistemas de emergência automaticamente.\n\nComo implementar alertas críticos com latência mínima?",
        options: [
            "Verificação manual de sensores a cada turno",
            "Kinesis + Lambda + SNS para alertas em tempo real",
            "Relatórios diários de anomalias",
            "Apenas logs para análise posterior"
        ],
        correct: 1,
        explanation: "Kinesis ingere dados de sensores em tempo real, Lambda processa regras de negócio, SNS dispara alertas instantâneos - latência mínima para segurança crítica.",
        awsLink: "https://docs.aws.amazon.com/kinesis/latest/dev/lambda-preprocessing.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de mídia social precisa implementar feed personalizado para milhões de usuários. O algoritmo deve considerar interações recentes, preferências do usuário e trending topics para ordenar posts relevantes.\n\nComo implementar feed personalizado em escala?",
        options: [
            "Feed cronológico simples sem personalização",
            "DynamoDB + Lambda + ElastiCache para personalização distribuída",
            "Algoritmo único para todos os usuários",
            "Personalização manual por moderadores"
        ],
        correct: 1,
        explanation: "DynamoDB armazena preferências e interações, Lambda executa algoritmos de personalização, ElastiCache oferece acesso rápido - arquitetura escalável para feeds personalizados.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema de e-commerce precisa implementar carrinho de compras que sincronize entre dispositivos (web, mobile, app) em tempo real. Quando um item é adicionado em qualquer dispositivo, deve aparecer instantaneamente nos outros.\n\nComo implementar sincronização cross-device?",
        options: [
            "Sincronização apenas no login",
            "DynamoDB + WebSockets + Push notifications para sync real-time",
            "Carrinho local sem sincronização",
            "Sincronização manual pelo usuário"
        ],
        correct: 1,
        explanation: "DynamoDB armazena estado do carrinho, WebSockets propagam mudanças instantaneamente, Push notifications alertam dispositivos offline - experiência unificada cross-device.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma fintech precisa implementar detecção de fraude em tempo real para transações de cartão. O sistema deve analisar padrões de comportamento, localização geográfica e histórico de compras para bloquear transações suspeitas instantaneamente.\n\nComo implementar detecção de fraude real-time?",
        options: [
            "Análise manual de transações suspeitas",
            "Kinesis + Lambda + SageMaker para ML fraud detection",
            "Apenas verificação de limite de cartão",
            "Bloqueio baseado apenas em valor da transação"
        ],
        correct: 1,
        explanation: "Kinesis processa transações em tempo real, Lambda executa regras de negócio, SageMaker oferece ML para detecção de padrões - proteção inteligente contra fraude.",
        awsLink: "https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de streaming de vídeo precisa implementar transcodificação automática de uploads. Vídeos devem ser convertidos para múltiplas resoluções (480p, 720p, 1080p, 4K) e formatos para compatibilidade com diferentes dispositivos.\n\nComo implementar pipeline de transcodificação escalável?",
        options: [
            "Processamento manual em software desktop",
            "S3 + Lambda + MediaConvert para pipeline automatizado",
            "Transcodificação apenas sob demanda",
            "Usar apenas uma resolução para todos os dispositivos"
        ],
        correct: 1,
        explanation: "S3 triggers disparam processamento automático, Lambda orquestra workflow, MediaConvert oferece transcodificação profissional - pipeline completo e escalável.",
        awsLink: "https://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema de gestão hospitalar precisa integrar com múltiplos sistemas legados (laboratório, farmácia, radiologia) que usam protocolos diferentes (HL7, FHIR, APIs REST). A integração deve ser confiável e auditável.\n\nComo implementar integração com sistemas legados heterogêneos?",
        options: [
            "Integração manual com planilhas",
            "EventBridge + Lambda + Step Functions para orquestração de integrações",
            "Apenas uma integração por vez",
            "Substituir todos os sistemas legados"
        ],
        correct: 1,
        explanation: "EventBridge oferece roteamento inteligente, Lambda adapta protocolos diferentes, Step Functions orquestra workflows complexos - integração robusta e auditável.",
        awsLink: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de jogos mobile precisa implementar sistema de leaderboards global que atualize rankings em tempo real para milhões de jogadores. O sistema deve suportar múltiplos tipos de ranking (pontuação, tempo, conquistas).\n\nComo implementar leaderboards escaláveis?",
        options: [
            "Planilha Excel compartilhada",
            "DynamoDB + ElastiCache + Lambda para rankings distribuídos",
            "Banco de dados local em cada dispositivo",
            "Atualização manual de rankings"
        ],
        correct: 1,
        explanation: "DynamoDB armazena scores com GSI para diferentes rankings, ElastiCache oferece acesso ultra-rápido, Lambda processa atualizações - performance ideal para gaming.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de e-learning precisa implementar sistema de avaliação adaptativa que ajusta dificuldade das questões baseado no desempenho do aluno em tempo real. O algoritmo deve personalizar a experiência de aprendizado.\n\nComo implementar avaliação adaptativa inteligente?",
        options: [
            "Questões estáticas para todos os alunos",
            "Lambda + DynamoDB + SageMaker para personalização adaptativa",
            "Avaliação manual por professores",
            "Apenas uma dificuldade fixa"
        ],
        correct: 1,
        explanation: "Lambda processa lógica adaptativa, DynamoDB armazena progresso individual, SageMaker oferece ML para personalização - experiência de aprendizado otimizada.",
        awsLink: "https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema de monitoramento ambiental coleta dados de milhares de sensores (temperatura, umidade, qualidade do ar) distribuídos por uma cidade. Os dados devem ser processados para detectar padrões de poluição e gerar alertas públicos.\n\nComo implementar monitoramento ambiental em escala urbana?",
        options: [
            "Coleta manual de dados uma vez por semana",
            "IoT Core + Kinesis + QuickSight para monitoramento inteligente",
            "Apenas sensores isolados sem integração",
            "Relatórios anuais de qualidade do ar"
        ],
        correct: 1,
        explanation: "IoT Core gerencia milhares de sensores, Kinesis processa streams de dados, QuickSight oferece dashboards em tempo real - monitoramento completo e inteligente.",
        awsLink: "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de logística precisa implementar otimização de estoque que considere demanda histórica, sazonalidade, lead time de fornecedores e custos de armazenagem para minimizar custos totais.\n\nComo implementar otimização inteligente de estoque?",
        options: [
            "Estoque fixo baseado em intuição",
            "SageMaker + Lambda + DynamoDB para otimização preditiva",
            "Reposição manual quando estoque acaba",
            "Apenas análise anual de estoque"
        ],
        correct: 1,
        explanation: "SageMaker oferece ML para previsão de demanda, Lambda executa algoritmos de otimização, DynamoDB armazena histórico - gestão inteligente de estoque.",
        awsLink: "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de marketplace precisa implementar sistema de reputação que considere avaliações de compradores, histórico de vendas, tempo de resposta e qualidade de produtos para calcular score de confiabilidade dos vendedores.\n\nComo implementar sistema de reputação dinâmico?",
        options: [
            "Avaliação manual por moderadores",
            "Lambda + DynamoDB + EventBridge para scoring automatizado",
            "Apenas contagem simples de estrelas",
            "Reputação fixa sem atualizações"
        ],
        correct: 1,
        explanation: "Lambda processa algoritmos de reputação, DynamoDB armazena métricas históricas, EventBridge propaga atualizações - sistema dinâmico e justo de reputação.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema de telemedicina precisa implementar agendamento inteligente que considere especialidade médica, urgência do caso, disponibilidade de médicos e preferências do paciente para otimizar a agenda.\n\nComo implementar agendamento médico otimizado?",
        options: [
            "Agendamento manual por telefone",
            "Step Functions + Lambda + DynamoDB para otimização de agenda",
            "Apenas ordem de chegada",
            "Agenda fixa sem otimização"
        ],
        correct: 1,
        explanation: "Step Functions orquestra workflow complexo, Lambda executa algoritmos de otimização, DynamoDB gerencia disponibilidade - agendamento inteligente e eficiente.",
        awsLink: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-standard-vs-express.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma empresa de energia renovável precisa implementar sistema de previsão de geração solar/eólica baseado em dados meteorológicos, histórico de produção e manutenção de equipamentos para otimizar distribuição de energia.\n\nComo implementar previsão energética inteligente?",
        options: [
            "Previsão baseada apenas no clima atual",
            "SageMaker + Kinesis + Lambda para previsão preditiva",
            "Estimativas manuais por engenheiros",
            "Produção constante sem variação"
        ],
        correct: 1,
        explanation: "SageMaker oferece ML para previsão meteorológica, Kinesis processa dados de sensores, Lambda executa modelos preditivos - otimização inteligente de energia.",
        awsLink: "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de crowdfunding precisa implementar sistema de pagamentos escalonados que libere fundos para criadores baseado em milestones do projeto, com proteção para investidores e transparência total.\n\nComo implementar pagamentos condicionais transparentes?",
        options: [
            "Pagamento único no início do projeto",
            "Step Functions + Lambda + DynamoDB para pagamentos condicionais",
            "Liberação manual de fundos",
            "Sem proteção para investidores"
        ],
        correct: 1,
        explanation: "Step Functions gerencia workflow de milestones, Lambda valida condições, DynamoDB registra progresso - sistema transparente e seguro para crowdfunding.",
        awsLink: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-standard-vs-express.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Um sistema de gestão de frota precisa implementar manutenção preditiva que analise dados de telemetria de veículos (quilometragem, temperatura do motor, vibração) para prever falhas antes que aconteçam.\n\nComo implementar manutenção preditiva para frota?",
        options: [
            "Manutenção apenas quando veículo quebra",
            "IoT Core + SageMaker + CloudWatch para predição de falhas",
            "Manutenção baseada apenas em quilometragem",
            "Inspeção visual mensal"
        ],
        correct: 1,
        explanation: "IoT Core coleta telemetria em tempo real, SageMaker detecta padrões de falha, CloudWatch dispara alertas preventivos - manutenção inteligente e econômica.",
        awsLink: "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html"
    },

    {
        domain: "Desenvolvimento",
        question: "Uma API de pagamentos PIX que processa milhões de transações precisa evitar processamento duplicado quando clientes reenviam requisições devido a timeouts de rede. Transações duplicadas podem causar cobranças indevidas e problemas regulatórios. A solução deve funcionar mesmo com payloads idênticos de diferentes clientes.\n\nComo implementar request deduplication robusta para evitar duplicate processing?",
        options: [
            "Confiar apenas na implementação do cliente para evitar duplicatas",
            "Implementar idempotency com DynamoDB e request fingerprinting",
            "Usar apenas timestamps para detectar requisições próximas",
            "Não implementar deduplication para manter simplicidade"
        ],
        correct: 1,
        explanation: "Request fingerprinting (hash de payload + client ID) com DynamoDB conditional writes garante idempotência robusta, prevenindo duplicate processing mesmo com requisições idênticas de clientes diferentes.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ConditionalWrites.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de marketplace com milhões de produtos precisa implementar listagem paginada eficiente. A interface web mostra 20 produtos por página, mas usuários podem navegar até página 10.000+. A implementação atual com offset está causando timeouts e consumo excessivo de read capacity no DynamoDB.\n\nComo implementar paginação eficiente para large datasets em DynamoDB?",
        options: [
            "Carregar todos os produtos em memória e paginar no código",
            "Usar LastEvaluatedKey com client-side cursor management",
            "Manter implementação offset-based aumentando read capacity",
            "Usar apenas LIMIT sem paginação para simplificar"
        ],
        correct: 1,
        explanation: "LastEvaluatedKey oferece cursor-based pagination eficiente, evitando performance issues de offset-based approaches que degradam com datasets grandes, mantendo performance consistente independente da página.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Pagination.html"
    },
    {
        domain: "Desenvolvimento",
        question: "Uma plataforma de e-commerce precisa rotear eventos de pedidos para diferentes serviços baseado no conteúdo: pedidos VIP vão para processamento prioritário, pedidos internacionais para compliance, pedidos com desconto para auditoria. O roteamento deve ser dinâmico e baseado em regras de negócio complexas.\n\nComo implementar content-based routing inteligente para messages?",
        options: [
            "Usar apenas SQS standard com processamento manual",
            "Amazon EventBridge com custom event patterns e rules",
            "Implementar routing manual no código de cada serviço",
            "Usar apenas SNS com broadcast para todos os serviços"
        ],
        correct: 1,
        explanation: "EventBridge oferece content-based routing com event patterns avançados, filtering baseado em conteúdo JSON, multiple targets e rules dinâmicas - ideal para routing complexo de eventos de negócio.",
        awsLink: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html"
    }
];

// Mais questões de Segurança (11-101)
const additionalSecurityQuestions = [
    {
        domain: "Segurança",
        question: "Uma empresa de defesa que desenvolve sistemas críticos precisa implementar segurança zero-trust para compliance com regulamentações governamentais. A arquitetura não pode confiar em perímetros de rede tradicionais e deve verificar cada conexão entre microserviços. Todo acesso deve ser autenticado e autorizado independente da localização.\n\nQual arquitetura implementar para zero-trust network security?",
        options: [
            "Confiar apenas em network perimeter com firewall robusto",
            "Implementar mTLS + service mesh + identity-based access control",
            "Usar apenas VPC security groups com IP whitelisting",
            "Confiar em IP whitelisting estático para todos os serviços"
        ],
        correct: 1,
        explanation: "Zero-trust requer mTLS para autenticação mútua service-to-service, service mesh (como AWS App Mesh) para traffic control granular e identity-based access control em vez de network-based - essencial para compliance governamental.",
        awsLink: "https://docs.aws.amazon.com/whitepapers/latest/zero-trust-architectures/zero-trust-architectures.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa europeia de tecnologia que processa dados de cidadãos da UE precisa implementar compliance GDPR rigoroso. A empresa armazena petábytes de dados em S3 e precisa identificar automaticamente PII (dados pessoais), classificar sensibilidade e implementar controles de acesso granulares. Multas GDPR podem chegar a 4% da receita anual.\n\nComo implementar data classification e protection para compliance GDPR?",
        options: [
            "Tratar todos os dados com o mesmo nível de proteção",
            "Amazon Macie para data discovery + KMS encryption + access logging",
            "Usar apenas basic encryption sem classificação",
            "Implementar classificação manual com equipes dedicadas"
        ],
        correct: 1,
        explanation: "Amazon Macie identifica PII automaticamente usando ML, KMS oferece encryption granular por classificação, access logging garante audit trail completo - combinação essencial para compliance GDPR.",
        awsLink: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de criptomoedas que é alvo constante de ataques sofisticados precisa implementar monitoramento de segurança em tempo real. A empresa precisa detectar automaticamente atividades suspeitas (mining malicioso, exfiltração de dados, lateral movement) e responder instantaneamente para minimizar danos financeiros.\n\nComo implementar runtime security monitoring com resposta automatizada?",
        options: [
            "Confiar apenas em static code analysis durante desenvolvimento",
            "GuardDuty + Security Hub + EventBridge para automated incident response",
            "Implementar monitoramento manual com equipe 24/7",
            "Usar apenas antivirus tradicional em instâncias"
        ],
        correct: 1,
        explanation: "GuardDuty detecta runtime threats com ML, Security Hub centraliza findings de múltiplas fontes, EventBridge permite automated incident response (isolamento, bloqueio) - essencial para proteção de ativos críticos.",
        awsLink: "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html"
    },
    {
        domain: "Segurança",
        question: "Uma plataforma de streaming que opera 24/7 globalmente precisa rotacionar credenciais de APIs de conteúdo (Netflix, Disney+) mensalmente para compliance. A plataforma não pode ter downtime durante rotação pois milhões de usuários estão assistindo simultaneamente. A rotação deve ser completamente automatizada.\n\nComo implementar secrets rotation sem causar downtime?",
        options: [
            "Fazer rotation manual durante maintenance windows programáveis",
            "AWS Secrets Manager com dual-user rotation strategy",
            "Hardcode secrets no código para evitar rotation",
            "Usar apenas environment variables com restart de serviços"
        ],
        correct: 1,
        explanation: "Dual-user rotation strategy mantém secret anterior válido durante transição, permitindo rollback instantâneo e garantindo zero-downtime rotation - essencial para serviços críticos 24/7.",
        awsLink: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets-two-users.html"
    },
    {
        domain: "Segurança",
        question: "Uma fintech que processa pagamentos críticos está sendo alvo de ataques coordenados incluindo DDoS, injection attacks e bot networks. A empresa precisa implementar múltiplas camadas de proteção para garantir disponibilidade durante ataques e proteger dados financeiros sensíveis.\n\nQual stack de segurança implementar para defense in depth em web applications?",
        options: [
            "Usar apenas AWS WAF para filtrar ataques",
            "CloudFront + WAF + Shield Advanced + API Gateway + Lambda security layers",
            "Confiar apenas em HTTPS para proteção de dados",
            "Implementar segurança apenas na application logic"
        ],
        correct: 1,
        explanation: "Defense in depth requer múltiplas camadas: CloudFront para cache e DDoS mitigation, WAF para application attacks, Shield Advanced para network protection, API Gateway para throttling, Lambda para business logic security - essencial para fintech.",
        awsLink: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"
    }
];

// Mais questões de Implantação (11-94)
const additionalDeploymentQuestions = [
    {
        domain: "Implantação",
        question: "Uma plataforma de trading de ações que processa bilhões em transações precisa fazer deploys sem impactar operações críticas. Qualquer aumento na latência ou error rate pode causar perdas financeiras massivas. A empresa quer rollback automático instantâneo baseado em métricas de performance em tempo real.\n\nComo implementar deployment com automatic rollback baseado em métricas?",
        options: [
            "Confiar apenas em rollback manual após detecção de problemas",
            "CodeDeploy com CloudWatch alarms para automatic rollback",
            "Aguardar feedback de usuários para decidir sobre rollback",
            "Não implementar rollback para evitar complexidade"
        ],
        correct: 1,
        explanation: "CodeDeploy monitora CloudWatch alarms (error rate, latency, throughput) em tempo real e executa rollback automático quando thresholds críticos são ultrapassados - essencial para trading de alta frequência.",
        awsLink: "https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-cloudwatch-events.html"
    },
    {
        domain: "Implantação",
        question: "Uma instituição financeira regulamentada precisa garantir que toda infraestrutura seja reproduzível e auditável para compliance bancário. Auditores exigem que qualquer mudança seja rastreada e que seja possível recriar exatamente o mesmo ambiente. Configuration drift deve ser eliminado completamente.\n\nComo implementar immutable infrastructure para compliance e auditability?",
        options: [
            "Fazer updates in-place nas instâncias existentes",
            "AWS CDK + CloudFormation com complete stack replacement",
            "Implementar mudanças manuais com documentação detalhada",
            "Usar apenas scripts bash versionados"
        ],
        correct: 1,
        explanation: "Immutable infrastructure com CDK/CloudFormation garante reproducibility total, auditability completa via git history, elimina configuration drift e atende compliance bancário - infraestrutura como código versionado.",
        awsLink: "https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa SaaS que atende 1000+ clientes empresariais precisa fazer deploys isolados por tenant para atender diferentes níveis de SLA. Clientes enterprise precisam de ambientes dedicados, enquanto clientes standard compartilham infraestrutura. Falhas em um tenant não podem afetar outros.\n\nQual pattern usar para deployment isolation em arquitetura multi-tenant?",
        options: [
            "Fazer deploy de todos os tenants simultaneamente no mesmo ambiente",
            "Implementar separate deployment pipelines com tenant-specific environments",
            "Usar apenas feature flags para diferenciar tenants",
            "Fazer deploy manual individual para cada tenant"
        ],
        correct: 1,
        explanation: "Separate pipelines garantem isolation completo, permitem tenant-specific configurations e SLAs, reduzem blast radius de failures e atendem diferentes níveis de compliance por cliente.",
        awsLink: "https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de streaming que opera infraestrutura crítica precisa validar que seus sistemas permanecem resilientes após cada deploy. A empresa quer detectar automaticamente se novas versões introduzem pontos de falha únicos ou degradam a capacidade de recovery. Testes de resiliência devem ser integrados ao pipeline de deploy.\n\nComo implementar deployment com chaos engineering integration?",
        options: [
            "Não realizar testes de failure para evitar riscos",
            "Integrar chaos experiments no pipeline com automated recovery validation",
            "Executar chaos testing apenas em produção manualmente",
            "Implementar chaos testing manual após cada deploy"
        ],
        correct: 1,
        explanation: "Chaos experiments integrados (AWS FIS) no pipeline validam system resilience automaticamente, garantindo que deployments mantêm fault tolerance e capacidade de recovery antes de atingir produção.",
        awsLink: "https://docs.aws.amazon.com/fis/latest/userguide/what-is.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de saúde que deve atender regulamentações HIPAA precisa garantir que todos os deployments atendam aos requisitos de compliance antes de serem liberados para produção. Deployments não-conformes podem resultar em multas milionárias e suspensão de operações.\n\nComo implementar deployment com compliance validation automatizada?",
        options: [
            "Confiar apenas em manual review por equipe de compliance",
            "AWS Config Rules + Security Hub + automated compliance gates",
            "Não implementar validação para acelerar deployments",
            "Fazer compliance check apenas após deployment em produção"
        ],
        correct: 1,
        explanation: "AWS Config Rules validam compliance automaticamente (encryption, access controls), Security Hub centraliza findings, automated gates no pipeline impedem deployments não-conformes - essencial para HIPAA.",
        awsLink: "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html"
    }
];

// Mais questões de Otimização (11-70)
const additionalOptimizationQuestions = [
    {
        domain: "Otimização",
        question: "Uma startup de machine learning que treina modelos de IA está enfrentando custos crescentes de compute. Os workloads de treinamento têm padrões previsíveis (picos durante experimentos, baixo uso à noite) e podem tolerar interrupções. A empresa quer reduzir custos em 60% mantendo performance adequada.\n\nQual combinação usar para otimizar custos com intelligent resource scaling?",
        options: [
            "Manter scaling manual para controle total de custos",
            "Application Auto Scaling + predictive scaling + Spot instances",
            "Usar sempre on-demand instances para garantir disponibilidade",
            "Não implementar scaling para evitar complexidade"
        ],
        correct: 1,
        explanation: "Application Auto Scaling com predictive algorithms antecipa demanda, Spot instances reduzem custos em até 90% para workloads fault-tolerant como ML training - combinação ideal para startups.",
        awsLink: "https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-predictive-scaling.html"
    },
    {
        domain: "Otimização",
        question: "Uma empresa de análise de dados que processa logs de bilhões de eventos IoT diariamente está enfrentando gargalos de performance. O pipeline atual sequencial demora 12 horas para processar dados de um dia. A empresa precisa reduzir para 2 horas para oferecer insights quase em tempo real aos clientes.\n\nComo otimizar performance de data processing pipelines em larga escala?",
        options: [
            "Processar todos os dados sequencialmente com mais CPU",
            "Parallel processing + data partitioning + streaming architecture",
            "Usar apenas single-threaded processing com mais memória",
            "Aumentar apenas compute capacity sem mudar arquitetura"
        ],
        correct: 1,
        explanation: "Parallel processing com Kinesis/EMR, data partitioning por timestamp/device e streaming architecture reduzem latency drasticamente e aumentam throughput para large datasets IoT.",
        awsLink: "https://docs.aws.amazon.com/kinesis/latest/dev/kinesis-dg.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de educação online que serve conteúdo de vídeo para estudantes em 50+ países está enfrentando reclamações sobre lentidão de carregamento. Estudantes em regiões remotas relatam timeouts frequentes. A empresa quer otimizar delivery global mantendo custos controlados.\n\nQual estratégia usar para otimizar content delivery performance globalmente?",
        options: [
            "Usar apenas origin servers centralizados para reduzir custos",
            "CloudFront + Lambda@Edge + regional caching + compression",
            "Implementar apenas CDN básico sem otimizações",
            "Replicar servers físicos em todos os países"
        ],
        correct: 1,
        explanation: "CloudFront edge locations (200+ globalmente), Lambda@Edge para processing regional, caching inteligente e compression otimizam delivery global com baixa latência e custos controlados.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de notícias que serve milhões de leitores simultaneamente está enfrentando gargalos no banco de dados durante breaking news. 95% das operações são leituras (artigos, comentários, perfis), mas o database primário está sobrecarregado. A latência de leitura aumentou 300% durante picos.\n\nComo otimizar database performance para workloads read-heavy?",
        options: [
            "Usar apenas o primary database com mais CPU",
            "Read replicas + query optimization + connection pooling + caching",
            "Aumentar apenas o tamanho da instância do database",
            "Criar apenas mais indexes no database primário"
        ],
        correct: 1,
        explanation: "Read replicas distribuem carga de leitura geograficamente, query optimization reduz resource usage, connection pooling evita overhead, caching (ElastiCache) reduz hits no database - combinação ideal para read-heavy.",
        awsLink: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html"
    },
    {
        domain: "Otimização",
        question: "Uma startup que cresceu 1000% em 6 meses está enfrentando custos de monitoring que representam 25% da conta AWS. A empresa precisa manter visibilidade operacional crítica mas quer reduzir custos de CloudWatch, logs e métricas sem comprometer troubleshooting capabilities.\n\nComo otimizar monitoring costs mantendo visibility essencial?",
        options: [
            "Monitorar todas as métricas e logs sempre com retenção infinita",
            "Intelligent sampling + metric aggregation + log retention policies",
            "Desabilitar monitoring completamente para economizar",
            "Usar apenas basic monitoring sem métricas customizadas"
        ],
        correct: 1,
        explanation: "Intelligent sampling (1% normal, 100% errors) mantém visibility crítica, metric aggregation reduz data volume, retention policies diferenciadas (7d errors, 1d debug) otimizam storage costs drasticamente.",
        awsLink: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html"
    }
];

// Combinar todas as questões adicionais
const allAdditionalQuestions = [
    ...additionalDevelopmentQuestions,
    ...additionalSecurityQuestions, 
    ...additionalDeploymentQuestions,
    ...additionalOptimizationQuestions
];

// Gerar questões restantes para completar 390 total
function generateRemainingQuestions() {
    const currentTotal = questionsDatabase.length + allAdditionalQuestions.length;
    const needed = 390 - currentTotal;
    
    const remainingQuestions = [];
    
    // Distribuição para completar 390: Desenvolvimento(125), Segurança(101), Implantação(94), Otimização(70)
    const targetDistribution = {
        "Desenvolvimento": 125,
        "Segurança": 101,
        "Implantação": 94,
        "Otimização": 70
    };
    
    // Contar questões existentes por domínio
    const currentCounts = {
        "Desenvolvimento": 0,
        "Segurança": 0,
        "Implantação": 0,
        "Otimização": 0
    };
    
    [...questionsDatabase, ...allAdditionalQuestions].forEach(q => {
        currentCounts[q.domain]++;
    });
    
    // Cenários de negócio para questões restantes
    const businessScenarios = {
        "Desenvolvimento": [
            "Uma fintech que processa pagamentos internacionais precisa implementar",
            "Uma plataforma de IoT industrial que monitora fábricas precisa",
            "Um sistema de saúde que gerencia prontuários eletrônicos deve",
            "Uma empresa de logística global que rastreia entregas necessita",
            "Uma startup de edtech que serve milhões de estudantes quer"
        ],
        "Segurança": [
            "Uma instituição bancária que deve atender regulamentações BACEN precisa",
            "Uma empresa de defesa que lida com dados classificados deve",
            "Uma plataforma de saúde que processa dados HIPAA necessita",
            "Uma fintech europeia que deve cumprir GDPR quer",
            "Uma empresa de criptomoedas que é alvo de ataques precisa"
        ],
        "Implantação": [
            "Uma plataforma de trading que opera 24/7 precisa fazer deploys",
            "Uma empresa SaaS multi-tenant que atende enterprise clients deve",
            "Uma startup que cresceu 1000% em 6 meses necessita",
            "Uma instituição financeira regulamentada quer implementar",
            "Uma empresa de streaming global que serve milhões precisa"
        ],
        "Otimização": [
            "Uma startup de ML que treina modelos de IA quer reduzir custos",
            "Uma plataforma de gaming que atende milhões de jogadores precisa otimizar",
            "Uma empresa de mídia que armazena petábytes de conteúdo deve",
            "Uma plataforma de e-commerce durante Black Friday necessita",
            "Uma empresa de análise de big data que processa bilhões de eventos quer"
        ]
    };
    
    // Não gerar questões genéricas - usar apenas questões de alta qualidade existentes
    
    return remainingQuestions;
}

const remainingQuestions = generateRemainingQuestions();



// Lote 2: Questões de Segurança (25 questões)
const lote2SecurityQuestions = [
    {
        domain: "Segurança",
        question: "Uma fintech que processa pagamentos internacionais precisa implementar criptografia end-to-end para proteger dados sensíveis durante trânsito entre diferentes países com regulamentações distintas. A solução deve garantir que nem mesmo a própria empresa possa acessar dados descriptografados.\n\nComo implementar criptografia end-to-end robusta?",
        options: [
            "Usar apenas HTTPS para trânsito",
            "Client-side encryption + AWS KMS + envelope encryption",
            "Criptografia apenas no banco de dados",
            "Confiar na criptografia padrão da AWS"
        ],
        correct: 1,
        explanation: "Client-side encryption garante que dados sejam criptografados antes de sair do cliente, KMS gerencia chaves com segurança, envelope encryption oferece performance - verdadeiro end-to-end.",
        awsLink: "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#enveloping"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de saúde que armazena prontuários eletrônicos precisa implementar controle de acesso granular onde médicos vejam apenas pacientes de sua especialidade, enfermeiros acessem dados básicos e administradores gerenciem usuários. O sistema deve auditar todos os acessos.\n\nComo implementar RBAC (Role-Based Access Control) granular?",
        options: [
            "Todos os usuários com mesmo nível de acesso",
            "Amazon Cognito + IAM roles + attribute-based policies",
            "Controle de acesso apenas por senha",
            "Acesso livre para facilitar atendimento"
        ],
        correct: 1,
        explanation: "Cognito gerencia usuários e grupos, IAM roles definem permissões específicas, attribute-based policies permitem controle granular baseado em atributos do usuário - RBAC completo e auditável.",
        awsLink: "https://docs.aws.amazon.com/cognito/latest/developerguide/role-based-access-control.html"
    },
    {
        domain: "Segurança",
        question: "Uma startup de criptomoedas que é alvo constante de ataques avançados precisa implementar detecção de ameaças em tempo real. O sistema deve identificar tentativas de acesso não autorizado, atividades suspeitas e possíveis exfiltrações de dados automaticamente.\n\nComo implementar threat detection avançado?",
        options: [
            "Monitoramento manual 24/7",
            "GuardDuty + Security Hub + automated incident response",
            "Apenas logs básicos de acesso",
            "Antivírus tradicional"
        ],
        correct: 1,
        explanation: "GuardDuty usa ML para detectar ameaças, Security Hub centraliza findings, automated incident response via Lambda isola recursos comprometidos - proteção avançada contra ataques sofisticados.",
        awsLink: "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_cloudwatch.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de tecnologia médica que desenvolve dispositivos IoT para monitoramento de pacientes precisa garantir que comunicações entre dispositivos e cloud sejam seguras e autênticas. Dispositivos comprometidos podem colocar vidas em risco.\n\nComo implementar segurança para IoT médico crítico?",
        options: [
            "Comunicação sem criptografia para reduzir latência",
            "IoT Device Management + X.509 certificates + mutual TLS",
            "Apenas autenticação por senha",
            "Segurança apenas no gateway"
        ],
        correct: 1,
        explanation: "IoT Device Management oferece lifecycle completo, X.509 certificates garantem identidade única, mutual TLS autentica ambos os lados - segurança crítica para dispositivos médicos.",
        awsLink: "https://docs.aws.amazon.com/iot/latest/developerguide/device-certs.html"
    },
    {
        domain: "Segurança",
        question: "Uma instituição financeira precisa implementar segmentação de rede rigorosa onde sistemas de pagamento, crédito e compliance sejam completamente isolados. Nenhum sistema deve acessar recursos de outro sem autorização explícita.\n\nComo implementar micro-segmentation para compliance bancário?",
        options: [
            "Uma única VPC para todos os sistemas",
            "Multiple VPCs + Transit Gateway + granular routing",
            "Apenas security groups básicos",
            "Segmentação física apenas"
        ],
        correct: 1,
        explanation: "Multiple VPCs isolam sistemas completamente, Transit Gateway permite conectividade controlada, granular routing implementa policies específicas - micro-segmentation para compliance rigoroso.",
        awsLink: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de streaming que armazena conteúdo premium precisa implementar DRM (Digital Rights Management) para proteger propriedade intelectual. O sistema deve prevenir pirataria e controlar acesso baseado em licenças de usuário.\n\nComo implementar proteção de conteúdo digital?",
        options: [
            "Armazenar conteúdo sem proteção",
            "CloudFront + signed URLs + content encryption",
            "Apenas autenticação de usuário",
            "Proteção apenas no player"
        ],
        correct: 1,
        explanation: "CloudFront oferece distribuição segura, signed URLs controlam acesso temporário, content encryption protege conteúdo - DRM completo para propriedade intelectual.",
        awsLink: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de pesquisa farmacêutica que lida com dados altamente confidenciais precisa implementar data loss prevention (DLP) para evitar vazamentos acidentais ou maliciosos de fórmulas e resultados de pesquisa.\n\nComo implementar DLP abrangente?",
        options: [
            "Confiar apenas na conscientização dos funcionários",
            "Macie + CloudTrail + automated data classification",
            "Monitoramento manual de arquivos",
            "Restrição apenas de email"
        ],
        correct: 1,
        explanation: "Macie identifica dados sensíveis automaticamente, CloudTrail monitora acessos, automated classification aplica policies - DLP inteligente e abrangente.",
        awsLink: "https://docs.aws.amazon.com/macie/latest/user/findings-types.html"
    },
    {
        domain: "Segurança",
        question: "Uma plataforma de governo eletrônico que processa dados de cidadãos precisa implementar autenticação multifator obrigatória para todos os acessos administrativos. A solução deve ser resiliente a ataques de phishing e SIM swapping.\n\nComo implementar MFA resistente a ataques avançados?",
        options: [
            "Apenas SMS como segundo fator",
            "Hardware security keys (FIDO2) + biometria",
            "Perguntas de segurança como MFA",
            "Email como segundo fator"
        ],
        correct: 1,
        explanation: "Hardware security keys são resistentes a phishing e SIM swapping, FIDO2 oferece padrão seguro, biometria adiciona camada extra - MFA robusto contra ataques avançados.",
        awsLink: "https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-mfa.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de biotecnologia que colabora com instituições internacionais precisa compartilhar dados de pesquisa de forma segura. Os dados devem ser protegidos durante trânsito e armazenamento, com controle granular de acesso por instituição.\n\nComo implementar compartilhamento seguro de dados sensíveis?",
        options: [
            "Email com anexos criptografados",
            "S3 + cross-account access + bucket policies granulares",
            "FTP tradicional com senha",
            "Compartilhamento via pen drives"
        ],
        correct: 1,
        explanation: "S3 oferece encryption at rest/transit, cross-account access permite compartilhamento controlado, bucket policies implementam controle granular - compartilhamento seguro e auditável.",
        awsLink: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example2.html"
    },
    {
        domain: "Segurança",
        question: "Uma fintech que opera em múltiplos países precisa implementar compliance com diferentes regulamentações (GDPR, PCI-DSS, SOX) simultaneamente. Cada regulamentação tem requisitos específicos de segurança e auditoria.\n\nComo gerenciar compliance multi-regulatório?",
        options: [
            "Implementar apenas uma regulamentação",
            "Config Rules + Security Hub + automated compliance reporting",
            "Auditoria manual anual",
            "Confiar na compliance da AWS"
        ],
        correct: 1,
        explanation: "Config Rules monitora compliance automaticamente, Security Hub centraliza findings de segurança, automated reporting gera relatórios para auditores - gestão eficiente de múltiplas regulamentações.",
        awsLink: "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de jogos online que processa pagamentos de jogadores menores de idade precisa implementar proteção especial de dados conforme COPPA (Children's Online Privacy Protection Act). O sistema deve ter controles rigorosos para dados de crianças.\n\nComo implementar proteção de dados para menores?",
        options: [
            "Tratar todos os usuários igualmente",
            "Cognito + age verification + parental consent workflows",
            "Apenas verificar idade no cadastro",
            "Não coletar dados de menores"
        ],
        correct: 1,
        explanation: "Cognito gerencia identidades com atributos de idade, age verification valida idade real, parental consent workflows garantem autorização dos pais - compliance COPPA completo.",
        awsLink: "https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de energia que opera infraestrutura crítica precisa proteger sistemas SCADA contra ataques cibernéticos. Os sistemas controlam usinas e distribuição de energia, onde falhas podem causar blackouts.\n\nComo proteger infraestrutura crítica industrial?",
        options: [
            "Conectar sistemas diretamente à internet",
            "Air-gapped networks + VPN + industrial security protocols",
            "Apenas firewall básico",
            "Segurança física apenas"
        ],
        correct: 1,
        explanation: "Air-gapped networks isolam sistemas críticos, VPN oferece acesso controlado quando necessário, industrial security protocols (como IEC 62443) garantem proteção especializada.",
        awsLink: "https://docs.aws.amazon.com/whitepapers/latest/industrial-iot-aws/security-considerations.html"
    },
    {
        domain: "Segurança",
        question: "Uma plataforma de telemedicina que conecta médicos e pacientes globalmente precisa garantir que consultas por vídeo sejam privadas e seguras. Dados médicos não podem ser interceptados ou gravados sem autorização.\n\nComo implementar comunicação médica segura?",
        options: [
            "Vídeo chamadas sem criptografia",
            "WebRTC + end-to-end encryption + secure signaling",
            "Apenas autenticação de usuário",
            "Gravação automática para auditoria"
        ],
        correct: 1,
        explanation: "WebRTC oferece comunicação peer-to-peer, end-to-end encryption protege conteúdo, secure signaling garante estabelecimento seguro de conexão - privacidade médica garantida.",
        awsLink: "https://docs.aws.amazon.com/chime/latest/dg/meetings-sdk.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de logística que rastreia cargas valiosas precisa implementar segurança para dispositivos IoT em veículos. Os dispositivos devem ser resistentes a tampering e comunicação deve ser segura mesmo em áreas remotas.\n\nComo proteger IoT em ambientes hostis?",
        options: [
            "Dispositivos sem proteção especial",
            "Hardware security modules + cellular encryption + tamper detection",
            "Apenas GPS básico",
            "Comunicação apenas via WiFi"
        ],
        correct: 1,
        explanation: "Hardware security modules protegem chaves criptográficas, cellular encryption garante comunicação segura, tamper detection alerta sobre tentativas de violação - proteção robusta para ambientes hostis.",
        awsLink: "https://docs.aws.amazon.com/iot/latest/developerguide/device-defender.html"
    },
    {
        domain: "Segurança",
        question: "Uma startup de blockchain que desenvolve carteiras digitais precisa proteger chaves privadas de criptomoedas. As chaves devem ser inacessíveis mesmo para administradores da empresa e resistentes a ataques quânticos futuros.\n\nComo implementar proteção quântica para chaves criptográficas?",
        options: [
            "Armazenar chaves em banco de dados comum",
            "CloudHSM + post-quantum cryptography + multi-party computation",
            "Apenas criptografia tradicional",
            "Chaves hardcoded no código"
        ],
        correct: 1,
        explanation: "CloudHSM oferece hardware security dedicado, post-quantum cryptography resiste a ataques quânticos, multi-party computation distribui controle - proteção máxima para ativos digitais.",
        awsLink: "https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de pesquisa genética que processa DNA de pacientes precisa implementar privacy-preserving analytics. Pesquisadores devem poder analisar padrões sem acessar dados individuais identificáveis.\n\nComo implementar análise preservando privacidade?",
        options: [
            "Acesso completo aos dados para pesquisadores",
            "Differential privacy + homomorphic encryption + secure enclaves",
            "Apenas anonimização simples",
            "Compartilhar dados sem restrições"
        ],
        correct: 1,
        explanation: "Differential privacy adiciona ruído matemático, homomorphic encryption permite cálculos em dados criptografados, secure enclaves isolam processamento - privacidade máxima para dados genéticos.",
        awsLink: "https://docs.aws.amazon.com/whitepapers/latest/privacy-engineering-and-differential-privacy/privacy-engineering-and-differential-privacy.html"
    },
    {
        domain: "Segurança",
        question: "Uma plataforma de votação eletrônica precisa garantir integridade, anonimato e auditabilidade dos votos. O sistema deve ser resistente a fraudes e permitir verificação independente dos resultados.\n\nComo implementar votação eletrônica segura?",
        options: [
            "Sistema centralizado simples",
            "Blockchain + zero-knowledge proofs + cryptographic voting",
            "Apenas autenticação de eleitor",
            "Votação sem verificação"
        ],
        correct: 1,
        explanation: "Blockchain garante imutabilidade, zero-knowledge proofs preservam anonimato, cryptographic voting permite verificação sem revelar votos - sistema eleitoral transparente e seguro.",
        awsLink: "https://docs.aws.amazon.com/managed-blockchain/latest/hyperledger-fabric-dev/what-is-amazon-managed-blockchain.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de seguros que processa sinistros precisa detectar fraudes automaticamente analisando padrões suspeitos em reclamações. O sistema deve identificar anomalias sem criar falsos positivos excessivos.\n\nComo implementar detecção de fraude inteligente?",
        options: [
            "Análise manual de todos os sinistros",
            "SageMaker + anomaly detection + behavioral analytics",
            "Apenas verificação de documentos",
            "Aprovar todos os sinistros automaticamente"
        ],
        correct: 1,
        explanation: "SageMaker oferece ML para detecção de padrões, anomaly detection identifica comportamentos suspeitos, behavioral analytics analisa histórico - detecção inteligente e precisa.",
        awsLink: "https://docs.aws.amazon.com/sagemaker/latest/dg/randomcutforest.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de manufatura que usa robôs industriais conectados precisa proteger sistemas de automação contra ataques que podem causar acidentes ou sabotagem da produção.\n\nComo implementar segurança para robótica industrial?",
        options: [
            "Robôs conectados diretamente à internet",
            "Industrial firewalls + OT security + behavioral monitoring",
            "Apenas segurança física",
            "Sistemas isolados sem conectividade"
        ],
        correct: 1,
        explanation: "Industrial firewalls protegem redes OT, OT security implementa protocolos industriais seguros, behavioral monitoring detecta atividades anômalas - proteção especializada para automação.",
        awsLink: "https://docs.aws.amazon.com/iot-device-defender/latest/developerguide/device-defender-detect.html"
    },
    {
        domain: "Segurança",
        question: "Uma plataforma de educação online que atende menores precisa implementar moderação de conteúdo para proteger crianças de material inapropriado. O sistema deve detectar e remover conteúdo prejudicial automaticamente.\n\nComo implementar proteção infantil automatizada?",
        options: [
            "Moderação manual apenas",
            "Rekognition + Comprehend + automated content filtering",
            "Confiar nos usuários para reportar conteúdo",
            "Não implementar moderação"
        ],
        correct: 1,
        explanation: "Rekognition detecta conteúdo visual inapropriado, Comprehend analisa texto prejudicial, automated content filtering remove conteúdo automaticamente - proteção proativa para crianças.",
        awsLink: "https://docs.aws.amazon.com/rekognition/latest/dg/moderation.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de transporte que opera veículos autônomos precisa proteger sistemas de navegação contra ataques que podem causar acidentes. A segurança deve ser implementada em tempo real sem impactar performance.\n\nComo proteger veículos autônomos contra ataques cibernéticos?",
        options: [
            "Sistemas sem proteção para maximizar performance",
            "Real-time intrusion detection + secure boot + encrypted communication",
            "Apenas autenticação do motorista",
            "Proteção apenas quando parado"
        ],
        correct: 1,
        explanation: "Real-time intrusion detection monitora ataques continuamente, secure boot garante integridade do sistema, encrypted communication protege dados - segurança crítica sem impacto na performance.",
        awsLink: "https://docs.aws.amazon.com/iot-device-defender/latest/developerguide/device-defender-detect.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de biotecnologia que desenvolve vacinas precisa proteger propriedade intelectual contra espionagem industrial. Fórmulas e processos devem ser protegidos contra vazamentos internos e externos.\n\nComo implementar proteção de propriedade intelectual crítica?",
        options: [
            "Armazenar tudo em servidores locais",
            "Multi-level security + need-to-know access + watermarking",
            "Acesso livre para acelerar pesquisa",
            "Apenas contratos de confidencialidade"
        ],
        correct: 1,
        explanation: "Multi-level security classifica informações por sensibilidade, need-to-know access limita acesso ao mínimo necessário, watermarking rastreia vazamentos - proteção máxima de IP.",
        awsLink: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"
    },
    {
        domain: "Segurança",
        question: "Uma plataforma de crowdfunding que processa milhões em doações precisa detectar lavagem de dinheiro e financiamento de atividades ilícitas. O sistema deve cumprir regulamentações AML (Anti-Money Laundering).\n\nComo implementar compliance AML automatizado?",
        options: [
            "Aceitar todas as doações sem verificação",
            "ML-based transaction monitoring + KYC automation + suspicious activity reporting",
            "Apenas verificar doações grandes",
            "Verificação manual de todas as transações"
        ],
        correct: 1,
        explanation: "ML-based monitoring detecta padrões suspeitos, KYC automation verifica identidades, suspicious activity reporting cumpre obrigações regulatórias - compliance AML completo e automatizado.",
        awsLink: "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
    },
    {
        domain: "Segurança",
        question: "Uma empresa de telecomunicações que opera redes 5G precisa implementar segurança para infraestrutura crítica. A rede deve ser resiliente a ataques que podem afetar comunicações de emergência e serviços essenciais.\n\nComo proteger infraestrutura de telecomunicações crítica?",
        options: [
            "Rede aberta sem restrições",
            "Network slicing + zero-trust architecture + AI-powered threat detection",
            "Apenas criptografia básica",
            "Segurança apenas nos data centers"
        ],
        correct: 1,
        explanation: "Network slicing isola tráfego crítico, zero-trust architecture verifica cada conexão, AI-powered threat detection identifica ataques sofisticados - proteção abrangente para 5G.",
        awsLink: "https://docs.aws.amazon.com/whitepapers/latest/5g-lens/security-pillar.html"
    }
];

// Combinar questões de alta qualidade após todas as declarações
// Esta linha será movida para o final do arquivo

// Lote 3: Questões de Implantação (25 questões) - Movido para antes do uso
const lote3DeploymentQuestions = [
    {
        domain: "Implantação",
        question: "Uma fintech que processa pagamentos críticos precisa fazer deploys sem impactar operações financeiras. O sistema deve detectar automaticamente degradação de performance ou aumento de error rate e reverter para versão anterior instantaneamente.\n\nComo implementar deployment com rollback automático baseado em métricas?",
        options: [
            "Deploy manual com monitoramento visual",
            "CodeDeploy + CloudWatch Alarms + automatic rollback triggers",
            "Aguardar feedback de usuários para rollback",
            "Não implementar rollback para evitar complexidade"
        ],
        correct: 1,
        explanation: "CodeDeploy monitora métricas em tempo real, CloudWatch Alarms detectam degradação, automatic rollback triggers revertem automaticamente quando thresholds são ultrapassados - essencial para sistemas financeiros.",
        awsLink: "https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-cloudwatch-events.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa global de e-commerce opera em 8 regiões AWS e precisa garantir que deploys sejam consistentes e coordenados. Falhas em uma região não devem afetar outras, mas todas devem ter a mesma versão da aplicação.\n\nComo implementar deployment multi-region coordenado?",
        options: [
            "Deploy manual sequencial em cada região",
            "CloudFormation StackSets + cross-region deployment orchestration",
            "Scripts bash com loops para automatizar deploy",
            "Deploy apenas na região principal"
        ],
        correct: 1,
        explanation: "CloudFormation StackSets permite deployment simultâneo em múltiplas regiões, cross-region orchestration coordena execução, rollback automático em caso de falhas - consistência global garantida.",
        awsLink: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html"
    },
    {
        domain: "Implantação",
        question: "Uma startup de tecnologia quer implementar feature flags para lançar funcionalidades gradualmente para diferentes segmentos de usuários. O sistema deve permitir ativar/desativar features instantaneamente sem novo deploy.\n\nComo implementar feature flags dinâmicos?",
        options: [
            "Hardcode flags booleanos no código",
            "AWS AppConfig + dynamic configuration + gradual rollout",
            "Usar apenas environment variables estáticas",
            "Branches git separados para cada feature"
        ],
        correct: 1,
        explanation: "AWS AppConfig oferece configuration management dinâmico, gradual rollout por segmento, instant rollback, monitoring integrado - ideal para feature flags seguros.",
        awsLink: "https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de streaming que atende milhões de usuários precisa detectar regressões de performance antes que afetem a experiência do usuário. Deploys anteriores causaram aumento de latência que resultou em churn.\n\nComo implementar performance testing automatizado?",
        options: [
            "Não monitorar performance para acelerar deploys",
            "Automated load testing + baseline comparison + performance gates",
            "Monitoramento manual após deploy",
            "Confiar apenas em feedback de usuários"
        ],
        correct: 1,
        explanation: "Automated load testing valida performance sob carga, baseline comparison detecta regressões, performance gates impedem deploys que degradam performance - proteção proativa.",
        awsLink: "https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker-custom-image.html"
    },
    {
        domain: "Implantação",
        question: "Uma instituição financeira regulamentada precisa garantir que toda infraestrutura seja reproduzível e auditável. Auditores exigem que qualquer mudança seja rastreada e que seja possível recriar exatamente o mesmo ambiente.\n\nComo implementar immutable infrastructure para compliance?",
        options: [
            "Updates in-place nas instâncias existentes",
            "Infrastructure as Code + complete stack replacement + audit trails",
            "Mudanças manuais com documentação detalhada",
            "Scripts bash versionados"
        ],
        correct: 1,
        explanation: "Infrastructure as Code garante reproducibility, complete stack replacement elimina configuration drift, audit trails via git oferecem rastreabilidade completa - compliance garantido.",
        awsLink: "https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa SaaS multi-tenant precisa fazer deploys isolados por cliente para atender diferentes SLAs. Clientes enterprise precisam de ambientes dedicados, enquanto clientes standard compartilham infraestrutura.\n\nComo implementar deployment isolation por tenant?",
        options: [
            "Deploy de todos os tenants simultaneamente",
            "Separate pipelines + tenant-specific environments + isolated rollouts",
            "Apenas feature flags para diferenciar tenants",
            "Deploy manual individual para cada tenant"
        ],
        correct: 1,
        explanation: "Separate pipelines garantem isolation, tenant-specific environments atendem SLAs diferentes, isolated rollouts reduzem blast radius - arquitetura multi-tenant segura.",
        awsLink: "https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines.html"
    },
    {
        domain: "Implantação",
        question: "Uma plataforma de e-commerce precisa fazer alterações no schema do banco durante Black Friday. Qualquer downtime pode causar perdas milionárias. A empresa precisa de estratégia que permita rollback rápido.\n\nComo implementar database migrations com zero downtime?",
        options: [
            "Migrations apenas forward sem rollback",
            "Backward-compatible migrations + blue-green database deployment",
            "Parar aplicação durante migration",
            "Confiar apenas em backup restore"
        ],
        correct: 1,
        explanation: "Backward-compatible migrations permitem rollback de aplicação, blue-green database deployment oferece switch instantâneo, zero downtime garantido - essencial para e-commerce crítico.",
        awsLink: "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_BestPractices.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de saúde que deve atender HIPAA precisa garantir que todos os deployments atendam requisitos de compliance antes de serem liberados. Deployments não-conformes podem resultar em multas milionárias.\n\nComo implementar compliance validation automatizada?",
        options: [
            "Manual review por equipe de compliance",
            "AWS Config Rules + Security Hub + automated compliance gates",
            "Não implementar validação para acelerar deploys",
            "Compliance check apenas após deploy"
        ],
        correct: 1,
        explanation: "Config Rules validam compliance automaticamente, Security Hub centraliza findings, automated gates impedem deployments não-conformes - compliance HIPAA garantido.",
        awsLink: "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de jogos online precisa fazer deploys durante horários de pico sem afetar partidas em andamento. Jogadores não podem ser desconectados e latência deve permanecer baixa.\n\nComo implementar hot deployment para gaming?",
        options: [
            "Parar todos os servidores durante deploy",
            "Rolling deployment + connection draining + session persistence",
            "Deploy apenas durante madrugada",
            "Reiniciar servidores forçadamente"
        ],
        correct: 1,
        explanation: "Rolling deployment atualiza servidores gradualmente, connection draining finaliza conexões existentes gracefully, session persistence mantém jogadores conectados - gaming sem interrupção.",
        awsLink: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#deregistration-delay"
    },
    {
        domain: "Implantação",
        question: "Uma startup que cresceu 1000% precisa implementar CI/CD profissional. Atualmente desenvolvedores fazem deploy manual via console, causando inconsistências e bugs em produção.\n\nComo implementar CI/CD completo para serverless?",
        options: [
            "Continuar com deploy manual para manter controle",
            "CodeCommit + CodeBuild + CodePipeline + SAM + automated testing",
            "Scripts bash executados localmente",
            "Deploy direto via AWS CLI"
        ],
        correct: 1,
        explanation: "Pipeline completo com source control, build automation, deployment orchestration e Infrastructure as Code oferece consistência, qualidade e segurança - profissionalização essencial.",
        awsLink: "https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-serverless-applications.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de streaming que opera infraestrutura crítica precisa validar que sistemas permanecem resilientes após cada deploy. Testes de resiliência devem ser integrados ao pipeline.\n\nComo implementar chaos engineering no pipeline?",
        options: [
            "Não realizar testes de failure",
            "AWS FIS + automated chaos experiments + resilience validation",
            "Chaos testing apenas em produção manualmente",
            "Chaos testing manual após deploy"
        ],
        correct: 1,
        explanation: "AWS FIS oferece chaos experiments controlados, automated resilience validation garante que deployments mantêm fault tolerance, integração no pipeline previne regressões.",
        awsLink: "https://docs.aws.amazon.com/fis/latest/userguide/what-is.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de serviços financeiros precisa gerenciar configurações sensíveis (URLs de APIs, chaves de criptografia) de forma segura entre múltiplos ambientes. Hardcoding viola políticas de segurança.\n\nComo implementar configuration management seguro?",
        options: [
            "Hardcode configurações no código",
            "Parameter Store + KMS encryption + environment-specific configs",
            "Environment variables sem criptografia",
            "Arquivos de configuração no git"
        ],
        correct: 1,
        explanation: "Parameter Store oferece storage centralizado, KMS encryption protege dados sensíveis, environment-specific configs garantem isolation - configuration management seguro e auditável.",
        awsLink: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"
    },
    {
        domain: "Implantação",
        question: "Uma plataforma de IoT que gerencia milhões de dispositivos precisa fazer deploys de firmware over-the-air (OTA). Updates devem ser graduais e com rollback automático se dispositivos falharem.\n\nComo implementar OTA deployment para IoT em escala?",
        options: [
            "Update todos os dispositivos simultaneamente",
            "IoT Device Management + staged rollouts + automatic rollback",
            "Update manual dispositivo por dispositivo",
            "Não implementar rollback para IoT"
        ],
        correct: 1,
        explanation: "IoT Device Management oferece OTA orchestration, staged rollouts reduzem risco, automatic rollback protege contra firmware defeituoso - deployment seguro para IoT em escala.",
        awsLink: "https://docs.aws.amazon.com/iot/latest/developerguide/ota-updates.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de e-commerce que opera 24/7 precisa implementar deployment windows inteligentes que considerem tráfego, fuso horário e eventos especiais para minimizar impacto nos usuários.\n\nComo implementar intelligent deployment scheduling?",
        options: [
            "Deploy sempre no mesmo horário",
            "EventBridge + Lambda + traffic analysis + automated scheduling",
            "Deploy manual quando conveniente",
            "Deploy apenas durante feriados"
        ],
        correct: 1,
        explanation: "EventBridge agenda deploys automaticamente, Lambda analisa padrões de tráfego, automated scheduling otimiza timing baseado em dados históricos - deployment inteligente e menos disruptivo.",
        awsLink: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html"
    },
    {
        domain: "Implantação",
        question: "Uma fintech que processa pagamentos críticos precisa implementar deployment com aprovação manual para produção, mas automatizado para ambientes de desenvolvimento e teste.\n\nComo implementar approval gates seletivos?",
        options: [
            "Aprovação manual para todos os ambientes",
            "CodePipeline + manual approval actions + environment-specific gates",
            "Deploy automático para todos os ambientes",
            "Apenas email para aprovação"
        ],
        correct: 1,
        explanation: "CodePipeline permite approval actions configurados por ambiente, manual approval gates para produção garantem controle, automation para dev/test acelera desenvolvimento - balanço ideal.",
        awsLink: "https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de tecnologia educacional precisa fazer deploys coordenados entre frontend (React), backend (Lambda) e banco de dados. Dependências entre componentes devem ser respeitadas.\n\nComo implementar orchestrated deployment multi-component?",
        options: [
            "Deploy cada componente independentemente",
            "Step Functions + dependency management + coordinated rollout",
            "Deploy manual sequencial",
            "Deploy apenas frontend"
        ],
        correct: 1,
        explanation: "Step Functions orquestra deployment workflow, dependency management garante ordem correta, coordinated rollout sincroniza componentes - deployment multi-component seguro e coordenado.",
        awsLink: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-standard-vs-express.html"
    },
    {
        domain: "Implantação",
        question: "Uma plataforma de streaming precisa implementar A/B testing integrado ao deployment para validar novas features com usuários reais antes do rollout completo.\n\nComo implementar A/B testing deployment?",
        options: [
            "Deploy completo sem testes",
            "Lambda@Edge + CloudFront + traffic splitting + metrics collection",
            "Testes apenas em ambiente local",
            "A/B testing manual"
        ],
        correct: 1,
        explanation: "Lambda@Edge permite lógica de roteamento, CloudFront distribui tráfego globalmente, traffic splitting direciona usuários para versões diferentes, metrics collection valida resultados - A/B testing em produção.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de logística que opera em múltiplos países precisa implementar deployment que respeite regulamentações locais. Algumas features podem ser habilitadas apenas em certas jurisdições.\n\nComo implementar geo-specific deployment?",
        options: [
            "Deploy idêntico em todos os países",
            "Region-specific pipelines + compliance validation + feature flags",
            "Deploy manual por país",
            "Ignorar regulamentações locais"
        ],
        correct: 1,
        explanation: "Region-specific pipelines atendem regulamentações locais, compliance validation garante conformidade, feature flags habilitam funcionalidades por jurisdição - deployment global respeitando leis locais.",
        awsLink: "https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines.html"
    },
    {
        domain: "Implantação",
        question: "Uma startup de fintech precisa implementar deployment que integre com sistemas legados bancários. Integrações devem ser testadas automaticamente e rollback deve incluir sistemas externos.\n\nComo implementar deployment com legacy system integration?",
        options: [
            "Deploy sem considerar sistemas legados",
            "Integration testing + external system coordination + distributed rollback",
            "Testes manuais de integração",
            "Rollback apenas de sistemas AWS"
        ],
        correct: 1,
        explanation: "Integration testing valida conectividade com legados, external system coordination sincroniza deploys, distributed rollback reverte mudanças em todos os sistemas - integração segura com legados.",
        awsLink: "https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker-custom-image.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de saúde que processa dados críticos precisa implementar deployment com backup e recovery automatizados. Falhas de deploy não podem resultar em perda de dados médicos.\n\nComo implementar deployment com data protection?",
        options: [
            "Deploy sem backup",
            "Automated backup + point-in-time recovery + data validation",
            "Backup manual antes do deploy",
            "Confiar apenas em replicação"
        ],
        correct: 1,
        explanation: "Automated backup garante snapshot antes do deploy, point-in-time recovery permite rollback de dados, data validation confirma integridade - proteção completa de dados críticos.",
        awsLink: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html"
    },
    {
        domain: "Implantação",
        question: "Uma plataforma de e-commerce precisa implementar deployment que considere dependências de terceiros (APIs de pagamento, shipping). Falhas de terceiros não devem bloquear deploys.\n\nComo implementar deployment resiliente a dependências externas?",
        options: [
            "Deploy apenas quando todos os terceiros estão disponíveis",
            "Circuit breaker + fallback mechanisms + dependency health checks",
            "Ignorar dependências externas",
            "Deploy manual com verificação manual"
        ],
        correct: 1,
        explanation: "Circuit breaker detecta falhas de terceiros, fallback mechanisms mantêm funcionalidade básica, dependency health checks validam conectividade - deployment resiliente e independente.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de jogos mobile que lança updates frequentes precisa implementar deployment que considere diferentes versões de app em campo. Backward compatibility deve ser mantida.\n\nComo implementar deployment com version compatibility?",
        options: [
            "Forçar update de todos os apps",
            "API versioning + backward compatibility + gradual deprecation",
            "Suportar apenas versão mais recente",
            "Deploy sem considerar compatibilidade"
        ],
        correct: 1,
        explanation: "API versioning mantém múltiplas versões, backward compatibility garante funcionamento de apps antigos, gradual deprecation permite migração suave - deployment compatível com ecossistema mobile.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html"
    },
    {
        domain: "Implantação",
        question: "Uma plataforma de streaming que serve conteúdo global precisa implementar deployment que otimize distribuição de conteúdo. Cache invalidation deve ser coordenada com deploys.\n\nComo implementar deployment com CDN optimization?",
        options: [
            "Deploy sem considerar CDN",
            "CloudFront invalidation + cache warming + coordinated content deployment",
            "Invalidation manual após deploy",
            "Aguardar expiração natural do cache"
        ],
        correct: 1,
        explanation: "CloudFront invalidation remove conteúdo antigo, cache warming pré-carrega novo conteúdo, coordinated deployment sincroniza CDN com backend - performance otimizada globalmente.",
        awsLink: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html"
    },
    {
        domain: "Implantação",
        question: "Uma empresa de tecnologia médica que desenvolve dispositivos conectados precisa implementar deployment que coordene firmware, software e configurações cloud. Sincronização é crítica para segurança.\n\nComo implementar coordinated deployment para dispositivos médicos?",
        options: [
            "Deploy cada componente independentemente",
            "IoT Device Management + coordinated OTA + cloud-device synchronization",
            "Update manual de cada dispositivo",
            "Deploy apenas cloud sem dispositivos"
        ],
        correct: 1,
        explanation: "IoT Device Management orquestra updates, coordinated OTA sincroniza firmware/software, cloud-device synchronization garante consistência - deployment seguro para dispositivos médicos críticos.",
        awsLink: "https://docs.aws.amazon.com/iot/latest/developerguide/ota-updates.html"
    }
];
// Lote 4: Questões de Otimização (20 questões) - Movido para antes do uso
const lote4OptimizationQuestions = [
    {
        domain: "Otimização",
        question: "Uma startup de machine learning que treina modelos de IA está enfrentando custos crescentes de compute. Os workloads têm padrões previsíveis (picos durante experimentos, baixo uso à noite) e podem tolerar interrupções.\n\nComo otimizar custos com intelligent resource scaling?",
        options: [
            "Scaling manual para controle total",
            "Predictive scaling + Spot instances + automated scheduling",
            "Sempre on-demand instances",
            "Não implementar scaling"
        ],
        correct: 1,
        explanation: "Predictive scaling antecipa demanda baseado em histórico, Spot instances reduzem custos em até 90%, automated scheduling otimiza workloads por horário - economia máxima para ML.",
        awsLink: "https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-predictive-scaling.html"
    },
    {
        domain: "Otimização",
        question: "Uma empresa de análise de dados que processa logs de bilhões de eventos IoT diariamente tem pipeline que demora 12 horas. Precisa reduzir para 2 horas para insights quase em tempo real.\n\nComo otimizar performance de data processing em larga escala?",
        options: [
            "Processamento sequencial com mais CPU",
            "Parallel processing + data partitioning + streaming architecture",
            "Single-threaded com mais memória",
            "Apenas aumentar compute capacity"
        ],
        correct: 1,
        explanation: "Parallel processing com Kinesis/EMR, data partitioning por timestamp/device, streaming architecture reduzem latência drasticamente - throughput 6x maior para IoT.",
        awsLink: "https://docs.aws.amazon.com/kinesis/latest/dev/kinesis-dg.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de educação online que serve conteúdo de vídeo para 50+ países enfrenta reclamações sobre lentidão. Estudantes em regiões remotas relatam timeouts frequentes.\n\nComo otimizar content delivery performance globalmente?",
        options: [
            "Origin servers centralizados",
            "CloudFront + Lambda@Edge + regional caching + compression",
            "CDN básico sem otimizações",
            "Servers físicos em todos os países"
        ],
        correct: 1,
        explanation: "CloudFront (200+ edge locations), Lambda@Edge para processing regional, caching inteligente e compression otimizam delivery global com baixa latência.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de notícias que serve milhões de leitores simultaneamente enfrenta gargalos no banco durante breaking news. 95% das operações são leituras, mas latência aumentou 300%.\n\nComo otimizar database performance para workloads read-heavy?",
        options: [
            "Primary database com mais CPU",
            "Read replicas + query optimization + connection pooling + caching",
            "Apenas aumentar instância do database",
            "Mais indexes no database primário"
        ],
        correct: 1,
        explanation: "Read replicas distribuem carga geograficamente, query optimization reduz resource usage, connection pooling evita overhead, caching reduz hits no database - combinação ideal.",
        awsLink: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html"
    },
    {
        domain: "Otimização",
        question: "Uma startup que cresceu 1000% em 6 meses tem custos de monitoring representando 25% da conta AWS. Precisa manter visibility operacional mas reduzir custos de CloudWatch e logs.\n\nComo otimizar monitoring costs mantendo visibility essencial?",
        options: [
            "Monitorar tudo com retenção infinita",
            "Intelligent sampling + metric aggregation + retention policies",
            "Desabilitar monitoring completamente",
            "Basic monitoring sem métricas customizadas"
        ],
        correct: 1,
        explanation: "Intelligent sampling (1% normal, 100% errors), metric aggregation reduz volume, retention policies diferenciadas (7d errors, 1d debug) otimizam storage costs drasticamente.",
        awsLink: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html"
    },
    {
        domain: "Otimização",
        question: "Uma arquitetura de microserviços com 50+ serviços enfrenta latência alta devido a chamadas síncronas em cadeia. Cada requisição aciona 10-15 chamadas entre serviços.\n\nQual pattern usar para otimizar comunicação entre microserviços?",
        options: [
            "Manter chamadas síncronas",
            "Event-driven architecture + async messaging + batching",
            "Compartilhar banco entre serviços",
            "Polling contínuo entre serviços"
        ],
        correct: 1,
        explanation: "Event-driven com EventBridge/SQS reduz coupling, async messaging melhora throughput eliminando blocking calls, batching otimiza network overhead - transformação essencial.",
        awsLink: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"
    },
    {
        domain: "Otimização",
        question: "Uma aplicação de gaming online com milhões de jogadores enfrenta hot spots no cache Redis que causam lag. Alguns shards recebem 10x mais requisições, criando gargalos.\n\nComo otimizar cache distribuído evitando hot spots?",
        options: [
            "Cache local em cada servidor",
            "Redis Cluster + consistent hashing + TTL optimization",
            "Cache no database principal",
            "Cache em arquivos locais"
        ],
        correct: 1,
        explanation: "Redis Cluster com consistent hashing distribui dados uniformemente, TTL optimization melhora hit rate, replicação automática garante baixa latência - ideal para gaming.",
        awsLink: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Replication.Redis-RedisCluster.html"
    },
    {
        domain: "Otimização",
        question: "Uma empresa de mídia que armazena petabytes de conteúdo tem diferentes padrões: vídeos recentes (acesso diário), arquivo mensal (ocasional), histórico (raro). Storage representa 60% do orçamento.\n\nComo otimizar storage costs para diferentes access patterns?",
        options: [
            "S3 Standard para tudo",
            "S3 Intelligent Tiering + Lifecycle policies + automated optimization",
            "EBS de alta performance",
            "Não otimizar storage"
        ],
        correct: 1,
        explanation: "S3 Intelligent Tiering move dados automaticamente, Lifecycle policies automatizam transições (Standard -> IA -> Glacier -> Deep Archive), reduzindo custos em até 90%.",
        awsLink: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de trading de alta frequência precisa observability detalhada mas logging atual adiciona 50ms de overhead por transação. Com milhões de transações/segundo, overhead impacta performance.\n\nComo otimizar observability sem impactar performance crítica?",
        options: [
            "Logar tudo com detalhes completos",
            "Sampling inteligente + async logging + structured data",
            "Não implementar observability",
            "Logar apenas errors"
        ],
        correct: 1,
        explanation: "Sampling inteligente (1% normal, 100% errors) reduz overhead, async logging não bloqueia requests, structured data facilita análise - essencial para trading.",
        awsLink: "https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html"
    },
    {
        domain: "Otimização",
        question: "Uma startup global serve conteúdo em 6 continentes e enfrenta custos crescentes de data transfer entre regiões. Transfer costs representam 40% da conta mensal.\n\nComo otimizar data transfer costs globalmente?",
        options: [
            "Ignorar custos de transfer",
            "CloudFront + S3 Transfer Acceleration + regional optimization",
            "Single AZ para reduzir custos",
            "Compressão apenas no cliente"
        ],
        correct: 1,
        explanation: "CloudFront reduz transfer costs com cache global, S3 Transfer Acceleration otimiza uploads, regional optimization minimiza cross-region costs - redução significativa.",
        awsLink: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de e-commerce com catálogo de milhões de produtos enfrenta timeouts ao carregar listas. Queries DynamoDB retornam datasets de 10MB+ causando latência alta.\n\nComo otimizar queries DynamoDB com large result sets?",
        options: [
            "Scan operations para buscar tudo",
            "Paginação + LastEvaluatedKey + projection expressions",
            "Aumentar read capacity infinitamente",
            "Carregar catálogo em memória"
        ],
        correct: 1,
        explanation: "Paginação com LastEvaluatedKey evita timeouts, projection expressions retornam apenas atributos necessários, otimizando performance e reduzindo custos.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Pagination.html"
    },
    {
        domain: "Otimização",
        question: "Uma fintech que processa 100.000 transações/minuto tem custos de Lambda crescendo exponencialmente. Tráfego é variável - picos durante horários comerciais, baixo à noite.\n\nComo otimizar Lambda costs para tráfego variável?",
        options: [
            "Provisioned Concurrency para tudo",
            "On-demand + Provisioned Concurrency seletivo + memory optimization",
            "Migrar para EC2 Reserved",
            "Containers em ECS"
        ],
        correct: 1,
        explanation: "On-demand para tráfego variável, Provisioned Concurrency apenas para funções críticas, memory optimization baseado em profiling - balanço ideal custo/performance.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de jogos online atende jogadores em América do Norte, Europa e Ásia mas enfrenta reclamações sobre latência. Jogadores europeus relatam delays de 200-300ms.\n\nComo reduzir latência globalmente para gaming?",
        options: [
            "Manter apenas região central",
            "CloudFront + API Gateway regional + edge-optimized endpoints",
            "Application Load Balancer com health checks",
            "Data centers próprios"
        ],
        correct: 1,
        explanation: "CloudFront edge locations (200+ globalmente), API Gateway regional endpoints, edge-optimized caching reduzem latência para <50ms globalmente - experiência de jogo otimizada.",
        awsLink: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-basic-concept.html"
    },
    {
        domain: "Otimização",
        question: "Um sistema de e-commerce durante Black Friday enfrenta throttling no DynamoDB. 80% das consultas se concentram em 20% dos produtos (bestsellers), criando hot partitions.\n\nComo resolver hot partitions sem aumentar custos?",
        options: [
            "Aumentar capacity uniformemente",
            "Partition key redesign + sharding + adaptive capacity",
            "Migrar para RDS com replicas",
            "Usar apenas GSI"
        ],
        correct: 1,
        explanation: "Redesign da partition key com sharding distribui carga, adaptive capacity redistribui automaticamente capacidade não utilizada para hot partitions - resolução sem custos extras.",
        awsLink: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de e-learning serve conteúdo para estudantes globalmente mas enfrenta cold starts de 3-5 segundos em Lambda. Durante picos (manhã/noite), latência aumenta significativamente.\n\nComo otimizar cold starts e performance?",
        options: [
            "Aumentar memória para 10GB",
            "Provisioned Concurrency + package optimization + connection pooling",
            "Reduzir timeout para forçar velocidade",
            "Migrar para EC2 dedicado"
        ],
        correct: 1,
        explanation: "Provisioned Concurrency mantém funções aquecidas, package optimization reduz init time, connection pooling reutiliza conexões - cold starts minimizados.",
        awsLink: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html"
    },
    {
        domain: "Otimização",
        question: "Uma empresa de análise que processa datasets de machine learning enfrenta custos altos de compute. Workloads são batch jobs que rodam algumas horas por dia com padrões previsíveis.\n\nComo otimizar compute costs para ML workloads?",
        options: [
            "On-demand instances sempre",
            "Spot instances + Savings Plans + scheduled scaling",
            "Reserved instances para tudo",
            "Não otimizar para manter simplicidade"
        ],
        correct: 1,
        explanation: "Spot instances reduzem custos em 90% para batch jobs, Savings Plans oferecem desconto para uso consistente, scheduled scaling otimiza por horário - economia máxima para ML.",
        awsLink: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de streaming de música precisa otimizar recomendações personalizadas para milhões de usuários. Algoritmo atual demora 500ms por usuário, impactando UX.\n\nComo otimizar performance de recommendation engine?",
        options: [
            "Processar recomendações síncronamente",
            "Pre-computed recommendations + real-time updates + caching",
            "Algoritmos mais simples",
            "Recomendações estáticas"
        ],
        correct: 1,
        explanation: "Pre-computed recommendations reduzem latência para <50ms, real-time updates mantêm relevância, caching oferece acesso instantâneo - UX otimizada para streaming.",
        awsLink: "https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html"
    },
    {
        domain: "Otimização",
        question: "Uma empresa de IoT que monitora sensores industriais processa milhões de eventos/segundo mas enfrenta custos crescentes de ingestão e processamento de dados.\n\nComo otimizar costs para IoT data processing?",
        options: [
            "Processar todos os eventos individualmente",
            "Data aggregation + batch processing + intelligent filtering",
            "Armazenar tudo sem processamento",
            "Processar apenas eventos críticos"
        ],
        correct: 1,
        explanation: "Data aggregation reduz volume, batch processing otimiza throughput, intelligent filtering processa apenas eventos relevantes - redução significativa de custos IoT.",
        awsLink: "https://docs.aws.amazon.com/kinesis/latest/dev/kinesis-dg.html"
    },
    {
        domain: "Otimização",
        question: "Uma plataforma de e-commerce que opera globalmente enfrenta custos altos de database devido a queries complexas e joins pesados. Performance degrada durante picos de tráfego.\n\nComo otimizar database performance e costs?",
        options: [
            "Aumentar apenas compute do database",
            "Query optimization + indexing strategy + data denormalization",
            "Migrar para database maior",
            "Reduzir funcionalidades para simplificar queries"
        ],
        correct: 1,
        explanation: "Query optimization reduz resource usage, indexing strategy acelera lookups, data denormalization elimina joins caros - performance e custos otimizados simultaneamente.",
        awsLink: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_BestPractices.html"
    },
    {
        domain: "Otimização",
        question: "Uma empresa de delivery que cresceu 500% durante pandemia enfrenta custos operacionais crescentes. Precisa otimizar rotas, recursos e custos mantendo qualidade de serviço.\n\nComo implementar otimização operacional abrangente?",
        options: [
            "Manter operações manuais",
            "ML-powered optimization + automated resource management + cost monitoring",
            "Reduzir serviços para cortar custos",
            "Otimizar apenas uma área por vez"
        ],
        correct: 1,
        explanation: "ML-powered optimization otimiza rotas e recursos dinamicamente, automated resource management ajusta capacity, cost monitoring identifica oportunidades - otimização holística.",
        awsLink: "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
    }
];

// Randomizar distribuição de respostas corretas
function randomizeCorrectAnswers() {
    questionsDatabase.forEach((question, index) => {
        if (!Array.isArray(question.correct)) {
            // Gerar posição aleatória para resposta correta
            const newCorrectIndex = Math.floor(Math.random() * 4);
            const originalCorrect = question.correct;
            
            // Trocar posição da resposta correta
            if (newCorrectIndex !== originalCorrect) {
                const temp = question.options[originalCorrect];
                question.options[originalCorrect] = question.options[newCorrectIndex];
                question.options[newCorrectIndex] = temp;
                question.correct = newCorrectIndex;
            }
        }
    });
}

// Aplicar randomização
randomizeCorrectAnswers();

// Função para validar distribuição final
function validateFinalDistribution() {
    const distribution = {
        'Desenvolvimento': 0,
        'Segurança': 0,
        'Implantação': 0,
        'Otimização': 0
    };
    
    questionsDatabase.forEach(q => {
        distribution[q.domain]++;
    });
    
    console.log('=== DISTRIBUIÇÃO FINAL DAS QUESTÕES ===');
    console.log('Desenvolvimento:', distribution['Desenvolvimento'], '/ 125 (32%)');
    console.log('Segurança:', distribution['Segurança'], '/ 101 (26%)');
    console.log('Implantação:', distribution['Implantação'], '/ 94 (24%)');
    console.log('Otimização:', distribution['Otimização'], '/ 70 (18%)');
    console.log('TOTAL:', questionsDatabase.length, '/ 390');
    
    return distribution;
}

// Funções utilitárias
function getQuestionsByDomain(domain) {
    return questionsDatabase.filter(q => q.domain === domain);
}

function getRandomQuestions(count = 65) {
    const domains = {
        "Desenvolvimento": Math.round(count * 0.32),
        "Segurança": Math.round(count * 0.26),
        "Implantação": Math.round(count * 0.24),
        "Otimização": Math.round(count * 0.18)
    };
    
    let selectedQuestions = [];
    
    Object.keys(domains).forEach(domain => {
        const domainQuestions = getQuestionsByDomain(domain);
        const questionsNeeded = domains[domain];
        const shuffled = domainQuestions.sort(() => 0.5 - Math.random());
        selectedQuestions = selectedQuestions.concat(shuffled.slice(0, questionsNeeded));
    });
    
    return selectedQuestions.sort(() => 0.5 - Math.random());
}

function calculateAWSScore(correctAnswers, totalQuestions) {
    const percentage = (correctAnswers / totalQuestions) * 100;
    return Math.round(100 + (percentage * 9));
}

// Combinar todas as questões após declarações
questionsDatabase.push(...allAdditionalQuestions, ...lote2SecurityQuestions, ...lote3DeploymentQuestions, ...lote4OptimizationQuestions);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        questionsDatabase,
        getQuestionsByDomain,
        getRandomQuestions,
        calculateAWSScore
    };
}
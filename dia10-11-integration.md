# DIAS 10-11: API GATEWAY + APPLICATION INTEGRATION

## 📋 Objetivo dos Dias 10-11
Dominar **API Gateway avançado**, **SQS, SNS, EventBridge** e **padrões de integração**.

## 🎯 TEORIA ESSENCIAL

### 1. API Gateway - Configurações Avançadas

**Caching:**
- **TTL**: 0-3600 segundos
- **Cache Keys**: Query parameters, headers
- **Cache Invalidation**: Manual ou automática

**Throttling:**
- **Account Level**: 10,000 requests/second
- **API Level**: Configurável
- **Usage Plans**: Por API Key

**Request/Response Transformation:**
```json
{
  "application/json": {
    "userId": "$input.params('id')",
    "timestamp": "$context.requestTime",
    "body": $input.json('$')
  }
}
```

### 2. Amazon SQS

**Standard vs FIFO:**
```
Standard Queue:
- Unlimited throughput
- At-least-once delivery
- Best-effort ordering

FIFO Queue:
- 300 TPS (3000 with batching)
- Exactly-once processing
- First-in-first-out ordering
```

**Dead Letter Queues:**
- **MaxReceiveCount**: Número de tentativas
- **Redrive Policy**: Configuração de DLQ
- **Message Retention**: 1 minuto a 14 dias

### 3. Amazon SNS

**Message Filtering:**
```json
{
  "eventType": ["order-placed", "order-cancelled"],
  "amount": [{"numeric": [">", 100]}]
}
```

**Fan-out Pattern:**
- SNS → Multiple SQS queues
- SNS → Lambda functions
- SNS → HTTP endpoints

### 4. Amazon EventBridge

**Event Patterns:**
```json
{
  "source": ["myapp.orders"],
  "detail-type": ["Order Placed"],
  "detail": {
    "state": ["confirmed"]
  }
}
```

**Custom Event Bus:**
- **Default**: AWS services
- **Custom**: Application events
- **Partner**: SaaS integrations

## 🛠️ HANDS-ON PRÁTICO

### Exercício 1: API Gateway com Caching
```yaml
# SAM Template
CachedAPI:
  Type: AWS::Serverless::Api
  Properties:
    StageName: prod
    CacheClusterEnabled: true
    CacheClusterSize: 0.5
    MethodSettings:
      - ResourcePath: /users/{id}
        HttpMethod: GET
        CachingEnabled: true
        CacheTtlInSeconds: 300
        CacheKeyParameters:
          - method.request.path.id
```

### Exercício 2: SQS com DLQ
```python
import boto3
import json

sqs = boto3.client('sqs')

def process_orders():
    queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789012/order-queue'
    
    while True:
        # Receber mensagens
        response = sqs.receive_message(
            QueueUrl=queue_url,
            MaxNumberOfMessages=10,
            WaitTimeSeconds=20,  # Long polling
            VisibilityTimeoutSeconds=30
        )
        
        messages = response.get('Messages', [])
        
        for message in messages:
            try:
                # Processar mensagem
                body = json.loads(message['Body'])
                process_order(body)
                
                # Deletar mensagem após processamento
                sqs.delete_message(
                    QueueUrl=queue_url,
                    ReceiptHandle=message['ReceiptHandle']
                )
                
            except Exception as e:
                print(f"Error processing message: {e}")
                # Mensagem volta para a queue automaticamente
                # Após MaxReceiveCount, vai para DLQ

def process_order(order_data):
    # Simular processamento
    if order_data.get('amount', 0) < 0:
        raise ValueError("Invalid order amount")
    
    print(f"Processing order: {order_data['orderId']}")
```

### Exercício 3: EventBridge com Custom Events
```python
import boto3
import json
from datetime import datetime

eventbridge = boto3.client('events')

def publish_order_event(order_data):
    """Publicar evento customizado no EventBridge"""
    
    event = {
        'Source': 'dva.ecommerce',
        'DetailType': 'Order Placed',
        'Detail': json.dumps({
            'orderId': order_data['orderId'],
            'customerId': order_data['customerId'],
            'amount': order_data['amount'],
            'timestamp': datetime.utcnow().isoformat()
        }),
        'EventBusName': 'dva-custom-bus'
    }
    
    response = eventbridge.put_events(Entries=[event])
    return response

# Lambda para processar eventos
def order_event_handler(event, context):
    """Handler para eventos de pedido"""
    
    for record in event['Records']:
        detail = record['detail']
        
        if detail['amount'] > 1000:
            # Processar pedidos de alto valor
            send_high_value_notification(detail)
        
        # Atualizar analytics
        update_order_analytics(detail)

def send_high_value_notification(order_detail):
    """Notificar pedidos de alto valor"""
    sns = boto3.client('sns')
    
    message = f"High value order: {order_detail['orderId']} - ${order_detail['amount']}"
    
    sns.publish(
        TopicArn='arn:aws:sns:us-east-1:123456789012:high-value-orders',
        Message=message,
        Subject='High Value Order Alert'
    )
```

## 🧠 MINI QUIZ

1. **Para garantir ordem de processamento de mensagens:**
   A) SQS Standard
   B) SQS FIFO
   C) SNS
   D) EventBridge

2. **API Gateway cache é armazenado:**
   A) No Lambda
   B) No CloudFront
   C) No API Gateway cluster
   D) No ElastiCache

3. **Para processar eventos de múltiplas fontes AWS:**
   A) SQS
   B) SNS
   C) EventBridge
   D) Kinesis

**Respostas:** 1-B, 2-C, 3-C
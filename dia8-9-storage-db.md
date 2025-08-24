# DIAS 8-9: S3 + STORAGE + DATABASES

## 📋 Objetivo dos Dias 8-9
Dominar **S3 avançado**, **storage services** e **databases** (RDS, DynamoDB, ElastiCache).

## 🎯 TEORIA ESSENCIAL

### 1. Amazon S3 - Conceitos Avançados

**Storage Classes:**
- **Standard**: 99.999999999% (11 9's) durabilidade
- **IA (Infrequent Access)**: Acesso menos frequente, menor custo
- **One Zone-IA**: Uma AZ apenas, 20% mais barato
- **Glacier**: Arquivamento, retrieval em minutos/horas
- **Deep Archive**: Arquivamento longo prazo, retrieval em 12h

**Versionamento e Lifecycle:**
```json
{
  "Rules": [{
    "Status": "Enabled",
    "Transitions": [
      {
        "Days": 30,
        "StorageClass": "STANDARD_IA"
      },
      {
        "Days": 90,
        "StorageClass": "GLACIER"
      }
    ]
  }]
}
```

**Cross-Region Replication (CRR):**
- **Requisitos**: Versionamento habilitado, IAM role
- **Casos de uso**: Compliance, latência, backup

### 2. Amazon RDS

**Multi-AZ vs Read Replicas:**
```
Multi-AZ:
- Failover automático
- Mesma região
- Não melhora performance de leitura

Read Replicas:
- Scale de leitura
- Cross-region possível
- Eventual consistency
```

**Backup e Recovery:**
- **Automated Backups**: 1-35 dias retention
- **Manual Snapshots**: Até você deletar
- **Point-in-Time Recovery**: Até o segundo

### 3. Amazon DynamoDB

**Conceitos críticos:**
- **Partition Key**: Distribui dados
- **Sort Key**: Ordena dentro da partição
- **GSI**: Global Secondary Index, diferentes keys
- **LSI**: Local Secondary Index, mesmo partition key

**Capacity Modes:**
- **Provisioned**: RCU/WCU fixos, mais barato se previsível
- **On-Demand**: Pay-per-request, para workloads imprevisíveis

**DynamoDB Streams:**
- **Retention**: 24 horas
- **Shard iterators**: TRIM_HORIZON, LATEST
- **Lambda triggers**: Processamento em tempo real

### 4. ElastiCache

**Redis vs Memcached:**
```
Redis:
- Persistência
- Replicação
- Clustering
- Pub/Sub
- Lua scripts

Memcached:
- Simples
- Multi-threaded
- Sem persistência
- Horizontal scaling
```

## 🛠️ HANDS-ON PRÁTICO

### Exercício 1: S3 com Lambda Trigger
```python
import boto3
import json
from urllib.parse import unquote_plus

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        
        # Processar apenas imagens
        if not key.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
            
        # Obter metadados
        response = s3_client.head_object(Bucket=bucket, Key=key)
        
        # Salvar no DynamoDB
        table = dynamodb.Table('image-metadata')
        table.put_item(
            Item={
                'image_key': key,
                'bucket': bucket,
                'size': response['ContentLength'],
                'last_modified': response['LastModified'].isoformat(),
                'content_type': response.get('ContentType', 'unknown')
            }
        )
    
    return {'statusCode': 200}
```

### Exercício 2: DynamoDB com GSI
```python
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('user-orders')

def get_orders_by_status(status):
    """Query usando GSI por status"""
    response = table.query(
        IndexName='status-index',
        KeyConditionExpression=Key('status').eq(status)
    )
    return response['Items']

def get_user_orders(user_id):
    """Query por partition key"""
    response = table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )
    return response['Items']

# Batch operations
def batch_write_orders(orders):
    with table.batch_writer() as batch:
        for order in orders:
            batch.put_item(Item=order)
```

### Exercício 3: RDS com Read Replica
```bash
# Criar RDS instance
aws rds create-db-instance \
    --db-instance-identifier dva-primary-db \
    --db-instance-class db.t3.micro \
    --engine mysql \
    --master-username admin \
    --master-user-password mypassword \
    --allocated-storage 20 \
    --vpc-security-group-ids sg-12345678 \
    --backup-retention-period 7 \
    --multi-az

# Criar Read Replica
aws rds create-db-instance-read-replica \
    --db-instance-identifier dva-read-replica \
    --source-db-instance-identifier dva-primary-db \
    --db-instance-class db.t3.micro
```

## 🧠 MINI QUIZ

1. **Para otimizar custos no S3 com arquivos acessados raramente:**
   A) Usar Standard storage class
   B) Implementar Lifecycle policies
   C) Usar versioning
   D) Usar CRR

2. **DynamoDB eventual consistency se aplica a:**
   A) Writes apenas
   B) Reads após writes
   C) GSI queries
   D) Scan operations

3. **Para cache de sessões web distribuído:**
   A) ElastiCache Redis
   B) ElastiCache Memcached
   C) DynamoDB
   D) RDS

**Respostas:** 1-B, 2-C, 3-A
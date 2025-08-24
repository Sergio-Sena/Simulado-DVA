# DIAS 12-13: CI/CD + MONITORING + SECURITY

## 📋 Objetivo dos Dias 12-13
Dominar **CodeCommit, CodeBuild, CodeDeploy, CodePipeline**, **CloudWatch, X-Ray** e **Security**.

## 🎯 TEORIA ESSENCIAL

### 1. AWS CodeCommit
**Git-based source control:**
- **Encryption**: At rest e in transit
- **Access Control**: IAM policies
- **Triggers**: Lambda, SNS
- **Cross-region replication**: Manual setup

### 2. AWS CodeBuild
**Managed build service:**
- **Build Phases**: install, pre_build, build, post_build
- **Artifacts**: S3 storage
- **Environment**: Docker containers
- **Caching**: S3 ou local

**buildspec.yml:**
```yaml
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 14
  pre_build:
    commands:
      - npm install
  build:
    commands:
      - npm run build
      - npm test
  post_build:
    commands:
      - echo Build completed
artifacts:
  files:
    - '**/*'
  base-directory: dist
```

### 3. AWS CodeDeploy
**Deployment strategies:**
- **In-place**: Atualiza instâncias existentes
- **Blue/Green**: Nova infraestrutura

**Application types:**
- **EC2/On-premises**: Rolling deployments
- **Lambda**: Canary, Linear, All-at-once
- **ECS**: Blue/Green com ALB

### 4. CloudWatch
**Métricas e Logs:**
- **Custom Metrics**: PutMetricData API
- **Log Groups**: Retention policies
- **Log Streams**: Sequence of events
- **Metric Filters**: Extract metrics from logs

**CloudWatch Alarms:**
```json
{
  "AlarmName": "HighErrorRate",
  "MetricName": "Errors",
  "Namespace": "AWS/Lambda",
  "Statistic": "Sum",
  "Period": 300,
  "EvaluationPeriods": 2,
  "Threshold": 10,
  "ComparisonOperator": "GreaterThanThreshold"
}
```

### 5. AWS X-Ray
**Distributed tracing:**
- **Traces**: End-to-end request path
- **Segments**: Individual service calls
- **Subsegments**: Granular operations
- **Annotations**: Indexed metadata
- **Metadata**: Non-indexed data

## 🛠️ HANDS-ON PRÁTICO

### Exercício 1: CodePipeline Completo
```yaml
# pipeline-template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  CodePipeline:
    Type: AWS::CodePipeline::Pipeline
    Properties:
      RoleArn: !GetAtt CodePipelineRole.Arn
      Stages:
        - Name: Source
          Actions:
            - Name: SourceAction
              ActionTypeId:
                Category: Source
                Owner: AWS
                Provider: CodeCommit
                Version: 1
              Configuration:
                RepositoryName: !Ref RepoName
                BranchName: main
              OutputArtifacts:
                - Name: SourceOutput
        
        - Name: Build
          Actions:
            - Name: BuildAction
              ActionTypeId:
                Category: Build
                Owner: AWS
                Provider: CodeBuild
                Version: 1
              Configuration:
                ProjectName: !Ref CodeBuildProject
              InputArtifacts:
                - Name: SourceOutput
              OutputArtifacts:
                - Name: BuildOutput
        
        - Name: Deploy
          Actions:
            - Name: DeployAction
              ActionTypeId:
                Category: Deploy
                Owner: AWS
                Provider: CodeDeploy
                Version: 1
              Configuration:
                ApplicationName: !Ref CodeDeployApplication
                DeploymentGroupName: !Ref DeploymentGroup
              InputArtifacts:
                - Name: BuildOutput
```

### Exercício 2: Lambda com X-Ray
```python
import json
import boto3
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all

# Patch AWS SDK calls
patch_all()

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

@xray_recorder.capture('lambda_handler')
def lambda_handler(event, context):
    
    user_id = event.get('userId')
    
    # Criar subsegment para validação
    with xray_recorder.in_subsegment('validate_input'):
        if not user_id:
            raise ValueError('User ID is required')
    
    # Buscar usuário no DynamoDB
    with xray_recorder.in_subsegment('get_user_from_db'):
        xray_recorder.current_subsegment().put_annotation('user_id', user_id)
        
        response = table.get_item(Key={'userId': user_id})
        
        if 'Item' not in response:
            xray_recorder.current_subsegment().put_metadata('error', 'User not found')
            raise Exception('User not found')
    
    # Processar dados do usuário
    user_data = response['Item']
    
    with xray_recorder.in_subsegment('process_user_data'):
        processed_data = {
            'userId': user_data['userId'],
            'name': user_data['name'],
            'lastLogin': user_data.get('lastLogin', 'Never')
        }
        
        xray_recorder.current_subsegment().put_metadata('processed_data', processed_data)
    
    return {
        'statusCode': 200,
        'body': json.dumps(processed_data)
    }
```

### Exercício 3: CloudWatch Custom Metrics
```python
import boto3
import time
from datetime import datetime

cloudwatch = boto3.client('cloudwatch')

def put_custom_metric(metric_name, value, unit='Count', namespace='DVA/Application'):
    """Enviar métrica customizada para CloudWatch"""
    
    try:
        response = cloudwatch.put_metric_data(
            Namespace=namespace,
            MetricData=[
                {
                    'MetricName': metric_name,
                    'Value': value,
                    'Unit': unit,
                    'Timestamp': datetime.utcnow(),
                    'Dimensions': [
                        {
                            'Name': 'Environment',
                            'Value': 'production'
                        },
                        {
                            'Name': 'Application',
                            'Value': 'ecommerce'
                        }
                    ]
                }
            ]
        )
        return response
    except Exception as e:
        print(f"Error sending metric: {e}")

# Exemplo de uso em aplicação
def process_order(order_data):
    start_time = time.time()
    
    try:
        # Processar pedido
        result = handle_order_processing(order_data)
        
        # Métrica de sucesso
        put_custom_metric('OrdersProcessed', 1)
        
        return result
        
    except Exception as e:
        # Métrica de erro
        put_custom_metric('OrderProcessingErrors', 1)
        raise e
        
    finally:
        # Métrica de latência
        processing_time = (time.time() - start_time) * 1000
        put_custom_metric('OrderProcessingLatency', processing_time, 'Milliseconds')

def handle_order_processing(order_data):
    # Lógica de processamento
    return {'status': 'processed', 'orderId': order_data['orderId']}
```

## 🧠 MINI QUIZ

1. **Para deployment com zero downtime no Lambda:**
   A) All-at-once
   B) Canary
   C) Rolling
   D) Blue/Green

2. **X-Ray traces são compostos de:**
   A) Logs apenas
   B) Segments e subsegments
   C) Métricas apenas
   D) Alarms

3. **CodeBuild executa em:**
   A) EC2 instances
   B) Lambda functions
   C) Docker containers
   D) ECS tasks

**Respostas:** 1-B, 2-B, 3-C
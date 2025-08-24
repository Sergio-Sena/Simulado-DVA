#!/bin/bash

# Dia 3 - Deploy da arquitetura serverless

# 1. Validar template SAM
echo "Validando template SAM..."
sam validate --template dia3-sam-template.yaml

# 2. Build da aplicação
echo "Building aplicação SAM..."
sam build --template dia3-sam-template.yaml

# 3. Deploy com parâmetros
echo "Fazendo deploy..."
sam deploy \
  --template-file .aws-sam/build/template.yaml \
  --stack-name dva-serverless-stack \
  --parameter-overrides Environment=dev \
  --capabilities CAPABILITY_IAM \
  --region us-east-1 \
  --confirm-changeset

# 4. Obter outputs do stack
echo "Obtendo informações do stack..."
aws cloudformation describe-stacks \
  --stack-name dva-serverless-stack \
  --query 'Stacks[0].Outputs'

# 5. Testar upload no S3
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name dva-serverless-stack \
  --query 'Stacks[0].Outputs[?OutputKey==`UploadBucketName`].OutputValue' \
  --output text)

echo "Bucket criado: $BUCKET_NAME"

# Criar arquivo de teste
echo "Criando arquivo de teste..."
echo "Test image content" > test-image.jpg

# Upload de teste
echo "Fazendo upload de teste..."
aws s3 cp test-image.jpg s3://$BUCKET_NAME/uploads/test-image.jpg

# 6. Verificar logs da Lambda
echo "Aguardando processamento..."
sleep 10

FUNCTION_NAME=$(aws cloudformation describe-stacks \
  --stack-name dva-serverless-stack \
  --query 'Stacks[0].Outputs[?OutputKey==`LambdaFunctionArn`].OutputValue' \
  --output text | cut -d':' -f7)

echo "Verificando logs da função: $FUNCTION_NAME"
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/$FUNCTION_NAME"

# 7. Verificar DynamoDB
TABLE_NAME=$(aws cloudformation describe-stacks \
  --stack-name dva-serverless-stack \
  --query 'Stacks[0].Outputs[?OutputKey==`DynamoDBTableName`].OutputValue' \
  --output text)

echo "Verificando registros no DynamoDB: $TABLE_NAME"
aws dynamodb scan --table-name $TABLE_NAME --max-items 5

# 8. Monitorar métricas
echo "Métricas da Lambda (últimos 5 minutos):"
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=$FUNCTION_NAME \
  --start-time $(date -u -d '5 minutes ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 300 \
  --statistics Sum

echo "Deploy e teste concluídos!"
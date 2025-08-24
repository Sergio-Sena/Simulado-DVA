import json
import boto3
import logging
from datetime import datetime

# Configurar logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Clientes AWS
s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    """
    Lambda function para processar uploads no S3
    Triggered por S3 PUT events
    """
    
    try:
        # Processar cada record do evento S3
        for record in event['Records']:
            # Extrair informações do evento
            bucket_name = record['s3']['bucket']['name']
            object_key = record['s3']['object']['key']
            event_name = record['eventName']
            
            logger.info(f"Processando: {event_name} - {bucket_name}/{object_key}")
            
            # Validar se é um evento de criação
            if not event_name.startswith('ObjectCreated'):
                logger.warning(f"Evento ignorado: {event_name}")
                continue
            
            # Obter metadados do objeto
            response = s3_client.head_object(Bucket=bucket_name, Key=object_key)
            file_size = response['ContentLength']
            last_modified = response['LastModified']
            content_type = response.get('ContentType', 'unknown')
            
            # Processar apenas arquivos de imagem
            if not content_type.startswith('image/'):
                logger.info(f"Arquivo não é imagem: {content_type}")
                continue
            
            # Salvar metadados no DynamoDB
            table = dynamodb.Table('dva-file-metadata')
            
            table.put_item(
                Item={
                    'file_key': object_key,
                    'bucket_name': bucket_name,
                    'file_size': file_size,
                    'content_type': content_type,
                    'upload_time': last_modified.isoformat(),
                    'processed_time': datetime.utcnow().isoformat(),
                    'status': 'processed'
                }
            )
            
            logger.info(f"Metadados salvos para: {object_key}")
            
            # Simular processamento adicional (resize, thumbnail, etc.)
            process_image(bucket_name, object_key)
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': f'Processados {len(event["Records"])} arquivos com sucesso',
                'timestamp': datetime.utcnow().isoformat()
            })
        }
        
    except Exception as e:
        logger.error(f"Erro no processamento: {str(e)}")
        
        # Em caso de erro, a mensagem vai para DLQ automaticamente
        # se configurado no event source mapping
        raise e

def process_image(bucket_name, object_key):
    """
    Simula processamento de imagem
    Em produção: resize, thumbnail, OCR, etc.
    """
    
    try:
        # Simular processamento
        logger.info(f"Iniciando processamento de imagem: {object_key}")
        
        # Aqui você adicionaria:
        # - Resize da imagem
        # - Geração de thumbnail
        # - Extração de metadados EXIF
        # - OCR se necessário
        # - Upload para bucket de destino
        
        # Exemplo: copiar para bucket processado
        copy_source = {'Bucket': bucket_name, 'Key': object_key}
        
        s3_client.copy_object(
            CopySource=copy_source,
            Bucket=f"{bucket_name}-processed",
            Key=f"processed/{object_key}",
            MetadataDirective='REPLACE',
            Metadata={
                'processed-by': 'lambda-function',
                'processed-time': datetime.utcnow().isoformat()
            }
        )
        
        logger.info(f"Imagem processada e copiada: {object_key}")
        
    except Exception as e:
        logger.error(f"Erro no processamento da imagem {object_key}: {str(e)}")
        raise e
import json
import jwt
import boto3
from datetime import datetime, timedelta

# Cliente DynamoDB para cache de tokens
dynamodb = boto3.resource('dynamodb')
token_cache = dynamodb.Table('dva-token-cache')

def lambda_handler(event, context):
    """
    Lambda Authorizer para API Gateway
    Valida JWT tokens e retorna policy IAM
    """
    
    try:
        # Extrair token do header Authorization
        token = event['authorizationToken']
        
        if not token or not token.startswith('Bearer '):
            raise Exception('Unauthorized')
        
        # Remover 'Bearer ' do token
        jwt_token = token[7:]
        
        # Verificar cache primeiro (performance)
        cached_policy = get_cached_policy(jwt_token)
        if cached_policy:
            return cached_policy
        
        # Validar JWT token
        decoded_token = validate_jwt_token(jwt_token)
        
        # Extrair informações do usuário
        user_id = decoded_token.get('sub')
        user_role = decoded_token.get('role', 'user')
        user_permissions = decoded_token.get('permissions', [])
        
        # Gerar policy baseada no role
        policy = generate_policy(user_id, user_role, user_permissions, event['methodArn'])
        
        # Cache da policy (5 minutos)
        cache_policy(jwt_token, policy)
        
        return policy
        
    except Exception as e:
        print(f"Authorization failed: {str(e)}")
        raise Exception('Unauthorized')

def validate_jwt_token(token):
    """
    Valida JWT token
    Em produção: usar chaves públicas do Cognito/Auth0
    """
    
    try:
        # Secret key (em produção, usar AWS Secrets Manager)
        secret_key = "your-secret-key-here"
        
        # Decodificar e validar token
        decoded = jwt.decode(
            token, 
            secret_key, 
            algorithms=['HS256'],
            options={"verify_exp": True}
        )
        
        return decoded
        
    except jwt.ExpiredSignatureError:
        raise Exception('Token expired')
    except jwt.InvalidTokenError:
        raise Exception('Invalid token')

def generate_policy(principal_id, role, permissions, method_arn):
    """
    Gera policy IAM baseada no role do usuário
    """
    
    # Extrair informações do method ARN
    # arn:aws:execute-api:region:account:api-id/stage/method/resource
    arn_parts = method_arn.split(':')
    api_gateway_arn = f"{arn_parts[0]}:{arn_parts[1]}:{arn_parts[2]}:{arn_parts[3]}:{arn_parts[4]}:{arn_parts[5]}"
    
    # Definir recursos baseados no role
    if role == 'admin':
        resources = [f"{api_gateway_arn}/*/*"]  # Acesso total
    elif role == 'manager':
        resources = [
            f"{api_gateway_arn}/*/GET/*",
            f"{api_gateway_arn}/*/POST/*",
            f"{api_gateway_arn}/*/PUT/*"
        ]
    elif role == 'user':
        resources = [
            f"{api_gateway_arn}/*/GET/*",
            f"{api_gateway_arn}/*/POST/users/{principal_id}/*"  # Apenas seus próprios recursos
        ]
    else:
        resources = []  # Sem acesso
    
    # Construir policy
    policy = {
        'principalId': principal_id,
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': []
        },
        'context': {
            'userId': principal_id,
            'role': role,
            'permissions': ','.join(permissions)
        }
    }
    
    # Adicionar statements baseados nos recursos
    if resources:
        policy['policyDocument']['Statement'].append({
            'Action': 'execute-api:Invoke',
            'Effect': 'Allow',
            'Resource': resources
        })
    else:
        policy['policyDocument']['Statement'].append({
            'Action': 'execute-api:Invoke',
            'Effect': 'Deny',
            'Resource': method_arn
        })
    
    return policy

def get_cached_policy(token):
    """
    Busca policy no cache DynamoDB
    """
    
    try:
        response = token_cache.get_item(
            Key={'token_hash': hash_token(token)}
        )
        
        if 'Item' in response:
            # Verificar se não expirou
            expiry = datetime.fromisoformat(response['Item']['expiry'])
            if datetime.utcnow() < expiry:
                return json.loads(response['Item']['policy'])
        
        return None
        
    except Exception:
        return None

def cache_policy(token, policy):
    """
    Salva policy no cache DynamoDB
    """
    
    try:
        expiry = datetime.utcnow() + timedelta(minutes=5)
        
        token_cache.put_item(
            Item={
                'token_hash': hash_token(token),
                'policy': json.dumps(policy),
                'expiry': expiry.isoformat(),
                'ttl': int(expiry.timestamp())
            }
        )
        
    except Exception as e:
        print(f"Failed to cache policy: {str(e)}")

def hash_token(token):
    """
    Gera hash do token para usar como chave
    """
    import hashlib
    return hashlib.sha256(token.encode()).hexdigest()[:32]
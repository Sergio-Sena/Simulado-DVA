#!/bin/bash

# Dia 2 - Configuração Avançada de Security Groups e NACLs

# Assumindo VPC_ID do exercício anterior
VPC_ID="vpc-xxxxxxxxx"  # Substituir pelo ID real

# 1. Security Group para Web Servers
WEB_SG_ID=$(aws ec2 create-security-group --group-name DVA-Web-SG \
  --description "Security Group para Web Servers" --vpc-id $VPC_ID \
  --query 'GroupId' --output text)

# Regras para Web SG
aws ec2 authorize-security-group-ingress --group-id $WEB_SG_ID \
  --protocol tcp --port 80 --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress --group-id $WEB_SG_ID \
  --protocol tcp --port 443 --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress --group-id $WEB_SG_ID \
  --protocol tcp --port 22 --cidr 10.0.0.0/16

# 2. Security Group para Database
DB_SG_ID=$(aws ec2 create-security-group --group-name DVA-DB-SG \
  --description "Security Group para Database" --vpc-id $VPC_ID \
  --query 'GroupId' --output text)

# Permitir acesso MySQL apenas do Web SG
aws ec2 authorize-security-group-ingress --group-id $DB_SG_ID \
  --protocol tcp --port 3306 --source-group $WEB_SG_ID

# 3. NACL Personalizada
NACL_ID=$(aws ec2 create-network-acl --vpc-id $VPC_ID \
  --tag-specifications 'ResourceType=network-acl,Tags=[{Key=Name,Value=DVA-Custom-NACL}]' \
  --query 'NetworkAcl.NetworkAclId' --output text)

# Regras NACL (Stateless - precisa de inbound E outbound)
# Inbound HTTP
aws ec2 create-network-acl-entry --network-acl-id $NACL_ID \
  --rule-number 100 --protocol tcp --port-range From=80,To=80 \
  --cidr-block 0.0.0.0/0 --rule-action allow

# Inbound HTTPS  
aws ec2 create-network-acl-entry --network-acl-id $NACL_ID \
  --rule-number 110 --protocol tcp --port-range From=443,To=443 \
  --cidr-block 0.0.0.0/0 --rule-action allow

# Inbound SSH (apenas da rede interna)
aws ec2 create-network-acl-entry --network-acl-id $NACL_ID \
  --rule-number 120 --protocol tcp --port-range From=22,To=22 \
  --cidr-block 10.0.0.0/16 --rule-action allow

# Inbound Ephemeral Ports (para return traffic)
aws ec2 create-network-acl-entry --network-acl-id $NACL_ID \
  --rule-number 130 --protocol tcp --port-range From=1024,To=65535 \
  --cidr-block 0.0.0.0/0 --rule-action allow

# Outbound rules
aws ec2 create-network-acl-entry --network-acl-id $NACL_ID \
  --rule-number 100 --protocol tcp --port-range From=80,To=80 \
  --cidr-block 0.0.0.0/0 --rule-action allow --egress

aws ec2 create-network-acl-entry --network-acl-id $NACL_ID \
  --rule-number 110 --protocol tcp --port-range From=443,To=443 \
  --cidr-block 0.0.0.0/0 --rule-action allow --egress

aws ec2 create-network-acl-entry --network-acl-id $NACL_ID \
  --rule-number 120 --protocol tcp --port-range From=1024,To=65535 \
  --cidr-block 0.0.0.0/0 --rule-action allow --egress

echo "Security Groups e NACLs configurados:"
echo "Web SG: $WEB_SG_ID"
echo "DB SG: $DB_SG_ID"  
echo "Custom NACL: $NACL_ID"
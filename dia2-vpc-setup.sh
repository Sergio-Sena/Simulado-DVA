#!/bin/bash

# Dia 2 - VPC Setup Completo para DVA-C02

# 1. Criar VPC
VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 \
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=DVA-VPC}]' \
  --query 'Vpc.VpcId' --output text)

echo "VPC criada: $VPC_ID"

# 2. Criar Internet Gateway
IGW_ID=$(aws ec2 create-internet-gateway \
  --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=DVA-IGW}]' \
  --query 'InternetGateway.InternetGatewayId' --output text)

# Anexar IGW à VPC
aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID

# 3. Criar Subnets
PUBLIC_SUBNET_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID \
  --cidr-block 10.0.1.0/24 --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=DVA-Public-1a}]' \
  --query 'Subnet.SubnetId' --output text)

PRIVATE_SUBNET_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID \
  --cidr-block 10.0.2.0/24 --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=DVA-Private-1a}]' \
  --query 'Subnet.SubnetId' --output text)

# 4. Criar NAT Gateway
# Primeiro, alocar Elastic IP
EIP_ALLOC=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)

NAT_GW_ID=$(aws ec2 create-nat-gateway --subnet-id $PUBLIC_SUBNET_ID \
  --allocation-id $EIP_ALLOC \
  --tag-specifications 'ResourceType=nat-gateway,Tags=[{Key=Name,Value=DVA-NAT}]' \
  --query 'NatGateway.NatGatewayId' --output text)

# 5. Configurar Route Tables
# Route Table para subnet pública
PUBLIC_RT_ID=$(aws ec2 create-route-table --vpc-id $VPC_ID \
  --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=DVA-Public-RT}]' \
  --query 'RouteTable.RouteTableId' --output text)

# Adicionar rota para Internet Gateway
aws ec2 create-route --route-table-id $PUBLIC_RT_ID \
  --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID

# Associar subnet pública à route table
aws ec2 associate-route-table --subnet-id $PUBLIC_SUBNET_ID --route-table-id $PUBLIC_RT_ID

# Route Table para subnet privada
PRIVATE_RT_ID=$(aws ec2 create-route-table --vpc-id $VPC_ID \
  --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=DVA-Private-RT}]' \
  --query 'RouteTable.RouteTableId' --output text)

# Aguardar NAT Gateway ficar disponível
echo "Aguardando NAT Gateway ficar disponível..."
aws ec2 wait nat-gateway-available --nat-gateway-ids $NAT_GW_ID

# Adicionar rota para NAT Gateway
aws ec2 create-route --route-table-id $PRIVATE_RT_ID \
  --destination-cidr-block 0.0.0.0/0 --nat-gateway-id $NAT_GW_ID

# Associar subnet privada à route table
aws ec2 associate-route-table --subnet-id $PRIVATE_SUBNET_ID --route-table-id $PRIVATE_RT_ID

echo "VPC Setup completo!"
echo "VPC ID: $VPC_ID"
echo "Public Subnet: $PUBLIC_SUBNET_ID"
echo "Private Subnet: $PRIVATE_SUBNET_ID"
echo "NAT Gateway: $NAT_GW_ID"
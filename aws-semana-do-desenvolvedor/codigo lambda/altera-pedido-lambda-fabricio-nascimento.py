import json
import os
import boto3
from datetime import datetime

# Nome da tabela DynamoDB vindo da variável de ambiente
DYNAMODB_TABLE_NAME = os.environ['DYNAMODB_TABLE_NAME']
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(DYNAMODB_TABLE_NAME)

def lambda_handler(event, context):
    print(f"Evento SQS (alteração) recebido: {json.dumps(event)}")

    for record in event['Records']:
        pedido_id = None
        try:
            eventbridge_event = json.loads(record['body'])
            print(f"Evento EventBridge recebido via SQS: {json.dumps(eventbridge_event)}")

            if 'detail' not in eventbridge_event:
                print(f"Erro: Campo 'detail' não encontrado no evento: {eventbridge_event}")
                continue

            pedido_data = eventbridge_event['detail']
            pedido_id = pedido_data.get('pedidoId')
            novos_itens = pedido_data.get('novosItens')

            if not pedido_id or novos_itens is None:
                print(f"Erro: pedidoId ou novosItens não encontrados nos detalhes do evento: {pedido_data}")
                continue

            print(f"Processando alteração para pedido: {pedido_id} com novos itens: {novos_itens}")

            # Atualiza itens e status no DynamoDB
            response = table.update_item(
                Key={'pedidoId': str(pedido_id)},
                UpdateExpression="SET itens = :i, statusPedido = :s, timestampAtualizacao = :ts",
                ExpressionAttributeValues={
                    ':i': novos_itens,
                    ':s': 'ALTERADO',
                    ':ts': datetime.utcnow().isoformat() + "Z"
                },
                ReturnValues="UPDATED_NEW"
            )
            print(f"Pedido {pedido_id} atualizado para ALTERADO. Resposta DynamoDB: {json.dumps(response)}")

        except json.JSONDecodeError as je:
            print(f"Erro de JSON ao processar registro {record.get('messageId', 'sem ID')}: {str(je)}")
            raise je
        except Exception as e:
            print(f"Erro ao processar alteração {record.get('messageId', 'sem ID')} (pedidoId: {pedido_id}): {str(e)}")
            raise e

    return {
        'statusCode': 200,
        'body': 'Processamento de alterações concluído'
    }

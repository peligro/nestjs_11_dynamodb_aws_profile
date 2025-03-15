import { Inject, Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DynamodbService {
  private readonly tableName = 'cencosud_micd'; // Nombre de la tabla en DynamoDB

  constructor(
    @Inject('DYNAMODB_CLIENT') // Inyecta el cliente de DynamoDB
    private readonly client: DynamoDBDocumentClient,
  ) {}

  // Crear un nuevo ítem
  async create(item: any) {
    const id = uuidv4();
    
    const data = {
      id,
      ...item
    };
    /*
    const data = {
      id,
      nombre: 'César',
    };*/
    const command = new PutCommand({
      TableName: this.tableName,
      Item: data,
    });
    return await this.client.send(command);
  }

  // Obtener un ítem por su ID
  async findOne(id: string) {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result = await this.client.send(command);

    // Verificar si el ítem existe
    if (!result.Item) {
      return { error: `Ocurrió un error inesperado` }; // Retornar un mensaje de error
    }

    return result.Item; // Retornar el ítem si existe
  }

  // Actualizar un ítem
  async update(id: string, item: any) {
    // Validamos si existe el registro
    const command1 = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result1 = await this.client.send(command1);

    // Verificar si el ítem existe
    if (!result1.Item) {
      return { error: `Ocurrió un error inesperado` }; // Retornar un mensaje de error
    }

    // Definir explícitamente el tipo de updateExpression como string[]
    const updateExpression: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    for (const [key, value] of Object.entries(item)) {
      if (key !== 'id') {
        // Evitar actualizar el campo 'id'
        updateExpression.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = value;
      }
    }

    // Si no hay campos para actualizar, retornar un error
    if (updateExpression.length === 0) {
      throw new Error('No fields to update');
    }

    // Crear el comando de actualización
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpression.join(', ')}`, // Unir las expresiones con comas
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW', // Retornar el ítem actualizado
    });

    // Ejecutar el comando
    const result = await this.client.send(command);
    return result.Attributes;
  }

  // Eliminar un ítem
  async delete(id: string) {
    // Validamos si existe el registro
    const command1 = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result1 = await this.client.send(command1);

    // Verificar si el ítem existe
    if (!result1.Item) {
      return { error: `Ocurrió un error inesperado` }; // Retornar un mensaje de error
    }

    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    });

    return await this.client.send(command);
  }

  // Listar todos los ítems (usando ScanCommand)
  async findAll() {
    const command = new ScanCommand({
      TableName: this.tableName,
    });
    const result = await this.client.send(command);

    // Ordenar los ítems en memoria por `createdAt` en orden descendente
    if (result.Items) {
      result.Items.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }

    return result.Items;
  }

  // Listar ítems usando QueryCommand (requiere un GSI)
  async findAllWithQuery() {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'CreatedAtIndex', // Nombre del GSI
      ScanIndexForward: false, // Orden descendente
    });

    const result = await this.client.send(command);
    return result.Items;
  }
}
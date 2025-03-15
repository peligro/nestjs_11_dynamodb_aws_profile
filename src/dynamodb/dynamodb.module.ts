import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamodbService } from './dynamodb.service'; // Importa el servicio
import { ItemsController } from '../items/items.controller'; // Importa el controlador

@Module({})
export class DynamodbModule {
  static forRoot(): DynamicModule {
    const dynamoDBClientProvider: Provider = {
      provide: 'DYNAMODB_CLIENT', // Token para inyectar el cliente
      useValue: DynamoDBDocumentClient.from(
        new DynamoDBClient({
          region: process.env.AWS_REGION,
          endpoint: process.env.AWS_PROFILE,
          credentials: {
            accessKeyId: 'dummy',
            secretAccessKey: 'dummy',
          },
        }),
      ),
    };

    return {
      module: DynamodbModule,
      controllers: [ItemsController], // Registra el controlador
      providers: [dynamoDBClientProvider, DynamodbService], // Añade DynamodbService como provider
      exports: [dynamoDBClientProvider, DynamodbService], // Exporta DynamodbService
    };
  }
}
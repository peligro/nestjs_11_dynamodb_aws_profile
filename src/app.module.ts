import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DynamodbModule } from './dynamodb/dynamodb.module'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    DynamodbModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

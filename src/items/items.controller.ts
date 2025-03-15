import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DynamodbService } from '../dynamodb/dynamodb.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly dynamodbService: DynamodbService) { }

    @Post()
    async create(@Body() item: any) {
        return await this.dynamodbService.create(item);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.dynamodbService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() item: any) {
        return await this.dynamodbService.update(id, item);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.dynamodbService.delete(id);
    }

    @Get()
    async findAll() {
        return await this.dynamodbService.findAll();
    }
}
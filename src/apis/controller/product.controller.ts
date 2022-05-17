import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { logger } from 'src/config/logger.config';
import { Products } from 'src/entity/product.entity';
import { MongoRepository, ObjectID } from 'typeorm';

@Controller('/products/')
export class ProductController {
  constructor(
    @InjectRepository(Products)
    private readonly productRespository: MongoRepository<Products>,
  ) {}

  @Get()
  async getProducts(): Promise<Products[]> {
    try {
      return await this.productRespository.find();
    } catch (err: any) {
      logger.error(err);
      throw err;
    }
  }

  @Get(':id')
  async getIndividualProduct(@Param('id') id): Promise<Products> {
    try {
      const product = await this.productRespository.findOne(id);
      // ObjectID.isValid(id) && (await this.productRespository.findOne(id));
      if (!product) {
        throw new NotFoundException();
      }
      return product;
    } catch (err: any) {
      logger.error(err.message);
      throw err;
    }
  }

  @Post()
  async createProduct(@Body() product: Partial<Products>): Promise<Products> {
    if (!product || !product.name || !product.price || !product.quantity) {
      throw new BadRequestException(
        `A product must have name, price and quantity`,
      );
    }
    try {
      return await this.productRespository.save(product);
    } catch (err: any) {
      logger.error(err);
      throw err;
    }
  }

  @Put(':id')
  @HttpCode(204)
  async updateProduct(
    @Param('id') id,
    @Body() product: Partial<Products>,
  ): Promise<void> {
    const productExists = await this.productRespository.findOne(id);
    // ObjectID.isValid(id) && (await this.productRespository.findOne(id));
    if (!productExists) {
      throw new NotFoundException();
    }
    try {
      await this.productRespository.update(id, product);
    } catch (err: any) {
      logger.error(err);
      throw err;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id): Promise<void> {
    const productExists = await this.productRespository.findOne(id);
    // ObjectID.isValid(id) && (await this.productRespository.findOne(id));
    if (!productExists) {
      throw new NotFoundException();
    }
    try {
      await this.productRespository.delete(id);
    } catch (err: any) {
      logger.error(err);
      throw err;
    }
  }
}

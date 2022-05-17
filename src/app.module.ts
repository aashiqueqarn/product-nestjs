import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './apis/controller/product.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Products } from './entity/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      database: process.env.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts, .js}'],
      ssl: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      useNewUrlParser: true,
    }),
    TypeOrmModule.forFeature([Products]),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}

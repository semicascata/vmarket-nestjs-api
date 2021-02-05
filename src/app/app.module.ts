import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '../modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '../config/db/db.config';
import { ProviderModule } from '../modules/provider/provider.module';
import { OrderModule } from '../modules/order/order.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    ProductModule,
    ProviderModule,
    OrderModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

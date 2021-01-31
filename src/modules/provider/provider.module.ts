import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { ProviderRepository } from './provider.respository';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderRepository])],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}

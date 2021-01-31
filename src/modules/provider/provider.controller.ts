import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { Provider } from './entity/provider.entity';
import { NewProviderDto } from './dto/provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('api/v1/providers')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @Get()
  async fetchProviders(): Promise<Provider[]> {
    return this.providerService.fetchProviders();
  }

  @Get(':id')
  async getProvider(@Param('id') id: number): Promise<Provider> {
    return this.providerService.getProvider(id);
  }

  @Post('new')
  async addProvider(@Body() newProviderDto: NewProviderDto): Promise<Provider> {
    return this.providerService.addProvider(newProviderDto);
  }

  @Put('update/:id')
  async updateProvider(
    @Param('id') id: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ): Promise<any> {
    return this.providerService.updateProvider(updateProviderDto, id);
  }

  @Delete('del/:id')
  async deleteProvider(@Param('id') id: number): Promise<any> {
    return this.providerService.deleteProvider(id);
  }
}

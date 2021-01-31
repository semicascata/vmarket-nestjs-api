import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProviderRepository } from './provider.respository';
import { Provider } from './entity/provider.entity';
import { NewProviderDto } from './dto/provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProviderService {
  private logger = new Logger('ProviderService');
  constructor(private providerRepository: ProviderRepository) {}

  // fetch providers
  async fetchProviders(): Promise<Provider[]> {
    return this.providerRepository.fetchProviders();
  }

  // get single provider by id
  async getProvider(id: number): Promise<Provider> {
    return this.providerRepository.getProvider(id);
  }

  // add new provider
  async addProvider(newProviderDto: NewProviderDto): Promise<Provider> {
    const { name, state, city, email, contact1, contact2 } = newProviderDto;
    const newProvider = new Provider();

    newProvider.name = name;
    newProvider.state = state;
    newProvider.city = city;
    newProvider.email = email;
    newProvider.contact1 = contact1;
    contact2 ? (newProvider.contact2 = contact2) : null;

    try {
      await this.providerRepository.save(newProvider);
      this.logger.verbose(`new provider "${name}" registered`);
      return newProvider;
    } catch (err) {
      this.logger.error(`failed to register new provider - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to register new provider - ${err.message}`,
      );
    }
  }

  // update provider
  async updateProvider(
    updateProviderDto: UpdateProviderDto,
    id: number,
  ): Promise<any> {
    const provider = await this.providerRepository.findOne(id);

    try {
      await this.providerRepository.update(id, updateProviderDto);
      this.logger.verbose(`provider "${provider.name}" updated`);
      return {
        fieldsUpdated: updateProviderDto,
        provider,
      };
    } catch (err) {
      this.logger.error(
        `failed to update provider by id ${id} - ${err.message}`,
      );
      throw new InternalServerErrorException(
        `failed to update provider by id ${id} - ${err.message}`,
      );
    }
  }

  // delete provider
  async deleteProvider(id: number): Promise<any> {
    const provider = await this.providerRepository.findOne(id);

    try {
      await this.providerRepository.remove(provider);
      this.logger.verbose(`provider "${provider.name}" deleted`);
      return {
        providerDeleted: provider,
      };
    } catch (err) {
      this.logger.error(
        `failed to delete provider by id ${id} - ${err.message}`,
      );
      throw new InternalServerErrorException(
        `failed to delete provider by id ${id} - ${err.message}`,
      );
    }
  }
}

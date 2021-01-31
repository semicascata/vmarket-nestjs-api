import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Provider } from './entity/provider.entity';

@EntityRepository(Provider)
export class ProviderRepository extends Repository<Provider> {
  private logger = new Logger('ProviderRepository');

  // fetch providers
  async fetchProviders(): Promise<Provider[]> {
    const query = this.createQueryBuilder();

    try {
      const providers = await query.getMany();
      this.logger.verbose('fetching all providers');
      return providers;
    } catch (err) {
      this.logger.error(`error fetching providers - ${err.message}`);
      throw new InternalServerErrorException(
        `error fetching providers - ${err.message}`,
      );
    }
  }

  // get single provider by id
  async getProvider(id: number): Promise<Provider> {
    const query = this.createQueryBuilder();

    try {
      const provider = await query.where({ id: id }).getOne();
      this.logger.verbose(`returning provider "${provider.name}"`);
      return provider;
    } catch (err) {
      this.logger.error(`error getting provider by id ${id} - ${err.message}`);
      throw new InternalServerErrorException(
        `error getting provider by id ${id} - ${err.message}`,
      );
    }
  }
}

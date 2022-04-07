import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrganisationDTO } from './dto/create-organisation.dto';
import { Organisation } from './organisations.entity';

@EntityRepository(Organisation)
export class OrganisationsRepository extends Repository<Organisation> {
  private logger = new Logger('OrganisationRepository', { timestamp: true });

  async createOne(
    createOrganisationDTO: CreateOrganisationDTO,
  ): Promise<Organisation> {
    const { name, description, image } = createOrganisationDTO;
    const task = await this.create({
      name,
      description,
      image,
    });

    try {
      await this.save(task);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Organisation already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return task;
  }

  async fetchAll(): Promise<Organisation[]> {
    try {
      const query = this.createQueryBuilder('organisation');
      const organisation = await query
        .leftJoinAndSelect('organisation.rooms', 'rooms')
        .getMany();
      return organisation;
    } catch (error) {
      this.logger.error(`Failed to get organisations, ${error}`);
      throw new InternalServerErrorException();
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganisationDTO } from './dto/create-organisation.dto';
import { Organisation } from './organisations.entity';
import { OrganisationsRepository } from './organisations.repository';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(OrganisationsRepository)
    private organisationsRepository: OrganisationsRepository,
  ) {}

  async createOrganisation(
    createOrganisationDTO: CreateOrganisationDTO,
  ): Promise<Organisation> {
    return await this.organisationsRepository.createOne(createOrganisationDTO);
  }

  async fetchAllOrganisations(): Promise<Organisation[]> {
    return this.organisationsRepository.fetchAll();
  }
}

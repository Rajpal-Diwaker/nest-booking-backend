import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { CreateOrganisationDTO } from './dto/create-organisation.dto';
import { Organisation } from './organisations.entity';

import { OrganisationsService } from './organisations.service';

@Controller('organisations')
export class OrganisationsController {
  private logger = new Logger('OrganisationController');
  constructor(private organisationService: OrganisationsService) {}

  @Get()
  getOrganisations(): Promise<Organisation[]> {
    return this.organisationService.fetchAllOrganisations();
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin'])
  createOrganisation(
    @Body() createOrganisationDTO: CreateOrganisationDTO,
  ): Promise<Organisation> {
    return this.organisationService.createOrganisation(createOrganisationDTO);
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsRepository } from './organisations.repository';
import { OrganisationsService } from './organisations.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([OrganisationsRepository]),
    AuthModule,
  ],
  controllers: [OrganisationsController],
  providers: [OrganisationsService],
})
export class OrganisationsModule {}

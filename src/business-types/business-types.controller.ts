import { Controller, Get, UseGuards } from '@nestjs/common';
import { BusinessTypesService } from './business-types.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Controller('business-types')
@UseGuards(AccessTokenGuard)
export class BusinessTypesController {
  constructor(private readonly businessTypesService: BusinessTypesService) {}

  @Get()
  getBusinessTypes() {
    return this.businessTypesService.getAllBusinessTypes();
  }
}

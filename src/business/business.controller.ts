import { Controller, Get, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Controller('business')
@UseGuards(AccessTokenGuard)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  async getAllBusinesses() {
    return this.businessService.getAllBusinesses();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async getAllBusinesses() {
    return await this.businessRepository.find({
      select: [
        'id',
        'name',
        'email',
        'deliveryCost',
        'image',
        'isEnabled',
        'openingTime',
        'closingTime',
        'isOpen',
        'phoneNumber',
        'countryPhoneCode',
      ],
    });
  }
}

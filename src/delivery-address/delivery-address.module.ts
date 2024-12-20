import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { DeliveryAddressController } from './delivery-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAddress } from './entities/delivery-address.entity';

@Module({
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService],
  imports: [TypeOrmModule.forFeature([DeliveryAddress])],
})
export class DeliveryAddressModule {}

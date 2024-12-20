import { Injectable } from '@nestjs/common';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Injectable()
export class DeliveryAddressService {
  constructor(
    @InjectRepository(DeliveryAddress)
    private readonly deliveryAddressRepository: Repository<DeliveryAddress>,
  ) {}

  async create(createDeliveryAddressDto: CreateDeliveryAddressDto, user: User) {
    const deliveryAddress = this.deliveryAddressRepository.create({
      name: createDeliveryAddressDto.name,
      latitude: createDeliveryAddressDto.latitude,
      longitude: createDeliveryAddressDto.longitude,
      references: createDeliveryAddressDto.references,
      user,
    });

    await this.deliveryAddressRepository.save(deliveryAddress);

    delete deliveryAddress.user;

    return {
      success: true,
      message: 'Delivery address created successfully',
      deliveryAddress,
    };
  }

  async findAll(user: User) {
    return await this.deliveryAddressRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async findOne(id: string, @GetUser() user: User) {
    return this.deliveryAddressRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });
  }

  async update(
    id: string,
    updateDeliveryAddressDto: UpdateDeliveryAddressDto,
    user: User,
  ) {
    const deliveryAddress = await this.deliveryAddressRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (!deliveryAddress) {
      return {
        success: false,
        message: 'Delivery address not found',
      };
    }

    const storedDeliveryAddress = await this.deliveryAddressRepository.preload({
      id,
      ...updateDeliveryAddressDto,
    });

    const updatedDeliveryAddress = this.deliveryAddressRepository.save(
      storedDeliveryAddress,
    );

    return {
      success: true,
      message: 'Delivery address updated successfully',
      deliveryAddress: updatedDeliveryAddress,
    };
  }

  async remove(id: string, user: User) {
    const deliveryAddress = await this.findOne(id, user);

    if (!deliveryAddress) {
      return {
        success: false,
        message: 'Delivery address not found',
      };
    }

    await this.deliveryAddressRepository.delete(deliveryAddress);

    return {
      success: true,
      message: 'Delivery address deleted successfully',
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Controller('delivery-address')
@UseGuards(AccessTokenGuard)
export class DeliveryAddressController {
  constructor(
    private readonly deliveryAddressService: DeliveryAddressService,
  ) {}

  @Post()
  create(
    @Body() createDeliveryAddressDto: CreateDeliveryAddressDto,
    @GetUser() user: User,
  ) {
    return this.deliveryAddressService.create(createDeliveryAddressDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.deliveryAddressService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.deliveryAddressService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDeliveryAddressDto: UpdateDeliveryAddressDto,
    @GetUser() user: User,
  ) {
    return this.deliveryAddressService.update(
      id,
      updateDeliveryAddressDto,
      user,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.deliveryAddressService.remove(id, user);
  }
}

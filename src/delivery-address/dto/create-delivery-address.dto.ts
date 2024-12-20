import { IsString } from 'class-validator';

export class CreateDeliveryAddressDto {
  @IsString()
  name: string;

  @IsString()
  references: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;
}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAddressModule } from './delivery-address/delivery-address.module';
import { BusinessTypesModule } from './business-types/business-types.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      useUTC: false,
    }),
    DeliveryAddressModule,
    BusinessTypesModule,
    BusinessModule,
  ],
})
export class AppModule {}

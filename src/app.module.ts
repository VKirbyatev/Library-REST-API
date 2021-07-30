import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigModule } from './config/config.module';
import { ApiConfigService } from './config/config.service';
import { UserModule } from './users/user.module';
import { BooksModule } from './books/books.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (configService: ApiConfigService) => configService.typeOrmConfig,
      inject: [ApiConfigService],
    }),
    UserModule,
    BooksModule,
    SubscriptionModule,
  ],
})
export class AppModule {}

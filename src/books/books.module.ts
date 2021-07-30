import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionCheck } from 'src/middlewares/subscription-check.middleware';
import { Subscription } from 'src/subscription/subscription.entity';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { User } from 'src/users/user.entity';
import { BooksController } from './books.controller';
import { Book } from './books.entity';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Subscription]), SubscriptionModule],
  controllers: [BooksController],
  providers: [BooksService, SubscriptionService],
  exports: [SubscriptionService],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SubscriptionCheck).forRoutes({ path: 'api/books', method: RequestMethod.PUT });
  }
}

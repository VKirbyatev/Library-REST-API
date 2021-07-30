import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class SubscriptionCheck implements NestMiddleware {
  constructor(private readonly subsService: SubscriptionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.query;
    if (userId) {
      if (await this.subsService.checkSubscription(Number(userId))) {
        next();
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}

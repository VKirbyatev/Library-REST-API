import { Controller, Param, Put } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('api/subscription')
export class SubscriptionController {
  constructor(private subsService: SubscriptionService) {}

  @Put('/:userId')
  addSubscription(@Param('userId') userId: number) {
    return this.subsService.addSubscription(userId);
  }
}

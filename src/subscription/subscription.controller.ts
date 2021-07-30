import { Controller, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@ApiTags("Subscription's endpoints")
@Controller('api/subscription')
export class SubscriptionController {
  constructor(private subsService: SubscriptionService) {}

  @ApiOperation({ summary: "Add or extend user's subscription" })
  @ApiResponse({ status: 200, type: Subscription })
  @Put('/:userId')
  addSubscription(@Param('userId') userId: number) {
    return this.subsService.addSubscription(userId);
  }
}

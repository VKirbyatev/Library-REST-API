import { User } from 'src/users/user.entity';

export class CreateSubscriptionDto {
  constructor(readonly user: User, readonly expirationDate: Date) {}
}

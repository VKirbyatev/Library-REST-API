import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './subscription.entity';
import * as moment from 'moment';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subsRepository: Repository<Subscription>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async checkSubscription(userId: number) {
    const result = await this.subsRepository
      .createQueryBuilder('subs')
      .where('subs.userId = :userId', { userId })
      .getOne();

    if (result) {
      if (moment(result.expirationDate).isAfter(new Date())) {
        return true;
      } else {
        throw new HttpException('Your subscription has expired', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException("This user doesn't have subscription", HttpStatus.FORBIDDEN);
    }
  }

  async addSubscription(userId: number) {
    try {
      const user = await this.userRepository.findOneOrFail(userId);

      const result = await this.subsRepository
        .createQueryBuilder('subs')
        .where('subs.userId = :userId', { userId: user.id })
        .getOne();

      const expirationDate = moment()
        .add(process.env.EXPIRATION_PERIOD || 30, 'days')
        .toDate();

      if (!result) {
        const subscription = await this.subsRepository.create(new CreateSubscriptionDto(user, expirationDate));
        await this.subsRepository.save(subscription);
        return subscription;
      } else if (moment(result.expirationDate).isBefore(new Date())) {
        result.expirationDate = expirationDate;
        await this.subsRepository.save(result);
        return result;
      } else {
        throw new HttpException('You are already have subscription', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/books.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const usersInstance = this.userRepository.create(dto);
      await this.userRepository.save(usersInstance);
      return usersInstance;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .where('user.deleted = :deleted', { deleted: false })
        .getMany();
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUser(userId: number) {
    try {
      const user = await this.userRepository.findOne(userId);
      const books = await this.bookRepository
        .createQueryBuilder('book')
        .where('book.holder = :userId', { userId })
        .getMany();
      user.books = books;
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: number, name: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.deleted = :deleted AND user.id = :id', {
          deleted: false,
          id,
        })
        .getOneOrFail();

      user.name = name;

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne(id);

      await this.bookRepository
        .createQueryBuilder('book')
        .update(Book)
        .set({ holder: null })
        .where('holder.id = :id', { id })
        .execute();

      user.deleted = true;

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

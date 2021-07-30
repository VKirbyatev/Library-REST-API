import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createBook(dto: CreateBookDto) {
    try {
      const bookInstance = this.bookRepository.create(dto);
      await this.bookRepository.save(bookInstance);
      return bookInstance;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllBooks() {
    try {
      const users = await this.bookRepository.find({ relations: ['holder'] });
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async giveBookToUser(userId: number, bookId: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.deleted = :deleted AND user.id = :userId', {
          deleted: false,
          userId,
        })
        .getOneOrFail();

      const booksCount = await this.bookRepository
        .createQueryBuilder('book')
        .where('book.holder = :userId', { userId })
        .getCount();

      if (booksCount === Number(process.env.MAX_BOOKS || 5)) {
        throw new HttpException('You have maximum amount of books', HttpStatus.FORBIDDEN);
      }

      const book = await this.bookRepository.findOne(bookId, {
        relations: ['holder'],
      });

      if (!book.holder) {
        book.holder = user;
        await this.bookRepository.save(book);
        return book;
      } else {
        throw new HttpException("Book's already given", HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeBookFromUser(id: number) {
    try {
      const book = await this.bookRepository.findOne(id, {
        relations: ['holder'],
      });

      book.holder = null;
      await this.bookRepository.save(book);

      return book;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

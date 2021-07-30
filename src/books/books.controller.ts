import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('api/books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  createBook(@Body() bookDto: CreateBookDto) {
    return this.bookService.createBook(bookDto);
  }

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Put()
  giveBookToUser(@Query() query) {
    return this.bookService.giveBookToUser(query.userId, query.bookId);
  }

  @Delete('/:id')
  removeBookFromUser(@Param('id') id: number) {
    return this.bookService.removeBookFromUser(id);
  }
}

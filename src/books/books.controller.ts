import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './books.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags("Book's endpoints")
@Controller('api/books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiOperation({ summary: 'Create new book' })
  @ApiResponse({ status: 200, type: Book })
  @Post()
  createBook(@Body() bookDto: CreateBookDto) {
    return this.bookService.createBook(bookDto);
  }

  @ApiOperation({ summary: 'Get list of all books' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @ApiOperation({ summary: 'Give one book to new holder' })
  @ApiResponse({ status: 200, type: Book })
  @Put()
  giveBookToUser(@Query() query) {
    return this.bookService.giveBookToUser(query.userId, query.bookId);
  }

  @ApiOperation({ summary: "Remove one book from it' holder" })
  @ApiResponse({ status: 200, type: Book })
  @Delete('/:id')
  removeBookFromUser(@Param('id') id: number) {
    return this.bookService.removeBookFromUser(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/books/books.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags("User's endpoints")
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get list of all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get one user by id with list of books' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Update one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:id')
  updateUser(@Body('name') name: string, @Param('id') id: number) {
    return this.userService.updateUser(id, name);
  }

  @ApiOperation({ summary: 'Delete one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}

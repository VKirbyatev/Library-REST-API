import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Template name', description: "Book's name" })
  readonly name: string;
  @ApiProperty({ example: 'Template author', description: "Book's author" })
  readonly author: string;
}

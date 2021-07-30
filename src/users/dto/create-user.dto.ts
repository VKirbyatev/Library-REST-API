import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Template user', description: "User's name" })
  readonly name: string;
}

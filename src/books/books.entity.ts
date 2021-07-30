import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Template book', description: "Book's name" })
  @Column()
  name: string;

  @ApiProperty({ example: 'Template author', description: "Book's author" })
  @Column()
  author: string;

  @ApiProperty({ example: User, description: 'Books holder' })
  @ManyToOne(() => User, user => user.books)
  @JoinColumn()
  holder: User;

  @ApiProperty({ example: new Date(), description: "Book's creation date" })
  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: "Book's update date" })
  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;
}

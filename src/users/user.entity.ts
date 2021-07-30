import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/books/books.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Primary table key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Template user', description: "User's name" })
  @Column()
  name: string;

  @ApiProperty({ example: false, description: 'Deletion state of user' })
  @Column({ default: false })
  deleted: boolean;

  @OneToMany(() => Book, book => book.holder)
  books: Book[];

  @ApiProperty({
    example: new Date(),
    description: 'Time when user was created',
  })
  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'Time when user was updated',
  })
  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;

  @BeforeInsert()
  beforeInsertAction() {
    this.deleted = false;
  }
}

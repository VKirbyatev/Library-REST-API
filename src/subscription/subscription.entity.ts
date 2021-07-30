import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Subscription {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: User, description: 'Subscription owner' })
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ApiProperty({
    example: new Date(),
    description: "Subscription's expiration date",
  })
  @Column()
  expirationDate: Date;

  @ApiProperty({
    example: new Date(),
    description: "Subscriptrion's update date",
  })
  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;
}

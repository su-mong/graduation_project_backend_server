import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'phone', nullable: false })
  @ApiProperty()
  phone: string;

  @Column({ name: 'code', nullable: false })
  @ApiProperty()
  code: string;
}
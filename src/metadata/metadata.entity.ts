import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class MetadataEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'small_profile_url', nullable: false })
  @ApiProperty()
  smallProfileUrl: string;

  @Column({ name: 'big_profile_url', nullable: false })
  @ApiProperty()
  bigProfileUrl: string;

  @Column({ name: 'name', nullable: false })
  @ApiProperty()
  name: string;

  @Column({ name: 'team_logo_url', nullable: false })
  @ApiProperty()
  teamLogoUrl: string;

  @Column({ name: 'team_name', nullable: false })
  @ApiProperty()
  teamName: string;
}

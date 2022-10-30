import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('holidays')
export class Holidays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'date' })
  holiday_date: Date;
}

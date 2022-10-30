import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointment_availability')
export class AppointmentAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appointment_id: number;

  @Column()
  availability_date: Date;
}

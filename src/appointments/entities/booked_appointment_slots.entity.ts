import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('booked_appointment_slots')
export class BookedAppointmentSlots {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appointment_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  booked_date: Date;
}

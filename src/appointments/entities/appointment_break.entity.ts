import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity('appointment_breaks')
export class AppointmentBreaks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appointment_id: number;

  @Column()
  description: string;

  @Column({ type: 'time' })
  break_start: string;

  @Column({ type: 'time' })
  break_end: string;

  @ManyToOne(() => Appointment, (Appointment) => Appointment.breaks)
  @JoinColumn({
    name: 'appointment_id',
  })
  appointment: Appointment;
}

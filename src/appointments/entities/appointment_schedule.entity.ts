import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity('appointment_schedules')
export class AppointmentSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appointment_id: number;

  @Column()
  appointment_day: number;

  @Column({ type: 'time' })
  opening_time: string;

  @Column({ type: 'time' })
  closing_time: string;

  @ManyToOne(() => Appointment, (Appointment) => Appointment.schedules)
  @JoinColumn({
    name: 'appointment_id',
  })
  appointment: Appointment;

  day: string;

  dated: string;

  slots: [];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AppointmentSchedule } from './appointment_schedule.entity';
import { AppointmentBreaks } from './appointment_break.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'appointment_duration_minutes' })
  appointment_duration_minutes: number;

  @Column({ name: 'appointment_buffer_minutes' })
  appointment_buffer_minutes: number;

  @Column({ name: 'advance_booking_limit' })
  advance_booking_limit: number;

  @Column({ name: 'slot_booking_limit' })
  slot_booking_limit: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(
    () => AppointmentSchedule,
    (AppointmentSchedule) => AppointmentSchedule.appointment,
  )
  schedules: AppointmentSchedule[];

  @OneToMany(
    () => AppointmentBreaks,
    (AppointmentBreaks) => AppointmentBreaks.appointment,
  )
  breaks: AppointmentBreaks[];
}

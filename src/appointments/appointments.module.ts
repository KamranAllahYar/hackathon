import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { AppointmentAvailability } from './entities/appointment_availability.entity';
import { AppointmentBreaks } from './entities/appointment_break.entity';
import { AppointmentSchedule } from './entities/appointment_schedule.entity';
import { BookedAppointmentSlots } from './entities/booked_appointment_slots.entity';
import { Holidays } from './entities/holidays.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      AppointmentAvailability,
      AppointmentBreaks,
      AppointmentSchedule,
      BookedAppointmentSlots,
      Holidays,
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}

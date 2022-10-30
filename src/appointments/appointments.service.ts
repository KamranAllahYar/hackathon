import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Holidays } from './entities/holidays.entity';
import { Between } from 'typeorm';

import { AppointmentSchedule } from './entities/appointment_schedule.entity';
import { attachAvailableSlots, getDateByDayAndTime } from './appointments.lib';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Holidays)
    private holidayRepository: Repository<Holidays>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return 'This action adds a new appointment';
  }

  async findOne(id: number) {
    const appointment: Appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: {
        schedules: true,
        breaks: true,
      },
      order: {
        schedules: {
          appointment_day: 'ASC',
        },
        breaks: {
          break_start: 'ASC',
        },
      },
    });

    //get available holidays from now to next advance booking configured limit days
    const holidays: Holidays[] = await this.holidayRepository.find({
      where: {
        holiday_date: Between(
          moment().toDate(),
          moment().add(appointment.advance_booking_limit, 'days').toDate(),
        ),
      },
    });

    // filter out schedule of for holidays
    appointment.schedules = appointment.schedules.filter((schedule) => {
      const scheduleDate = getDateByDayAndTime(
        schedule.appointment_day,
        schedule.opening_time,
      );
      return !holidays.some((holiday) =>
        scheduleDate
          .clone()
          .startOf('day')
          .isSame(moment(holiday.holiday_date).startOf('day')),
      );
    });

    appointment.schedules = appointment.schedules.map(
      (schedule: AppointmentSchedule) => {
        const scheduleDate = getDateByDayAndTime(
          schedule.appointment_day,
          schedule.opening_time,
        );
        schedule.day = scheduleDate.format('ddd');
        schedule.dated = scheduleDate.format('YYYY-MM-DD');
        schedule.slots = attachAvailableSlots(
          appointment,
          schedule,
          appointment.breaks,
        );
        return schedule;
      },
    );
    return appointment;
  }
}

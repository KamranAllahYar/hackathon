import { Appointment } from './entities/appointment.entity';
import { AppointmentSchedule } from './entities/appointment_schedule.entity';
import * as moment from 'moment/moment';

//todo comparison with booked slots

export const attachAvailableSlots = (
  appointment: Appointment,
  schedule: AppointmentSchedule,
  breaks: any,
): [] => {
  const slots: any = [];
  let openingTime = getDateByDayAndTime(
    schedule.appointment_day,
    schedule.opening_time,
  );
  const closingTime = getDateByDayAndTime(
    schedule.appointment_day,
    schedule.closing_time,
  );
  breaks = breaks.map((breakItem) => {
    breakItem.moment_start = getDateByDayAndTime(
      schedule.appointment_day,
      breakItem.break_start,
    );
    breakItem.moment_end = getDateByDayAndTime(
      schedule.appointment_day,
      breakItem.break_end,
    );
    return breakItem;
  });

  // loop until end of appointments schedule
  while (openingTime.isBefore(closingTime)) {
    // check if current appointment have breaks in it
    if (breaks.length) {
      /* cloning because don't want to mutate original opening time
      and storing appointment duration to compare with breaks */
      const appointmentEndTime = openingTime
        .clone()
        .add(appointment.appointment_duration_minutes, 'minutes');
      /* comparing to see if next appointment is lying between the break.
        if yes then set the openingTime to break end time and
        remove from breaks so for future it is excluded from comparison
       */
      if (
        appointmentEndTime.isBetween(
          breaks[0].moment_start,
          breaks[0].moment_end,
        )
      ) {
        openingTime = breaks[0].moment_end.clone();
        breaks.shift();
        continue;
      }
    }
    /* pushing every available slot into an array for final output for the user */
    slots.push(openingTime.format('YYYY-MM-DD HH:mm:ss'));
    /* adding buffer time for future appointment */
    openingTime.add(appointment.appointment_buffer_minutes, 'minutes');
  }
  return slots;
};

export const getDateByDayAndTime = (day: number, time: string) => {
  return moment(time, 'HH:mm:ss').day(day === 7 ? 0 : day);
};

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  home(): string {
    console.log(process.env.DB_HOST);
    return 'Appointment Booking';
  }
}

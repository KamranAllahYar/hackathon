import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './api/appointments/appointments.module';
import ApplicationModules from './modules/index.module'; // import of custom modules

@Module({
  imports: [...ApplicationModules, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

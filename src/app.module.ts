import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

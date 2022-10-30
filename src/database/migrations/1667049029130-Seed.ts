import { MigrationInterface, QueryRunner } from 'typeorm';
import * as moment from 'moment';
export class Seed1667049029130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO `appointments` (`id`, `title`, `appointment_duration_minutes`, `appointment_buffer_minutes`, `advance_booking_limit`, `slot_booking_limit`,`created_at`,`updated_at`) VALUES (?),(?)',
      [
        [null, 'Men Haircut', 10, 5, 7, 3, new Date(), new Date()],
        [null, 'Woman Haircut', 60, 10, 7, 3, new Date(), new Date()],
      ],
    );
    await queryRunner.query(
      'INSERT INTO `appointment_schedules` (`id`, `appointment_id`, `appointment_day`, `opening_time`, `closing_time`) VALUES (?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?)',
      [
        [null, 1, 1, '08:00', '20:00'],
        [null, 1, 2, '08:00', '20:00'],
        [null, 1, 3, '08:00', '20:00'],
        [null, 1, 4, '08:00', '20:00'],
        [null, 1, 5, '08:00', '20:00'],
        [null, 1, 6, '10:00', '22:00'],
        [null, 2, 1, '08:00', '20:00'],
        [null, 2, 2, '08:00', '20:00'],
        [null, 2, 3, '08:00', '20:00'],
        [null, 2, 4, '08:00', '20:00'],
        [null, 2, 5, '08:00', '20:00'],
        [null, 2, 6, '10:00', '22:00'],
      ],
    );
    await queryRunner.query(
      'INSERT INTO `appointment_breaks` (`id`, `appointment_id`, `description`, `break_start`, `break_end`) VALUES (?), (?),(?), (?)',
      [
        [null, 1, 'Lunch Break', '12:00', '13:00'],
        [null, 1, 'Cleaning Break', '15:00', '16:00'],
        [null, 2, 'Lunch Break', '12:00', '13:00'],
        [null, 2, 'Cleaning Break', '15:00', '16:00'],
      ],
    );
    await queryRunner.query(
      'INSERT INTO `holidays` (`id`, `description`, `holiday_date`) VALUES (?)',
      [[null, 'Public Holiday', moment().add(3, 'day').format('YYYY-MM-DD')]],
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryRunner.query('TRUNCATE TABLE `appointments`');
    await queryRunner.query('TRUNCATE TABLE `appointment_schedules`');
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
  }
}

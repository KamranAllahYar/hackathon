import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Appointment1667037433555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'appointment_duration_minutes', type: 'integer', default: 1 },
          { name: 'appointment_buffer_minutes', type: 'integer', default: 0 },
          { name: 'advance_booking_limit', type: 'integer', default: 1 },
          { name: 'slot_booking_limit', type: 'integer', default: 1 },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments', true);
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class AppointmentSchedule1667046082139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointment_schedules',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'appointment_id', type: 'integer' },
          { name: 'appointment_day', type: 'integer' },
          { name: 'opening_time', type: 'time' },
          { name: 'closing_time', type: 'time' },
        ],
      }),
    );
    await queryRunner.createIndex(
      'appointment_schedules',
      new TableIndex({
        columnNames: [
          'appointment_id',
          'appointment_day',
          'opening_time',
          'closing_time',
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'appointment_schedules',
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointment_schedules', true);
  }
}

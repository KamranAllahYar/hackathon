import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class BookedAppointmentSlot1667049029123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'booked_appointment_slots',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'appointment_id', type: 'integer' },
          { name: 'first_name', type: 'varchar' },
          { name: 'last_name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'start_of_appointment', type: 'datetime' },
          { name: 'end_of_appointment', type: 'datetime' },
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
    await queryRunner.createIndex(
      'booked_appointment_slots',
      new TableIndex({
        columnNames: [
          'appointment_id',
          'start_of_appointment',
          'end_of_appointment',
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'booked_appointment_slots',
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('booked_appointment_slots', true);
  }
}

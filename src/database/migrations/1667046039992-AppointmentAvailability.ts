import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class AppointmentAvailability1667046039992
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointment_availability',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'appointment_id', type: 'integer' },
          { name: 'availability_date', type: 'date' },
        ],
      }),
    );
    await queryRunner.createIndex(
      'appointment_availability',
      new TableIndex({ columnNames: ['appointment_id', 'availability_date'] }),
    );
    await queryRunner.createForeignKey(
      'appointment_availability',
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointment_availability', true);
  }
}

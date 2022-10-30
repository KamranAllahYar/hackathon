import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class AppointmentBreak1667046073683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointment_breaks',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'appointment_id', type: 'integer' },
          { name: 'description', type: 'varchar' },
          { name: 'break_start', type: 'time' },
          { name: 'break_end', type: 'time' },
        ],
      }),
    );
    await queryRunner.createIndex(
      'appointment_breaks',
      new TableIndex({
        columnNames: ['appointment_id', 'break_start', 'break_end'],
      }),
    );
    await queryRunner.createForeignKey(
      'appointment_breaks',
      new TableForeignKey({
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointment_breaks', true);
  }
}

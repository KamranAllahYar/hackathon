import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Holidays1667046097829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'holidays',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'description', type: 'varchar' },
          { name: 'holiday_date', type: 'date' },
        ],
      }),
    );
    await queryRunner.createIndex(
      'holidays',
      new TableIndex({
        columnNames: ['holiday_date'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('holidays', true);
  }
}

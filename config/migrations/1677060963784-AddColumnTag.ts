import { MigrationInterface, QueryRunner } from "typeorm"

export class AddColumnTag1677060963784 implements MigrationInterface {
    name = 'AddColumnTag1677060963784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE question ADD COLUMN questionsCount int`); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

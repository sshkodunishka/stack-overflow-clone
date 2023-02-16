import { MigrationInterface, QueryRunner } from "typeorm"

export class RatingQuestion1676545151249 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE rating_question ADD COLUMN rating int DEFAULT(0) `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeUser1655284415951 implements MigrationInterface {
    name = 'MakeUser1655284415951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`date_created\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`date_created\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailPasswordToUser1655234511167 implements MigrationInterface {
    name = 'AddEmailPasswordToUser1655234511167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`email\``);
    }

}

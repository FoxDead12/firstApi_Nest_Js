import { MigrationInterface, QueryRunner } from "typeorm";

export class init1655145324369 implements MigrationInterface {
    name = 'init1655145324369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UsersPermissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`permissionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`UsersPermissions\` ADD CONSTRAINT \`FK_a6656723292914701ca0eb4b276\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`UsersPermissions\` ADD CONSTRAINT \`FK_fb13625c64ed7075cec599ff8ac\` FOREIGN KEY (\`permissionId\`) REFERENCES \`Permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`UsersPermissions\` DROP FOREIGN KEY \`FK_fb13625c64ed7075cec599ff8ac\``);
        await queryRunner.query(`ALTER TABLE \`UsersPermissions\` DROP FOREIGN KEY \`FK_a6656723292914701ca0eb4b276\``);
        await queryRunner.query(`DROP TABLE \`Permissions\``);
        await queryRunner.query(`DROP TABLE \`UsersPermissions\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}

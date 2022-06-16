import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserDate1655407498391 implements MigrationInterface {
    name = 'AddUserDate1655407498391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`UsersData\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`dataNascimento\` datetime NOT NULL, \`morada\` varchar(255) NOT NULL, \`telemovel\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_1c0e55376a30659a3bc0546af5\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`UsersData\` ADD CONSTRAINT \`FK_1c0e55376a30659a3bc0546af5c\` FOREIGN KEY (\`userId\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`UsersData\` DROP FOREIGN KEY \`FK_1c0e55376a30659a3bc0546af5c\``);
        await queryRunner.query(`DROP INDEX \`REL_1c0e55376a30659a3bc0546af5\` ON \`UsersData\``);
        await queryRunner.query(`DROP TABLE \`UsersData\``);
    }

}

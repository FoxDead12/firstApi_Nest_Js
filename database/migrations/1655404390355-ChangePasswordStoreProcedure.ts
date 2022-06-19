import { MigrationInterface, QueryRunner } from "typeorm"
import { ChangePasswordProcedure_Create, ChangePasswordProcedure_Drop } from "../store-procedure/ChangePasswordProcedure";

export class ChangePasswordStoreProcedure1655404390355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(ChangePasswordProcedure_Create);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(ChangePasswordProcedure_Drop);
    }

}

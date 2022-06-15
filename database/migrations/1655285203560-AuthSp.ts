import { MigrationInterface, QueryRunner } from "typeorm"
import { AuthProcedure_Create, AuthProcedure_Drop } from "../store-procedure/AuthProcedure";

export class AuthSp1655285203560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(AuthProcedure_Create);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(AuthProcedure_Drop);
    }

}

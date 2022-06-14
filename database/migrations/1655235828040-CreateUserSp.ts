import { MigrationInterface, QueryRunner } from "typeorm"
import { CreateUserProcedure_Create, CreateUserProcedure_Drop } from "../store-procedure/CreateUserProcedure";

export class CreateUserSp1655235828040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(CreateUserProcedure_Create);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(CreateUserProcedure_Drop);
    }

}

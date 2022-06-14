import { MigrationInterface, QueryRunner } from "typeorm"
import { PermissionsSeed } from "../seeds/PermissionsSeeds"

export class seed1655165762435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(PermissionsSeed);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UsersPermissions } from "../../database/dtos/UsersPermissions";
import { CreateTransaction } from "../models/CreateTransaction";
import { UsersPermissionsRepository } from "../repositorys/UserPermissionRepository";

@Injectable()
export class UserPermissionService extends CreateTransaction {

    private readonly userPermissionsRepository: UsersPermissionsRepository;
    constructor(
        private dataSource: DataSource
    ){
        super();
        this.userPermissionsRepository = new UsersPermissionsRepository(this._runners);
    }

    async userHasOnePermissions(permissions: number[], userId: number): Promise<boolean> {

        let result = true;
        await this.Transaction(async (transaction) => {

            const permissionsInDb = await this.userPermissionsRepository.hasOnePermission(userId, permissions, transaction);

            if(permissionsInDb){
                result = permissionsInDb.some((entity: UsersPermissions) => {
                    return permissions.includes(entity.permission.id);
                });
            }
            else{
                result = false;
            }

        }, this.dataSource);

        return result;
    }
}
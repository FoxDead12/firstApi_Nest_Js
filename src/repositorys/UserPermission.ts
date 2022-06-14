import { QueryRunner } from "typeorm";
import { User } from "../../database/dtos/User";
import { UsersPermissions } from "../../database/dtos/UsersPermissions";
import { CreateNewUserRequest } from "../models/request/CreateNewUserRequest";


export class UsersPermissionsRepository {

    constructor(
        protected _runners: {[key: string]: QueryRunner} = {},
    ){}

    public async addPermissionsToUser(user: User, permissionsIds:number[] ,transaction: string){

        const runner = this._runners[transaction];
        const dtos: UsersPermissions[] = [];
        

        permissionsIds.forEach(idPermission => {
            const dto = new UsersPermissions();
            dto.permission = {id: idPermission, name: '', users: null};
            dto.user = user;
            dtos.push(dto); 
        })
        await runner.manager.save(dtos);
    }
}
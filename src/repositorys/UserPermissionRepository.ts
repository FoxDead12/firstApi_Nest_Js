import { QueryRunner } from "typeorm";
import { Permission } from "../../database/dtos/Permissions";
import { User } from "../../database/dtos/User";
import { UsersPermissions } from "../../database/dtos/UsersPermissions";
import { CreateNewUserRequest } from "../models/request/CreateNewUserRequest";


export class UsersPermissionsRepository {

    constructor(
        protected _runners: {[key: string]: QueryRunner} = {},
    ){}

    public async addPermissionsToUser(user: Partial<User>, permissionsIds:number[] ,transaction: string){

        const runner = this._runners[transaction];
        const dtos: UsersPermissions[] = [];
        

        permissionsIds.forEach(idPermission => {
            const dto = new UsersPermissions();
            dto.permission = {id: idPermission, name: '', users: null};
            dto.user = user as User;
            dtos.push(dto); 
        })
        await runner.manager.save(dtos);
    }

    public async hasOnePermission(userId: number, permissionsId: number[], transaction: string){

        const runner = this._runners[transaction];
        const result = await runner.manager.find(UsersPermissions, 
            {where: 
                {
                    user: {id: userId} as User, 
                    permission: permissionsId.map(id => {

                        return {id: id} as Permission
                    })
                }
            })

        if(result){
            return result;
        }else {
            return null;
        }
    
    }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { generatePassword } from "../helpers/GeneratePassword";
import { CreateTransaction } from "../models/CreateTransaction";
import { UserAlreadyExisteException } from "../models/exceptions/UserAlreadyExisteException";
import { CreateNewUserRequest } from "../models/request/CreateNewUserRequest";
import { UsersPermissionsRepository } from "../repositorys/UserPermission";
import { UserRepository } from "../repositorys/UserRepository";

@Injectable()
export class UserService extends CreateTransaction{

    private readonly userRepository: UserRepository;
    private readonly userPermissionsRepository: UsersPermissionsRepository;

    constructor(
        private dataSource: DataSource,
    ){
        super();
        this.userRepository = new UserRepository(this._runners);
        this.userPermissionsRepository = new UsersPermissionsRepository(this._runners);
    }
    
    async createNewUser(request: CreateNewUserRequest){
        let result = undefined;
        await this.Transaction(async (transaction) => {
            
            let user = await this.userRepository.getUserByEmail(request.email, transaction); 
            if(user){
                throw new UserAlreadyExisteException();
            }

            let password = generatePassword();
            result = await this.userRepository.createNewUser(request , password , transaction);
            

            if(request.permissionsId.length > 0){

                await this.userPermissionsRepository.addPermissionsToUser({email: request.email, firstName: request.firstName, id: result[0][0].id, isActive: true, lastName: request.lastName, password: password, permissions: []}, request.permissionsId, transaction);
            }

            result = {
                id: result[0][0].id,
                password: password
            };
        
        }, this.dataSource);

        return result;
    }
}
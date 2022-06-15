import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { generatePassword } from "../helpers/GeneratePassword";
import { CreateTransaction } from "../models/CreateTransaction";
import { UserAlreadyExisteException } from "../models/exceptions/UserAlreadyExisteException";
import { UserNotFoundException } from "../models/exceptions/UserNotFoundException";
import { AuthRequest } from "../models/request/AuthRequest";
import { CreateNewUserRequest } from "../models/request/CreateNewUserRequest";
import { UsersPermissionsRepository } from "../repositorys/UserPermissionRepository";
import { UserRepository } from "../repositorys/UserRepository";
import { TokenModel, TokenService } from "./token.service";

@Injectable()
export class UserService extends CreateTransaction{

    private readonly userRepository: UserRepository;
    private readonly userPermissionsRepository: UsersPermissionsRepository;
    

    constructor(
        private dataSource: DataSource,
        private readonly tokerService: TokenService
    ){
        super();
        this.userRepository = new UserRepository(this._runners);
        this.userPermissionsRepository = new UsersPermissionsRepository(this._runners);
    }
    
    async createNewUser(request: CreateNewUserRequest){
        let result;
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

    async auth(request: AuthRequest) {
        let result;
        await this.Transaction(async (transaction) => {

            const id = await this.userRepository.validUser(request.email, request.password, transaction);
            if(!id){
                throw new UserNotFoundException();
            }

            const tokenObj = new TokenModel({Id: id});
            tokenObj.daysToExpire = request.keepSession ? 30 : 1;

            const token = this.tokerService.GenerateToken(tokenObj);
            result = {token};

        }, this.dataSource);

        return result;
    }
}
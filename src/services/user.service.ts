import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "../../database/dtos/User";
import { generatePassword } from "../helpers/GeneratePassword";
import { CreateTransaction } from "../models/CreateTransaction";
import { UserAlreadyExisteException } from "../models/exceptions/UserAlreadyExisteException";
import { UserNotFoundException } from "../models/exceptions/UserNotFoundException";
import { AuthRequest } from "../models/request/AuthRequest";
import { ChangePasswordRequest } from "../models/request/ChangePasswordRequest";
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

    async changePassword(request: ChangePasswordRequest){
        let result;
        await this.Transaction(async (transaction) => {

            let user = await this.userRepository.getUserById(request.jwtToke.Id, transaction); 
            if(!user){
                throw new UserNotFoundException();
            }
            user.password = request.password;
            await this.userRepository.changePassword(user, transaction);

        }, this.dataSource);
    }

    async creatRootUser(){

        let result;
        await this.Transaction(async (transaction) => {

            let user = await this.userRepository.getUserByEmail("root", transaction); 
            if(user){
                throw new UserAlreadyExisteException();
            }

            const password = generatePassword();
            const resultUser = await this.userRepository.createNewUser({email: "root", firstName: "root", lastName: "root" } as CreateNewUserRequest, password ,transaction);
            await this.userPermissionsRepository.addPermissionsToUser({id: resultUser[0][0].id }, [1], transaction);
            result = {password};
        }, this.dataSource);

        return result;
    }
}
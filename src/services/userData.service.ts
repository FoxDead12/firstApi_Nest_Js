import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CreateTransaction } from "../models/CreateTransaction";
import { UserAlreadyHavePersonalInfoException } from "../models/exceptions/UserAlreadyHavePersonalInfoException";
import { UserNotFoundException } from "../models/exceptions/UserNotFoundException";
import { AddPersonalInformationRequest } from "../models/request/AddPersonalInformationRequest";
import { UserDataRepository } from "../repositorys/UserDataRepository";
import { UserRepository } from "../repositorys/UserRepository";

@Injectable()
export class UserDataService extends CreateTransaction {

    private readonly userDataRepository: UserDataRepository;
    private readonly userRepository: UserRepository;
    constructor(
        private dataSource: DataSource,
    ){
        super();
        this.userDataRepository = new UserDataRepository(this._runners);
        this.userRepository = new UserRepository(this._runners);

    }

    public async addPersonalInformation(request: AddPersonalInformationRequest){

        let result;
        await this.Transaction(async (transaction) => {
            
            let user = await this.userRepository.getUserById(request.userId, transaction); 
            if(!user){
                throw new UserNotFoundException();
            }

            const havePernsonalInfo = await this.userDataRepository.getPersonalInformationByUserId(request.userId, transaction);
            if(havePernsonalInfo){

                throw new UserAlreadyHavePersonalInfoException();
            }
            
            await this.userDataRepository.addPersonalInformation(request, transaction);        
        }, this.dataSource);
    }
}
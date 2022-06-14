import e = require("express");
import { QueryRunner } from "typeorm";
import { User } from "../../database/dtos/User";
import { CreateNewUserRequest } from "../models/request/CreateNewUserRequest";

export class UserRepository{

    constructor(
        protected _runners: {[key: string]: QueryRunner} = {},
    ){}

    public async getUserByEmail(email: string, transaction: string): Promise<User>{

        const runner = this._runners[transaction];
        const user = await runner.manager.findOneBy(User, {email});
        
        if(user){
            return user;
        }
        else{
            return null;
        }
    }

    public async createNewUser(request: CreateNewUserRequest, password:string , transaction: string): Promise<User>{

        const runner = this._runners[transaction];
        return await runner.manager.query("CALL createUser(?,?,?,?)", [request.firstName, request.lastName, request.email, password])
    }
}
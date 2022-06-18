import e = require("express");
import { QueryRunner } from "typeorm";
import { User } from "../../database/dtos/User";
import { CreateNewUserRequest } from "../models/request/CreateNewUserRequest";

export class UserRepository{

    constructor(
        protected _runners: {[key: string]: QueryRunner} = {},
    ){}

    public async getUserById(id: number, transaction: string) {

        const runner = this._runners[transaction];
        const user = await runner.manager.findOneBy(User, {id});
        
        if(user){
            return user;
        }
        else{
            return null;
        }
    }

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

    public async validUser(email: string, password: string, transaction: string){
        
        const runner = this._runners[transaction];
        const result = await runner.manager.query("CALL auth(?,?)", [email, password]);
        
        if(result[0][0].id){
            return result[0][0].id;
        }
        else{
            return null;
        }
    }

    public async changePassword( userEntity: User, transaction: string) {

        const runner = this._runners[transaction];
        const result = await runner.manager.query("CALL changePassword(?,?)", [userEntity.id, userEntity.password]);
    }
}
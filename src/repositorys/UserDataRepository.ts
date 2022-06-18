import { QueryRunner } from "typeorm";
import { UserData } from "../../database/dtos/UserData";


export class UserDataRepository {

    constructor(
        protected _runners: {[key: string]: QueryRunner} = {},
    ){}

    public async getPersonalInformationByUserId(userId: number, transaction: string){

        const runner = this._runners[transaction];
        const result = await runner.manager.findOneBy(UserData, {userId: userId});

        if(result){
            return result;
        }
        else{
            return null;
        }
    }

    public async addPersonalInformation(data: Partial<UserData>, transaction: string) {

        const runner = this._runners[transaction];
        await runner.manager.save(UserData, data);
    }

    public async updatePersonalInformation(data: Partial<UserData>, transaction: string) {

        const runner = this._runners[transaction];
        await runner.manager.update(UserData, {userId: data.userId} as UserData ,data);
    }
}
import { DataSource, QueryRunner } from "typeorm";

export abstract class CreateTransaction {

    protected _runners: {[key: string]: QueryRunner} = {};
    public async Transaction(logickBlock: (transaction: string) => Promise<void>, dataSource: DataSource):Promise<void> {
        let catchedError: Error = undefined;
        const transaction = `Transaction_${(new Date()).getTime()}`
        
       
        try {
            this._runners[transaction] = dataSource.createQueryRunner();
            await this._runners[transaction].connect();
            await this._runners[transaction].startTransaction();
            await logickBlock(transaction);
            await this._runners[transaction].commitTransaction();
        } catch (err) {
            catchedError = err;
            // since we have errors lets rollback the changes we made
            if(transaction){
                await this._runners[transaction].rollbackTransaction();
            }
            
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await this._runners[transaction].release();
        }

        if(catchedError){
            throw catchedError;
        }
    }
}
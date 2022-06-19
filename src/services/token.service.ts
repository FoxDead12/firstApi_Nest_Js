import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

export class TokenModel {

    Id: number;
    date: Date;
    daysToExpire: number;


    public constructor(init?: Partial<TokenModel>){
        this.date = new Date();
        this.daysToExpire = 1;

        if(init != null){
      
            Object.assign(this, init);
        }
    }
}

@Injectable()
export class TokenService {

    protected secret = "";
    constructor(private configService: ConfigService) {
        this.secret = this.configService.get('TOKE_KEY');
    }


    GenerateToken(tokenObj: TokenModel) {
        return jwt.sign(
            {...tokenObj},
            this.secret
        );
    }

    DecryptToken(token: string): TokenModel {
        const aux = jwt.verify(token, this.secret) as TokenModel;
        aux.date = new Date(aux.date);
        return new TokenModel({...aux});

    }
}
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

export class TokenService {

    GenerateToken(tokenObj: TokenModel) {
        return jwt.sign(
            {...tokenObj},
            "secret"
        );
    }

    DecryptToken(token: string): TokenModel {

        const aux = jwt.verify(token, "secret") as TokenModel;
        aux.date = new Date(aux.date);
        return new TokenModel({...aux});

    }
}
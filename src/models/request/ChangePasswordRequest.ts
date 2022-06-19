import { TokenModel } from "../../services/token.service";

export class ChangePasswordRequest {

    password: string;
    jwtToke: TokenModel;
}
import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyHavePersonalInfoException extends HttpException{

    constructor(){
        super("User already have personal information!", HttpStatus.FORBIDDEN);
    }
}
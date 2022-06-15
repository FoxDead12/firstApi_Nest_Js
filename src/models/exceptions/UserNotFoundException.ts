import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException{

    constructor(){
        super("User not Found!", HttpStatus.FORBIDDEN);
    }
}
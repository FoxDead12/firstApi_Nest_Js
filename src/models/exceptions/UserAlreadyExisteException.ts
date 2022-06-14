import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";

export class UserAlreadyExisteException extends HttpException{

    constructor(){
       super("User Already Exist!", HttpStatus.FORBIDDEN);
    }
}
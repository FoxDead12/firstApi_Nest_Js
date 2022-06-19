import { HttpException, HttpStatus } from "@nestjs/common";

export class UserDoesntHavePersonalInformationException extends HttpException {

    constructor(){
        super("User Doesn´t have Personal Information!", HttpStatus.FORBIDDEN);
    }
}
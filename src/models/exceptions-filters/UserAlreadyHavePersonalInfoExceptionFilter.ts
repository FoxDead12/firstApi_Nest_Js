import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { UserAlreadyHavePersonalInfoException } from "../exceptions/UserAlreadyHavePersonalInfoException";

@Catch(UserAlreadyHavePersonalInfoException)
export class UserAlreadyHavePersonalInfoExceptionFilter implements ExceptionFilter{
    catch(exception: UserAlreadyHavePersonalInfoException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: exception.message
            });
    }


}
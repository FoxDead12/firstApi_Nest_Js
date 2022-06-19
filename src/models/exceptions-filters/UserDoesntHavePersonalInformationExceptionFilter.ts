import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { UserDoesntHavePersonalInformationException } from "../exceptions/UserDoesntHavePersonalInformationException";

@Catch(UserDoesntHavePersonalInformationException)
export class UserDoesntHavePersonalInformationExceptionFilter implements ExceptionFilter{
    catch(exception: UserDoesntHavePersonalInformationException, host: ArgumentsHost) {
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
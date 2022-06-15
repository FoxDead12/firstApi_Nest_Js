import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter{
    catch(exception: UserNotFoundException, host: ArgumentsHost) {
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
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { UserAlreadyExisteException } from "../exceptions/UserAlreadyExisteException";

@Catch(UserAlreadyExisteException)
export class UserAlreadyExisteExceptionFilter implements ExceptionFilter {
    catch(exception: UserAlreadyExisteException, host: ArgumentsHost) {

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
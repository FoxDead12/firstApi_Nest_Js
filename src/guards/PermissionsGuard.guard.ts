import { CanActivate,  createParamDecorator,  ExecutionContext,  Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { TokenModel, TokenService } from "../services/token.service";
import { UserPermissionService } from "../services/userPermissions.service";

export const Token = createParamDecorator(
    (data:void, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();

        return request.cookies["token"];
    }
)

export const HasOne = (...permissions: number[]) => SetMetadata('hasOne', permissions);

@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(
        private reflector: Reflector, 
        private readonly tokenService: TokenService,
        private readonly userPermission: UserPermissionService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const hasOnePermissions = this.reflector.get<number[]>('hasOne', context.getHandler()) || [];

        const request: Request = context.switchToHttp().getRequest();
        const tokenString = request.cookies['token'] || "";

        try{
            const jwtToken : TokenModel = this.tokenService.DecryptToken(tokenString);

            //Verificar Se o token não passou a data de validade

            if(jwtToken.Id){
                //Verificar Se o User tem as Permissões Necessarias
                return this.userPermission.userHasOnePermissions(hasOnePermissions, jwtToken.Id);
            }

        }
        catch (err){
            throw new UnauthorizedException();
        }

        throw new UnauthorizedException();
    }


}
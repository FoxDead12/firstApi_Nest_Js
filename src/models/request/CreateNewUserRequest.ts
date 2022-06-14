import { UsersPermissions } from "../../../database/dtos/UsersPermissions";

export class    CreateNewUserRequest {

    firstName: string;
    lastName: string;
    email:string;
    permissionsId: number[];
}
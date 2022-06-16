import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./Permissions";
import { User } from "./User";


@Entity("UsersPermissions")
export class UsersPermissions {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (table) => table.permissions, {eager: true})
    @JoinColumn()
    user:User;

    @ManyToOne(() => Permission, (table) => table.users, {eager: true})
    @JoinColumn()
    permission:Permission;
    
}
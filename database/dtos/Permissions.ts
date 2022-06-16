import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersPermissions } from "./UsersPermissions";

@Entity("Permissions")
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => UsersPermissions, table => table.permission)
    users: UsersPermissions[];

}
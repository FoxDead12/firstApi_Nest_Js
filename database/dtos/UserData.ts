import { table } from "console";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("UsersData")
export class UserData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({type: "date"})
    dataNascimento: Date;

    @Column()
    morada: string;

    @Column()
    telemovel: string;
    	
    @OneToOne(() => User, table => table.personalData, {eager: true})
    @JoinColumn()
    user: User;
}
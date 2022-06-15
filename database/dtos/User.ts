import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UsersPermissions } from './UsersPermissions';

@Entity("Users")
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email:string;

  @Column()
  password:string;

  @Column({ default: true })
  isActive: boolean;

  @Column({type: "datetime", nullable: true})
  date_created: Date;

  @OneToMany(() => UsersPermissions, table => table.user)
  permissions: UsersPermissions[];

}
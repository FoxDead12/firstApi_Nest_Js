import { table } from 'console';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UsersPermissions } from './UsersPermissions';

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UsersPermissions, table => table.user)
  permissions: UsersPermissions[];
}
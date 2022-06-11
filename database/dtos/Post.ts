import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

}
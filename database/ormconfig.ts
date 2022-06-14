import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import dtosList from "./dtosList";

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'teste',
    password: '1234',
    database: 'company_users',
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['database/dtos/*.ts'],
    migrations: ['database/migrations/*.ts'],

});

export const ormconfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: dtosList,
    synchronize: true,
}
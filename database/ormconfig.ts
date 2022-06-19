import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import dtosList from "./dtosList";

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: 'containers-us-west-43.railway.app',
    port: 7411,
    username: 'root',
    password: 'gS3QcbwEdmNv10QAtJgj',
    database: 'railway',
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['database/dtos/*.ts'],
    migrations: ['database/migrations/*.ts'],

});

export const ormconfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'containers-us-west-43.railway.app',
    port: 7411,
    username: 'root',
    password: 'gS3QcbwEdmNv10QAtJgj',
    database: 'railway',
    entities: dtosList,
    synchronize: false,
    logging: false,
}

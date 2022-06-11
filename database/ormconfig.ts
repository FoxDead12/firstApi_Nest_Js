import { DataSource } from "typeorm"
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
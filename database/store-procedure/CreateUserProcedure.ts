export const CreateUserProcedure_Create = 
`CREATE PROCEDURE createUser(in firstName varchar(255), in lastName varchar(255), in email varchar(255), in password varchar(255))
BEGIN
declare id int;
declare hash varchar(255);

insert into Users(firstName, lastName, email, password) values (firstName, lastName, email, '');
set id = LAST_INSERT_ID();
set hash = SHA2(CONCAT(now(), email, password, id), 512);

update Users u SET u.password = hash where u.id = id;

select id;
END`

export const CreateUserProcedure_Drop = `DROP PROCEDURE IF EXISTS createUser;`;
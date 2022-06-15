export const CreateUserProcedure_Create = 
`CREATE PROCEDURE createUser(in firstName varchar(255), in lastName varchar(255), in email varchar(255), in password varchar(255))
BEGIN
declare id int;
declare hash varchar(255);
declare date_now DATETIME;

set date_now = now();
insert into Users(firstName, lastName, email, PASSWORD, date_created) values (firstName, lastName, email, '', date_now);
set id = LAST_INSERT_ID();
set hash = SHA2(CONCAT(date_now, email, password, id), 512);

update Users u SET u.password = hash where u.id = id;

select id;
END`

export const CreateUserProcedure_Drop = `DROP PROCEDURE IF EXISTS createUser;`;
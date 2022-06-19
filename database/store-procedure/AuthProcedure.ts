export const AuthProcedure_Create = 
`CREATE PROCEDURE auth(in email varchar(255), in password varchar(255))
BEGIN
    declare id INT;
	declare date_created datetime;
	declare hash varchar(255);
    declare userHash varchar(255);

	select u.id, u.date_created, u.password into id , date_created, userHash from Users u where u.email = email AND u.isActive = true;

	set hash = SHA2(CONCAT(date_created, email, password, id ), 512);

	if(hash = userHash) then
		select id;
	else
		select 0;
	end if;
END`

export const AuthProcedure_Drop = `DROP PROCEDURE IF EXISTS auth;`;
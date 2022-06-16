export const ChangePasswordProcedure_Create = 
`CREATE PROCEDURE changePassword(in id int, in password varchar(255))
BEGIN
    DECLARE hash varchar(255);
    DECLARE date_created DATETIME;
    DECLARE email VARCHAR(255);


    SELECT u.date_created, u.email into date_created, email FROM Users u WHERE u.id = id; 
    set hash = SHA2(CONCAT(date_created , email, password, id), 512);
    update Users u set u.password = hash where u.id = id;
END`

export const ChangePasswordProcedure_Drop = `DROP PROCEDURE IF EXISTS changePassword;`;
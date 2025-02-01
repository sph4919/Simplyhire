CREATE TABLE serviceprovider(
    serviceid INT AUTO_INCREMENT PRIMARY KEY,
    jobid INT,
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    servicetype VARCHAR(255),
    currentcharges INT,
    jobdescription TEXT
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sugnay@2003';
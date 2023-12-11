CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR NOT NULL UNIQUE 
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    status VARCHAR(48) NOT NULL, 
    title VARCHAR(255) NOT NULL ,
    content VARCHAR NOT NULL,
    employer VARCHAR(255) NOT NULL, 
    employee VARCHAR(255) NOT NULL,
    date_of_create date NOT NULL, 
    deadLine date NOT NULL 
);

DROP TABLE tasks; 

ALTER TABLE users
ADD UNIQUE (fullName);

ALTER TABLE tasks
DROP CONSTRAINT employee;

INSERT INTO users(fullName,email,passwordHash) values($1,$2,$3);

INSERT INTO tasks(status,title,content,employer,employee,date_of_create,deadLine) values('status1','title1','content1','employer1','employee1','2001-09-28','2001-09-28');
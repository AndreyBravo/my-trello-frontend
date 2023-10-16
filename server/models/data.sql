CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR NOT NULL UNIQUE 
);

INSERT INTO users(fullName,email,passwordHash) values($1,$2,$3);
CREATE DATABASE card_game;
USE card_game;

CREATE TABLE rooms(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    hex VARCHAR(10) NOT NULL
);
INSERT INTO rooms (hex) VALUES ("#1234");
select * from rooms;
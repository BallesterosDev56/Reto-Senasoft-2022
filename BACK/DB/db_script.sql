CREATE DATABASE card_game;
USE card_game;

CREATE TABLE rooms(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    hex VARCHAR(10) NOT NULL,
    creator VARCHAR(300) NOT NULL
);
select * from rooms;


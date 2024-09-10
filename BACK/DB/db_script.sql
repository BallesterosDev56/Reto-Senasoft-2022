CREATE DATABASE card_game;
USE card_game;

CREATE TABLE rooms(
	id INT AUTO_INCREMENT,
    hex VARCHAR(6),
    players_number INT
);

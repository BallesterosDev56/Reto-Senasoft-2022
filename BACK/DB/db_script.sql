CREATE DATABASE card_game;
USE card_game;

CREATE TABLE rooms(
	id INT AUTO_INCREMENT PRIMARY KEY,
    hex VARCHAR(6),
    players_number INT
);
insert into rooms (hex,players_number) values ("holi", 4);
select * from rooms
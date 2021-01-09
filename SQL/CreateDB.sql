CREATE DATABASE OdysseyMusicDB; 

CREATE TABLE `Songs` (
  `id_song` INT AUTO_INCREMENT,
  `name_song` VARCHAR(255),
  `name_artist` VARCHAR(255),
  `name_album` VARCHAR(255),
  `lyrics` TEXT,
  PRIMARY KEY (`id_song`)
);

CREATE TABLE `Users` (
  `id_user` INT AUTO_INCREMENT,
  `name_user` VARCHAR(255),
  `email_user` VARCHAR(255),
  PRIMARY KEY (`id_user`)
);

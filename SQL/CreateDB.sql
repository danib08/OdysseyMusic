CREATE DATABASE OdysseyMusicDB; 

CREATE TABLE `Artists` (
  `id_artist` INT AUTO_INCREMENT,
  `name_artist` VARCHAR(255),
  PRIMARY KEY (`id_artist`)
);

CREATE TABLE `Songs` (
  `id_song` INT AUTO_INCREMENT,
  `name_song` VARCHAR(255),
  `lyrics` TEXT,
  `id_artist` INT,
  PRIMARY KEY (`id_song`),
  FOREIGN KEY (`id_artist`) REFERENCES Artists(`id_artist`)
);

CREATE TABLE `Users` (
  `id_user` INT AUTO_INCREMENT,
  `name_user` VARCHAR(255),
  `email_user` VARCHAR(255
  PRIMARY KEY (`id_user`)
);

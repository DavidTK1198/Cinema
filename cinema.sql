-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cinema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cinema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cinema` DEFAULT CHARACTER SET utf8 ;
USE `cinema` ;

-- -----------------------------------------------------
-- Table `cinema`.`Pelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`Pelicula` (
  `Nombre` VARCHAR(200) NOT NULL,
  `id_pelicula` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_pelicula`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema`.`Sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`Sala` (
  `Codigo` VARCHAR(45) NULL,
  `id_sala` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_sala`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema`.`Proyeccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`Proyeccion` (
  `idProyeccion` INT NOT NULL AUTO_INCREMENT,
  `Pelicula_Nombre` VARCHAR(200) NOT NULL,
  `Sala_id` INT NOT NULL,
  `Date` DATE NULL,
  PRIMARY KEY (`idProyeccion`),
  INDEX `fk_Proyeccion_Pelicula_idx` (`Pelicula_Nombre` ASC) VISIBLE,
  INDEX `fk_Proyeccion_Sala1_idx` (`Sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_Proyeccion_Pelicula`
    FOREIGN KEY (`Pelicula_Nombre`)
    REFERENCES `cinema`.`Pelicula` (`Nombre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proyeccion_Sala1`
    FOREIGN KEY (`Sala_id`)
    REFERENCES `cinema`.`Sala` (`id_sala`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema`.`Butaca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`Butaca` (
  `Codigo` VARCHAR(45) NOT NULL,
  `Estado` TINYINT NULL,
  `id_butacas` INT NOT NULL AUTO_INCREMENT,
  `Sala_id` INT NOT NULL,
  PRIMARY KEY (`id_butacas`),
  INDEX `fk_Butaca_Sala1_idx` (`Sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_Butaca_Sala1`
    FOREIGN KEY (`Sala_id`)
    REFERENCES `cinema`.`Sala` (`id_sala`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`Usuario` (
  `id_usu` VARCHAR(200) NOT NULL,
  `clave` VARCHAR(45) NOT NULL,
  `Rol` INT NOT NULL,
  `Nombre` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_usu`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema`.`Historial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`Historial` (
  `idHistorial` INT NOT NULL AUTO_INCREMENT,
  `Proyeccion_id` INT NOT NULL,
  `Usuario_id` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idHistorial`),
  INDEX `fk_Historial_Proyeccion1_idx` (`Proyeccion_id` ASC) VISIBLE,
  INDEX `fk_Historial_Usuario1_idx` (`Usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Historial_Proyeccion1`
    FOREIGN KEY (`Proyeccion_id`)
    REFERENCES `cinema`.`Proyeccion` (`idProyeccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Historial_Usuario1`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `cinema`.`Usuario` (`id_usu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

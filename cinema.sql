-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema cinema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cinema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cinema` DEFAULT CHARACTER SET utf8 ;
USE `cinema` ;

-- -----------------------------------------------------
-- Table `cinema`.`Butaca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`Butaca` (
  `Fila` INT NOT NULL,
  `col` INT NULL,
  `id_bu` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_bu`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `cinema`.`pelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`pelicula` (
  `Nombre` VARCHAR(200) NOT NULL,
  `id_pelicula` INT NOT NULL AUTO_INCREMENT,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`id_pelicula`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `cinema`.`sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`sala` (
  `Codigo` VARCHAR(45) NULL DEFAULT NULL,
  `id_sala` INT NOT NULL AUTO_INCREMENT,
  `fila` INT NOT NULL,
  `col` INT NULL,
  PRIMARY KEY (`id_sala`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `cinema`.`proyeccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`proyeccion` (
  `idProyeccion` INT NOT NULL AUTO_INCREMENT,
  `id_pelicula` INT NOT NULL,
  `Sala_id` INT NOT NULL,
  `Date` DATE NULL DEFAULT NULL,
  `Precio` FLOAT NULL,
  PRIMARY KEY (`idProyeccion`),
  INDEX `fk_Proyeccion_Pelicula_idx` (`id_pelicula` ASC) VISIBLE,
  INDEX `fk_Proyeccion_Sala1_idx` (`Sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_Proyeccion_Pelicula`
    FOREIGN KEY (`id_pelicula`)
    REFERENCES `cinema`.`pelicula` (`id_pelicula`),
  CONSTRAINT `fk_Proyeccion_Sala1`
    FOREIGN KEY (`Sala_id`)
    REFERENCES `cinema`.`sala` (`id_sala`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `cinema`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`usuario` (
  `id_usu` VARCHAR(200) NOT NULL,
  `clave` VARCHAR(45) NOT NULL,
  `Rol` INT NOT NULL,
  `Nombre` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_usu`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `cinema`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`compra` (
  `id_com` INT NOT NULL AUTO_INCREMENT,
  `Proyeccion_id` INT NOT NULL,
  `Usuario_id` VARCHAR(200) NOT NULL,
  `Precio` FLOAT NULL,
  `Butaca_id` INT NOT NULL,
  PRIMARY KEY (`id_com`),
  INDEX `fk_Historial_Proyeccion1_idx` (`Proyeccion_id` ASC) VISIBLE,
  INDEX `fk_Historial_Usuario1_idx` (`Usuario_id` ASC) VISIBLE,
  INDEX `fk_compra_Butaca1_idx` (`Butaca_id` ASC) VISIBLE,
  CONSTRAINT `fk_Historial_Proyeccion1`
    FOREIGN KEY (`Proyeccion_id`)
    REFERENCES `cinema`.`proyeccion` (`idProyeccion`),
  CONSTRAINT `fk_Historial_Usuario1`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `cinema`.`usuario` (`id_usu`),
  CONSTRAINT `fk_compra_Butaca1`
    FOREIGN KEY (`Butaca_id`)
    REFERENCES `cinema`.`Butaca` (`id_bu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

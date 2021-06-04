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
-- Table `cinema`.`sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`sala` (
  `Codigo` VARCHAR(45) NOT NULL,
  `fila` INT NOT NULL,
  `col` INT NULL,
  PRIMARY KEY (`Codigo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `cinema`.`pelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`pelicula` (
  `Nombre` VARCHAR(200) NOT NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`Nombre`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `cinema`.`proyeccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`proyeccion` (
  `idProyeccion` INT NOT NULL AUTO_INCREMENT,
  `Sala_id` VARCHAR(45) NOT NULL,
  `Date` DATE NOT NULL,
  `Precio` FLOAT NULL,
  `pelicula_Nombre` VARCHAR(200) NOT NULL,
  INDEX `fk_Proyeccion_Sala1_idx` (`Sala_id` ASC) VISIBLE,
  INDEX `fk_proyeccion_pelicula1_idx` (`pelicula_Nombre` ASC) VISIBLE,
  PRIMARY KEY (`idProyeccion`, `pelicula_Nombre`, `Date`, `Sala_id`),
  CONSTRAINT `fk_Proyeccion_Sala1`
    FOREIGN KEY (`Sala_id`)
    REFERENCES `cinema`.`sala` (`Codigo`),
  CONSTRAINT `fk_proyeccion_pelicula1`
    FOREIGN KEY (`pelicula_Nombre`)
    REFERENCES `cinema`.`pelicula` (`Nombre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `id_com` VARCHAR(45) NOT NULL,
  `Proyeccion_id` INT NOT NULL,
  `Usuario_id` VARCHAR(200) NOT NULL,
  `Precio` FLOAT NULL,
  PRIMARY KEY (`id_com`),
  INDEX `fk_Historial_Proyeccion1_idx` (`Proyeccion_id` ASC) VISIBLE,
  INDEX `fk_Historial_Usuario1_idx` (`Usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Historial_Proyeccion1`
    FOREIGN KEY (`Proyeccion_id`)
    REFERENCES `cinema`.`proyeccion` (`idProyeccion`),
  CONSTRAINT `fk_Historial_Usuario1`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `cinema`.`usuario` (`id_usu`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `cinema`.`tiquete`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cinema`.`tiquete` (
  `Fila` INT NOT NULL,
  `col` INT NULL,
  `id_bu` INT NOT NULL AUTO_INCREMENT,
  `compra_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_bu`),
  INDEX `fk_Tiquete_compra1_idx` (`compra_id` ASC) VISIBLE,
  CONSTRAINT `fk_Tiquete_compra1`
    FOREIGN KEY (`compra_id`)
    REFERENCES `cinema`.`compra` (`id_com`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

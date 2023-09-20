CREATE DATABASE if NOT EXISTS empresa CHARSET utf8mb3 COLLATE utf8mb3_spanish_ci;

USE empresa;

CREATE TABLE empleados (
    EmpleadoID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(45) not NULL,
    Salario INT DEFAULT null
)


INSERT INTO empleados (Nombre,Salario) Values ("Jose",10000),("juana",8000),("marta",7000),("luis",7000)
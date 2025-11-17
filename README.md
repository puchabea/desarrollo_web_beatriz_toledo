# Tarea 4 – Evaluación de Avisos de Adopción

Este proyecto extiende la aplicación anterior para agregar una nueva funcionalidad: evaluar avisos de adopción de manera rápida y dinámica, usando Spring Boot, Thymeleaf y llamadas asíncronas con JavaScript.

## Acceder
Para acceder se accede con http://localhost:8080/evaluaciones 

## Listado de Avisos

Se muestra una tabla con los datos principales de cada aviso, incluida una columna con su nota promedio (o “–” si no tiene evaluaciones).


## Evaluación

Cada aviso tiene un botón “Evaluar”, que pide una nota entre 1 y 7.
El archivo evaluar.js valida la nota, la envía al backend con fetch y actualiza el promedio sin recargar la página.


## Backend y Base de Datos

Usando Spring Data JPA, las entidades AvisoAdopcion y Nota manejan la información en la base de datos.
El endpoint /api/nota recibe la nota, la valida, la guarda y devuelve el nuevo promedio para mostrarlo de inmediato en la interfaz.

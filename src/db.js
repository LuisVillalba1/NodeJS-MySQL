import {createPool} from "mysql2/promise";
//importamos nuestras variables de entorno creadas
import {
    dbHost,
    dbName,
    dbPassword,
    dbPort,
    dbUser
} from "./config.js"

//creamos nuestra conexcion a nuestra base de datos
export const pool = createPool({
    host : dbHost,
    user : dbUser,
    password : dbPassword,
    port : dbPort,
    database : dbName
})
import {config} from "dotenv";
//utilizamos dotenv para leer las variables de entorno
config();

export const dbHost = process.env.DB_HOST || `localhost`;
export const dbName = process.env.DB_NAME || `empresa`;
export const dbUser = process.env.DB_USER || `luis`;
export const dbPassword = process.env.DB_PASSWORD || `villalba1password`;
export const dbPort = process.env.DB_PORT || 3306;
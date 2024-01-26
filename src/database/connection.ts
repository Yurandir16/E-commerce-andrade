import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";

const signale = new Signale();
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306, // Lee el puerto desde las variables de entorno o usa el valor predeterminado 3306
};

const pool = mysql.createPool(config);


export async function query(sql: string, params: any[]): Promise<any[]> {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const rows = await conn.execute(sql, params);
        conn.release();
        return rows;  // Devolvemos directamente el array de resultados
    } catch (error) {
        console.log(process.env.DB_HOST);
        signale.error(error);
        throw new Error('Error en la consulta');
    }
}
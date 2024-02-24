import { history, productClient } from "../../domain/entities/productClient";
import { ProductClientRepository } from "../../domain/repositories/productClientRepository";
import { query } from "../../../database/connection";


export class mysqlProductClientRepositorys implements ProductClientRepository {

    async listAllProductClient(): Promise<productClient[]|null> {
      try {
        const sql = "SELECT * FROM products WHERE status = true";
        const [rows]: any = await query(sql, []);
    
        if (rows[0]) {
          return rows.map((row: any) => ({
            id: row.id,
            namePart: row.namePart,
            numberPart: row.numberPart,
            amount: row.amount,
            image: row.image,
            description: row.description,
            price: row.price,
            conditions: row.conditions,
            status: row.status
          }));
        } else {
          throw new Error("No hay ningún producto que mostrar");
        }
      } catch (error) {
        console.error("Error al listar productos:", (error as Error).message);
        throw new Error("Error al listar productos");
      }
    }
    
    async listAllHistoryPro(uuid_user: string): Promise<history[] | null> {
      try {
        const sql = "SELECT * FROM historys WHERE uuid_id = ?";
        const params: any[] = [uuid_user];
        const [rows]: any = await query(sql, params);
        if (rows[0]) {
          return rows.map((row: any) => ({
            id: row.id,
            uuid_user: row.uuid_user,
            name: row.name,
            price: row.price,
            create_time: row.create_time
          }));
        } else {
          throw new Error("No se encontro ningun historial de compra");
        }
      } catch (error) {
        console.error(
          "Error no hay ninguna compra registrada por ese usuario:",
          error
        );
        return null;
      }
    }
}
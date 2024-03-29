import { cart } from "../../domain/entities/cart";
import { cartRepository } from "../../domain/repositories/cartRepository";
import { query } from "../../../database/connection";

export class mysqlCartProductRepositorys implements cartRepository {
  async postProductsCart(
    id: number,
    user_id: string,
    product_id: number
  ): Promise<string | cart | null> {
    try {
      let sql =
        "INSERT INTO cartShopping (id, user_id, product_id) VALUES (?,?,?)";
      const params: any[] = [id, user_id, product_id];
      console.log(params);
      const [result]: any = await query(sql, params);
      console.log(result);
      return new cart(id, user_id, product_id);
    } catch (error) {
      console.error("Error adding cart Product:", error);
      return null;
    }
  }

  async viewCartProduct(uuid: string): Promise<any[] | null> {
    try {

      const sql = `
        SELECT 
            p.image_fk, p.brand, p.model, p.numberPart, p.stock, p.description, p.price, p.conditions,
            i.img1
        FROM 
            cartShopping cs 
            JOIN user u ON cs.user_id = u.uuid 
            JOIN products p ON cs.product_id = p.id
            JOIN image i ON p.image_fk = i.id
        WHERE 
            u.uuid = ?
        `;

      const [rows]: any = await query(sql, [uuid]);

      if (rows.length > 0) {
        return rows.map((row: any) => ({
          image_fk:row.image_fk,
          brand:row.brand,
          model:row.model,
          productNumber: row.numberPart,
          stock: row.stock,
          description: row.description,
          price: row.price,
          conditions: row.conditions,
          img1:row.img1
        }));
      } else {
        throw new Error("El carrito del usuario está vacío.");
      }
    } catch (error) {
      console.error("Error al listar productos:", (error as Error).message);
      throw new Error("Error al listar productos");
    }
  }

  async deleteCartProduct(id: number): Promise<string | null | boolean> {
    try {
      const sql = "DELETE FROM cartShopping WHERE id = ?";
      const params: any[] = [id];

      const [result]: any = await query(sql, params);

      if (result.affectedRows > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting cart Product:", error);
      return null;
    }
  }
}

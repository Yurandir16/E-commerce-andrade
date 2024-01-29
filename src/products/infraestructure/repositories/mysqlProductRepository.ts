import { product } from "../../domain/entities/product";
import { productsRepository } from "../../domain/repositories/productRepository";
import { query } from "../../../database/connection";
import fs from 'fs';
import util from 'util';
import { shoppingRe } from "../../domain/entities/shoppingR";

const unlinkAsync = util.promisify(fs.unlink);

export class mysqlProductRepositorys implements productsRepository {
  async createProduct(id: number,namePart: string,numberPart: number,amount: number,image: string,description: string,price: number,conditions: string,status: boolean): Promise<product | null> {
    try {
      let sql =
        "INSERT INTO products (id,namePart,numberPart,amount,image,description,price,conditions,status) VALUES (?,?,?,?,?,?,?,?,?)";
      const params: any[] = [id,namePart,numberPart,amount,image,description,price,conditions,status];
      console.log(params);
      console.log("entro a sentencia")
      const [result]: any = await query(sql, params);

      console.log(result);

      return new product(id,namePart,numberPart,amount,image,description,price,conditions,status);
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  }

  async updateProduct(id: number,namePart: string,numberPart: number,amount: number,image: string,description: string,price: number,conditions: string,status: boolean): Promise<product | null> {
    try {
      let sql =
        "UPDATE products SET namePart = ?, numberPart = ?, amount = ?, image = ?, description = ?, price = ?, conditions = ?, status = ? WHERE id = ?";
        console.log("entro sentencia")

      const params: any[] = [namePart,numberPart,amount,image,description,price,conditions,status,id];

      console.log(params);
      const [result]: any = await query(sql, params);
      
      console.log(result);
      return new product(id,namePart,numberPart,amount,image,description,price,conditions,status);

    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }

  async inactivateProduct(id: number,status: boolean): Promise<product | null> {
    try {
      let sql =
        "UPDATE products SET status = ? WHERE id = ?";
      const params: any[] = [status,id];

      const [result]: any = await query(sql, params);
      console.log(result);

      return new product(id,result.namePart,result.numberPart,result.amount,result.image,result.description,result.price,result.conditions,status);
    } catch (error) {
      console.error("Error updating product status:", error);
      return null;
    }
  }

  async deleteProduct(
    id: number
  ): Promise<boolean> {
    try {
      let sql = "DELETE FROM products WHERE id = ?";
      const params: any[] = [id];
      const [product]: any = await query("SELECT image FROM products WHERE id = ?", [id]);
      const imageName = product.image;
      const [result]: any = await query(sql, params);
      console.log("entro a las sentencias")

      if (result.affectedRows > 0) {
        if (imageName) {
          await unlinkAsync(__dirname + `/src/assets/${imageName}`);
        }
        return true;
      } else {
        console.error("Error no se pudo elminar completamente el producto")
        return false;
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }

  async viewProduct(): Promise<product[]> {
    try {
      const sql = "SELECT * FROM products";
      const [rows]: any = await query(sql, []);
      console.log("entro a sentencia")
      if (rows[0]) {
        return rows.map((row: any) => ({id: row.id,namePart: row.namePart,numberPart: row.numberPart,amount: row.amount,image: row.image,description: row.description,price: row.price,conditions: row.conditions,status: row.status})); 
      } else {
        throw new Error(
          "No se encontró ningún product"
        );
      }
    } catch (error) {
      console.error("Error al listar product:", (error as Error).message);
      throw new Error("Error al listar product");
    }
  }

  async viewRegisterShop(): Promise<shoppingRe[] | null> {
    try {
      const sql = "SELECT * FROM customer_data";
      const [rows]:any = await query(sql,[]);
      console.log("entro a sentencia");
      if(rows[0]){
        return rows.map((row:any)=>({customer_id:row.customer_id,given_name:row.given_name,surname:row.surname,email_address:row.email_address,country_code:row.country_code,address_line_1:row.address_line_1,address_line_2:row.address_line_2,admin_area_1:row.admin_area_1,admin_area_2:row.admin_area_2,postal_code:row.postal_code,currency_code:row.currency_code,amount:row.amount,create_time:row.create_time}))
      }else{
        throw new Error(
          "No se encontro ningun registro de compras"
        );
      }
    } catch (error) {
      console.error("Error al listar product:", (error as Error).message);
      throw new Error("Error al listar registros de compras de usuarios");
    }
  }

  async viewUserShop(customer_id: string): Promise<string | shoppingRe | null> {
    try {
      const sql = "SELECT * FROM customer_data WHERE customer_id = ?";
      const params: any[] = [customer_id];
      const [result]: any = await query(sql, params);
      return new shoppingRe(customer_id,result.given_name,result.surname,result.email_address,result.country_code,result.address_line_1,result.address_line_2,result.admin_area_1,result.admin_area_2,result.postal_code,result.corrency_code,result.amount,result.create_time)
    } catch (error) {
      console.error("Error no hay ninguna compra registrada por ese usuario:", error);
      return null;
    }
  }
}
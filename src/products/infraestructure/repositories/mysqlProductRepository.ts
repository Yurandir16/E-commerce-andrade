import { product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";
import { query } from "../../../database/connection";
import fs from 'fs';
import util from 'util';

const unlinkAsync = util.promisify(fs.unlink);

export class mysqlProductRepositorys implements ProductRepository {
  async createProduct(
    id: number,
    namePart: string,
    numberPart: number,
    amount: number,
    image: string,
    description: string,
    price: number,
    conditions: string,
    status: boolean
  ): Promise<product | null> {
    try {
      let sql =
        "INSERT INTO products (id,namePart,numberPart,amount,image,description,price,conditions,status) VALUES (?,?,?,?,?,?,?,?,?)";
      const params: any[] = [
        id,
        namePart,
        numberPart,
        amount,
        image,
        description,
        price,
        conditions,
        status,
      ];
      console.log(params);
      const [result]: any = await query(sql, params);
      console.log(result);
      return new product(
        id,
        namePart,
        numberPart,
        amount,
        image,
        description,
        price,
        conditions,
        status
      );
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  }

  async listAllProduct(): Promise<product[]> {
    try {
      const sql = "SELECT * FROM products";
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
        throw new Error(
          "No se encontró ningún product"
        );
      }
    } catch (error) {
      console.error("Error al listar revisiones:", (error as Error).message);
      throw new Error("Error al listar revisiones");
    }
  }

  async updateProduct(
    id: number,
    namePart: string,
    numberPart: number,
    amount: number,
    image: string,
    description: string,
    price: number,
    conditions: string,
    status: boolean
  ): Promise<product | null> {
    try {
      let sql =
        "UPDATE products SET namePart = ?, numberPart = ?, amount = ?, image = ?, description = ?, price = ?, conditions = ?, status = ? WHERE id = ?";
      const params: any[] = [
        namePart,
        numberPart,
        amount,
        image,
        description,
        price,
        conditions,
        status,
        id,
      ];
      console.log(params);
      const [result]: any = await query(sql, params);
      console.log(result);
      return new product(
        id,
        namePart,
        numberPart,
        amount,
        image,
        description,
        price,
        conditions,
        status
      );
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }


  async inactivateProduct(
    id: number,
    status: boolean
  ): Promise<product | null> {
    try {
      let sql =
        "UPDATE products SET status = ? WHERE id = ?";
      const params: any[] = [
        status,
        id,
      ];
      console.log(params);
      const [result]: any = await query(sql, params);
      console.log(result);
      return new product(
        id,
        result.namePart,
        result.numberPart,
        result.amount,
        result.image,
        result.description,
        result.price,
        result.conditions,
        status
      );
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
  async listAllProductClientCase(): Promise<product[]> {
    try {
      const sql = "SELECT * FROM products";
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
        throw new Error(
          "No se encontró ningún product"
        );
      }
    } catch (error) {
      console.error("Error al listar product:", (error as Error).message);
      throw new Error("Error al listar product");
    }
  }
}
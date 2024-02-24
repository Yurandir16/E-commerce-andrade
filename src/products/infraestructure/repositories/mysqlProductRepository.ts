import { product } from "../../domain/entities/product";
import { productsRepository } from "../../domain/repositories/productRepository";
import { query } from "../../../database/connection";
import fs from "fs";
import util from "util";
import { shoppingRe } from "../../domain/entities/shoppingR";

const unlinkAsync = util.promisify(fs.unlink);

export class mysqlProductRepositorys implements productsRepository {
  async createProduct(
    id: number,
    brand: string,
    model: string,
    numberPart: string,
    description: string,
    price: number,
    stock: number,
    conditions: string,
    status: boolean,
    img1: string,
    img2: string,
    img3: string,
    img4: string,
    img5: string
  ): Promise<product | null> {
    console.log("llego a repository");
    
    try {
      let sql2 =
        "INSERT INTO image (img1, img2, img3, img4, img5) VALUES (?,?,?,?,?)";
      const params2 = [img1, img2, img3, img4, img5];
      const [result2] = await query(sql2, params2);

      const image_id = result2.insertId;

      let sql =
        "INSERT INTO products (image_fk,model, numberPart, brand,description, price,stock,conditions, status) VALUES (?,?,?,?,?,?,?,?,?)";
      const params = [
        image_id,
        model,
        numberPart,
        brand,
        description,
        price,
        stock,
        conditions,
        status,
      ];
      console.log(params);
      console.log("entro a sentencia");
      const [result] = await query(sql, params);

      return new product(
        id,
        brand,
        model,
        numberPart,
        description,
        price,
        stock,
        conditions,
        status,
        img1,
        img2,
        img3,
        img4,
        img5
      );
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  }

  async updateProduct(
    id: number,
    brand: string,
    model: string,
    numberPart: string,
    description: string,
    price: number,
    stock: number,
    conditions: string,
    status: boolean,
    img1: string,
    img2: string,
    img3: string,
    img4: string,
    img5: string
  ): Promise<product | null> {
    try {
      let sql =
        "UPDATE products SET image_fk = ?, brand = ?, model = ?, numberPart = ?, stock = ? , description = ?, price = ?, conditions = ?, status = ? WHERE id = ?";
      console.log("entro sentencia");

      const params: any[] = [
        model,
        numberPart,
        brand,
        stock,
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
        brand,
        model,
        numberPart,
        description,
        price,
        stock,
        conditions,
        status,
        img1,
        img2,
        img3,
        img4,
        img5
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
      let sql = "UPDATE products SET status = ? WHERE id = ?";
      const params: any[] = [status, id];

      const [result]: any = await query(sql, params);
      console.log(result);

      return new product(
        result.id,
        result.model,
        result.numberPart,
        result.brand,
        result.stock,
        result.description,
        result.price,
        result.conditions,
        status,
        result.img1,
        result.img2,
        result.img3,
        result.img4,
        result.img5
      );
    } catch (error) {
      console.error("Error updating product status:", error);
      return null;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const [product]: any = await query(
        "SELECT image FROM products WHERE id = ?",
        [id]
      );

      if (!product) {
        console.error("Product not found");
        return false;
      }

      console.log("image:", product);

      const imageName = product[0].image;
      console.log("nombre de la image:", imageName);

      const imagePath = __dirname + `/../../../assets/${imageName}`;

      if (imageName) {
        try {
          await unlinkAsync(imagePath);
          console.log("Image deleted successfully");
        } catch (imageError) {
          console.error("Error deleting image:", imageError);
          return false;
        }
      }
      let sql = "DELETE FROM products WHERE id = ?";
      const params: any[] = [id];
      const [result]: any = await query(sql, params);
      console.log("Product deleted successfully");

      if (result != null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }

  async viewProduct(): Promise<product[]> {
    try {
      const sql = `
            SELECT 
                p.id,
                p.brand,
                p.model,
                p.image_fk,
                p.numberPart,
                p.stock,
                p.description,
                p.price,
                p.conditions,
                p.status,
                i.img1,
                i.img2,
                i.img3,
                i.img4,
                i.img5
            FROM 
                products p
            INNER JOIN
                image i ON p.image_fk = i.id
        `;
      const [rows]: any = await query(sql, []);
      console.log("entro a sentencia");
      if (rows[0]) {
        return rows.map((row: any) => ({
          id: row.id,
          image_fk: row.image_fk,
          model: row.model,
          numberPart: row.numberPart,
          brand: row.brand,
          stock: row.stock,
          description: row.description,
          price: row.price,
          conditions: row.conditions,
          status: row.status,
          images: [row.img1, row.img2, row.img3, row.img4, row.img5].filter(
            (img) => img !== null
          ),
        }));
      } else {
        throw new Error("No se encontró ningún producto");
      }
    } catch (error) {
      console.error("Error al listar productos:", (error as Error).message);
      throw new Error("Error al listar productos");
    }
  }

  async viewRegisterShop(): Promise<shoppingRe[] | null> {
    try {
      const sql = "SELECT * FROM customer_data";
      const [rows]: any = await query(sql, []);
      console.log("entro a sentencia");
      if (rows[0]) {
        return rows.map((row: any) => ({
          customer_id: row.customer_id,
          given_name: row.given_name,
          surname: row.surname,
          email_address: row.email_address,
          country_code: row.country_code,
          address_line_1: row.address_line_1,
          address_line_2: row.address_line_2,
          admin_area_1: row.admin_area_1,
          admin_area_2: row.admin_area_2,
          postal_code: row.postal_code,
          currency_code: row.currency_code,
          amount: row.amount,
          create_time: row.create_time,
        }));
      } else {
        throw new Error("No se encontro ningun registro de compras");
      }
    } catch (error) {
      console.error("Error al listar product:", (error as Error).message);
      throw new Error("Error al listar registros de compras de usuarios");
    }
  }

  async viewUserShop(
    customer_id: string
  ): Promise<string | shoppingRe | null | any> {
    try {
      const sql = "SELECT * FROM customer_data WHERE customer_id = ?";
      const sql2 = `SELECT *
      FROM customer_data cd
      JOIN historys h ON cd.customer_id = h.uuid_user
      WHERE cd.customer_id = ?;`;
      const params: any[] = [customer_id];
      const [rows]: any = await query(sql2, params);
      if (rows[0]) {
        return rows.map((row: any) => ({
          customer_id: row.customer_id,
          product_user: row.product_user,
          given_name: row.given_name,
          surname: row.surname,
          email_address: row.email_address,
          country_code: row.country_code,
          address_line_1: row.address_line_1,
          address_line_2: row.address_line_2,
          admin_area_1: row.admin_area_1,
          admin_area_2: row.admin_area_2,
          postal_code: row.postal_code,
          currency_code: row.currency_code,
          amount: row.amount,
          create_time: row.create_time,
        }));
      } else {
        throw new Error("No se encontro ningun registro de compras");
      }
    } catch (error) {
      console.error(
        "Error no hay ninguna compra registrada por ese usuario:",
        error
      );
      return null;
    }
  }

  async viewImage(imgId: number): Promise<string | shoppingRe | null | any> {
    try {
      const sql = "SELECT * FROM image WHERE id = ?";
      const params: any[] = [imgId];
      const [rows]: any = await query(sql, params);
      if (rows[0]) {
        return rows.map((row: any) => ({
          id: row.id,
          img1: row.img1,
          img: row.img2,
          img3: row.img3,
          img4: row.img4,
          img5: row.img5,
        }));
      } else {
        throw new Error("No ninguna imagen de ese producto");
      }
    } catch (error) {
      console.error("Algo salio mal con la busqueda:", error);
      return null;
    }
  }
}

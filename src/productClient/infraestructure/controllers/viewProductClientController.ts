import { Request, Response } from "express";
import { listAllProductClientCase } from "../../application/useCase/viewProductClientUseCase";

export class AllProductClientController {
  constructor(
    readonly listAllProductUseCase: listAllProductClientCase,
  ) { }

  async listAllClientProducts(req: Request, res: Response) {
    try {


      let productClientRes = await this.listAllProductUseCase.listAllClientProduct();

      if (productClientRes instanceof Error) {
        return res.status(500).send({
          status: "Error",
          message: productClientRes.message
        });
      }
      if (Array.isArray(productClientRes) && productClientRes.length > 0) {
        return res.status(200).send({
          status: "success",
          data: productClientRes
        });
      } else {
        return res.status(404).send({
          status: "Not Found",
          message: "No product found for the specified product"
        });
      }
    } catch (error) {
      console.error("Unhandled error:", error);
      return res.status(500).send({
        status: "Error2",
        message: "An unexpected error occurred"
      });
    }
  }

}


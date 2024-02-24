import { Request, Response } from "express";
import fs from 'fs';
import path from "path";
import { viewImageUseCase } from "../../application/viewImageUseCase";

export class viewImageProductController {

    constructor(
        readonly viewImageCase: viewImageUseCase
    ) { }
    
    async viewImageProduct(req: Request, res: Response) {
        try {
            let imgId = Number(req.params.imgId);
    
            let viewImg = await this.viewImageCase.run(imgId);
    
            if (Array.isArray(viewImg)) {
                const __dirname = path.dirname(__filename);
                let reqP = path.join(__dirname, "../../../");
    
                let imageDataArray = [];
    
                for (let imgObject of viewImg) {
                    for (let imgProp in imgObject) {
                        if (imgProp.startsWith('img')) {
                            let imgName = imgObject[imgProp];
                            let imgPath = path.join(reqP, 'assets', imgName);
                            let imageData = fs.readFileSync(imgPath);
                            let base64Image = Buffer.from(imageData).toString('base64');
                            let imgSrcString = `data:image/jpeg;base64,${base64Image}`;

                            imageDataArray.push(imgSrcString);
                        }
                    }
                }
    
                res.status(200).json({ images: imageDataArray });
            } else {
                console.log('viewImg no es un array');
                res.status(500).send({
                    status: "error",
                    data: "An error occurred",
                    message: 'Internal Server Error',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                status: "error",
                data: "An error occurred",
                message: 'Internal Server Error',
            });
        }
    }
}

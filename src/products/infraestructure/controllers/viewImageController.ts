import { Request, Response } from "express";
import fs from 'fs';
import path from "path";

export class viewImageProductController {
    
    async viewImageProduct(req: Request, res: Response) {
        const img1 = String(req.query.img1);
        //const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        let reqP = path.join(__dirname, "../../../")
        console.log("data"+reqP)    
        let img =reqP+`//assets//${img1}`;

        fs.access(img, fs.constants.F_OK, err => {
            console.log(`${img} ${err ? "no existe" : "existe"} `)
        });

        fs.readFile(img, async (err,data) =>{
            if(err){
                res.status(404).send({
                    status: "error",
                    data: "An error occurred",
                    message: '404 not found',
                });
            }else{
                //const restaurantC = await this.getImageRestaurantUseCase.run(data.toString())
                if (img1 != null) {
                    res.writeHead(200,{'Content-Type':'image/jpeg'});
                    res.write(data);
                    return res.end();
                } else {
                    res.status(400).send('I dont know, i get the imagen')
                }
            }
        })
    }
}
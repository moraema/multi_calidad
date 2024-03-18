import { Request, Response } from "express";
import { Racimos } from "../../dominio/entities/racimos";
import { RacimoApplication } from "../../application/useCases/racimo.application";
import { MysqlRepository } from "../dataAccess/mysql.respository";

const mysqlRepository = new MysqlRepository();
const racimoAppService = new RacimoApplication(mysqlRepository);


export class RacimoController {

    static async createRacimo(req: Request, res: Response): Promise<any> {
    
        try {
            const newRacimo: Racimos = req.body;
            racimoAppService.createRacimo(newRacimo);

            res.status(201).json({
                messsage: 'se creo correctamente los datos del racimo',
                data: newRacimo
            });
        } catch ( error ) {
            console.log('Hubo un error al crear los datos del racimo');
            res.status(500).json({
                error: 'Hubo un error al crear los datos del racimo'
            })
        }
    }
}
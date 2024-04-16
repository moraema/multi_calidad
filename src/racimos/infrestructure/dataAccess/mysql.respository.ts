import { query } from "../../../database/db.config";
import { Racimos } from "../../dominio/entities/racimos";
import { RacimoRepository } from "../../dominio/respository/racimo.repository";


export class MysqlRepository implements RacimoRepository {
    
    createRacimo = async(racimos: Racimos): Promise<any> => {
        const sql = 'INSERT INTO racimos (temperatura, luz, humedad, imagen) VALUES (?, ?, ?, ?)';
        const params = [racimos.temperatura, racimos.luz, racimos.humedad, racimos.imagen];

        try {
            const result = await query(sql, params);
            return result;
        } catch ( error ){
            console.log('Error al crear los datos del racimo', error);
            throw new Error('Error al crear los datos del racimo' + error);
        }
    }


    getAllRacimo = async(): Promise<Racimos[]> => {
        const sql = 'SELECT id, fecha, temperatura, luz, humedad, imagen FROM racimos';

        try {
            const [result]: any = await query(sql, []);

            const racimos: Racimos[] = result.map((racimoData: any) => {
                return {
                    id: racimoData.id,
                    fecha: racimoData.fecha,
                    temperatura: racimoData.temperatura,
                    luz: racimoData.luz,
                    humedad: racimoData.humedad,
                    imagen: racimoData.imagen
                };
            });
            return racimos;
        } catch (error) {
            console.log('Hubo un error al obtener los racimos', error);
            throw new Error('Hubo un error al obtener los racimos' + error);
        }
    }

    getDatos = async(dato: string): Promise<number[] | null> => {
        const sql = `SELECT ${dato} FROM racimos`;

        try {
            const [result]: any = await query(sql, []);

            const datos: number[] = result.map((row: any) =>  row[dato]);
            return datos;
        } catch (error) {
            console.log('Hubo un error al obtener los datos', error);
            throw new Error('Hubo un error al obtener los datos' + error)
        }
    }
   // verificar la obtencio de imagen
    getImagen = async(): Promise<string[] | null> => {
        const sql = 'SELECT imagen FROM racimos';

        try {
            const [result]: any = await query(sql, []);
            
            const imagenesBase64: string[] = result.map((row: any) => {
                
            const imagenBase64 = Buffer.from(row.imagen).toString('base64');
            return imagenBase64;
            });
            return imagenesBase64;    
        } catch (error) {
            console.log('Hubo un error al obtener la imagen', error);
            throw new Error('Hubo un error al obtener la imagen');
        }
    }
}
import express from 'express';
import { RacimoController } from '../controller/racimo.controller';
import { GetAllController } from '../controller/getAll.controller';
import { GetDatosController } from '../controller/getDato.controller';
import { verifyToken } from '../../../auth/application/middleware/jwt.middleware';

export const router = express.Router();

router.post('/', RacimoController.createRacimo);
router.get('/:dato', verifyToken, GetDatosController.getDatos);
router.get('/', verifyToken, GetAllController.getAllRacimo);


export default router;
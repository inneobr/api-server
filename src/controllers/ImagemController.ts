import { imagemRep } from '../repositories/ImagemRep';
import { Request, Response } from 'express';

export class ImagemController {
    async create(req: Request, res: Response) {        
        const { name, base64, usuario, trending } = req.body
        if( !name ) return res.status(401).send({ message: 'Nome é obrigatório.'});
        const create = imagemRep.create({
            name,
            base64,
            usuario, 
            trending,
            usuarioId: usuario?.id,
            trendingId: trending?.id,
        })       
        const response = imagemRep.save(create)   
	    return res.status(200).json(response);
    }
}
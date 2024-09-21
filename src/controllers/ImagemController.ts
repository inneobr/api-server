import { imagemRep } from '../repositories/ImagemRep';
import { Request, Response } from 'express';

export class ImagemController {
    async create(req: Request, res: Response) {        
        const { name, base64, profile, trending } = req.body
        if( !name || !base64 ) return res.status(401).send({ message: 'Nome e imagem são obrigatório.'});
        const create = imagemRep.create({
            uuid: profile.id,
            name,
            base64,
            profile, 
            trending
        })       
        const response = imagemRep.save(create)   
	    return res.status(200).json(response);
    }
}
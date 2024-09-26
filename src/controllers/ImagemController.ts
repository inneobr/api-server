import { imagemRep } from '../repositories/ImagemRep';
import { Request, Response } from 'express';

export class ImagemController {
    async create(req: Request, res: Response) {        
        const { descricao, base64, usuario, trending } = req.body
        if( !descricao ) return res.status(401).send({ message: 'Nome é obrigatório.'});
        const create = imagemRep.create({
            descricao,
            base64,
            usuario, 
            trending,
            usuarioId: usuario?.id,
            trendingId: trending?.id,
        })       
        const response = imagemRep.save(create)   
	    return res.status(200).json(response);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.query
        if( !id ) return res.status(400).json({ message: "Parametro 'id' obrigatório."}) 
        
		const response = await imagemRep.findBy({trendingId: Number(id)});
       if(!response) return res.status(200).json({ message: "Nenhum registro encontrado."});
		return res.json(response);
	}
}
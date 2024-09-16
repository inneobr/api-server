import { trendingRep } from '../repositories/TrendingRep';
import { Request, Response } from 'express'
import uuid from 'react-uuid';

export class TrendingController {
    async create(req: Request, res: Response) {
        const { message, usuario, base64 } = req.body
        if( !message || !usuario ) return res.status(400).json({ message: "Campos com * obrigatório."});
        
        const create = trendingRep.create({
            uuid: uuid(),
            message,
            usuario,
            base64
        })
        await trendingRep.save(create);
        return res.status(201).json(create);
    }

    async findall(req: Request, res: Response) {
        
		const trending = await trendingRep.createQueryBuilder("trending")
        .leftJoinAndSelect("trending.usuario", "usuario")
        .getMany()        
        if(!trending) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = trending.map((item) => {
            return {                
                usuario: {
                    uuid: item.usuario.uuid,
                    username: item.usuario.username,
                },
                uuid: item.uuid,
                message: item.message,
                base64: item.base64,
                created: item.created
            }
        })
        
		return res.json(response);
	}
}
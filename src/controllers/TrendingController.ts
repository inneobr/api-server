import { Request, Response } from 'express'
import { trendingRep } from '../repositories/TrendingRep';

export class TrendingController {
    async create(req: Request, res: Response) {
        const { message, usuario, base64, share } = req.body
        if( !message || !usuario ) return res.status(400).json({ message: "Campos com * obrigatório."});
        
        const create = trendingRep.create({
            message,
            usuario,
            base64,
            share
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
                    name: item.usuario.name,
                    username: item.usuario.username,
                    base64: item.usuario.base64
                },
                uuid: item.uuid,
                message: item.message,
                base64: item.base64,
                share: item.share,
                created: item.created
            }
        })
        
		return res.json(response);
	}
}
import { Request, Response } from 'express'
import { trendingRep } from '../repositories/TrendingRep';

export class TrendingController {
    async create(req: Request, res: Response) {
        const { message, usuario } = req.body
        if( !message || !usuario ) return res.status(400).json({ message: "Campos com * obrigatório."});

        const create = trendingRep.create({
            message,
            usuario
        })
        await trendingRep.save(create);
        return res.status(201).json(create);
    }

    async findall(req: Request, res: Response) {
        
		const thoughts = await trendingRep.createQueryBuilder("thoughts")
        .leftJoinAndSelect("thoughts.usuario", "usuario")
        .getMany()        
        if(!thoughts) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = thoughts.map((item, index) => {
            return {                
                usuario: {
                    uuid: item.usuario.uuid,
                    name: item.usuario.name,
                    username: item.usuario.username
                },
                uuid: item.uuid,
                message: item.message
            }
        })
        
		return res.json(response);
	}
}
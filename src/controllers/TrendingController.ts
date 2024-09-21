import { trendingRep } from '../repositories/TrendingRep';
import { Request, Response } from 'express'

export class TrendingController {
    async create(req: Request, res: Response) {
        const { uri, link, message, usuario } = req.body
        if( !uri && !link && !message || !usuario ) return res.status(400).json({ message: "Campos com * obrigatório."});
        
        const create = trendingRep.create({
            uuid: usuario.id,
            uri,
            link,
            message,
            usuario
        })
        await trendingRep.save(create);
        return res.status(201).json(create);
    }

    async find(req: Request, res: Response) {        
		const response = await trendingRep.find();
        if(!response) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const trending = response.map((item) => {
            return {                
                usuario: {
                    uuid: item.usuario.id,
                    username: item.usuario.username
                },
                uuid: item.uuid,
                uri: item.uri,
                link: item.link,
                message: item.message,
                created: item.created,
                imagen: item.imagen
            }
        })
        
		return res.json(trending);
	}

    async delete(req: Request, res: Response) {
        const { id } = req.body;
        if( !id ) return res.status(400).json({ message: "ID obrigatório."});   

        const trending = await trendingRep.findOneBy({id: Number(id)});        
        if(!trending) return res.status(400).json({ message: "Trending não encontrado."});

        await trendingRep.delete(id);
        return res.status(201).json({ message: trending?.usuario + " Deletada com sucesso."});
    }
}
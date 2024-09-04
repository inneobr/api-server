import { Request, Response } from 'express'
import { videoRep } from '../repositories/VideosRep';

export class VideoController {
    async create(req: Request, res: Response) {
        const { title, descricao, publiclink  } = req.body
        if( !title || !descricao|| !publiclink ) return res.status(400).json({ message: "Campos com * obrigatório."});

        const create = videoRep.create({
            title,
            descricao,
            publiclink
        })

        const video = await videoRep.findOneBy({publiclink: String(create.publiclink)});
        if(video) return res.status(400).json({ message: "Video encontrado no sistema."});

        await videoRep.save(create);
        return res.status(201).json(create);
    }

    async update(req: Request, res: Response) {
        const { uuid, title, descricao, publiclink } = req.body;
        if( !uuid || !title || !descricao|| !publiclink ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const create = videoRep.create({
            uuid,
            title,
            descricao,
            publiclink
        })

        const video = await videoRep.findOneBy({uuid: Number(uuid)});
        if(!video) return res.status(400).json({ message: "UUID não encontrado."});
        await videoRep.update(uuid, create);
        return res.status(201).json(create);
    }

    async delete(req: Request, res: Response) {
        const { uuid } = req.body;
        if( !uuid ) return res.status(400).json({ message: "UUID obrigatório."});   

        const video = await videoRep.findOneBy({uuid: Number(uuid)});        
        if(!video) return res.status(400).json({ message: "UUID não encontrado."});

        await videoRep.delete(uuid);
        return res.status(201).json({ message: video?.title + " Deletado com sucesso."});
    }

    async findall(req: Request, res: Response) {
		const videos = await videoRep.find()
        if(!videos) return res.status(200).json({ message: "Nenhum registro encontrado."});
		return res.json(videos);
	}

    async findByUuid(req: Request, res: Response) {
        const { uuid  } = req.body
        if( !uuid ) return res.status(400).json({ message: "UUID obrigatório."})

		const videos = await videoRep.findOneBy({ uuid: Number(uuid) })
        if(!videos) return res.status(200).json({ message: "Nenhum registro encontrado."});
		return res.json(videos);
	}

    async findByTitle(req: Request, res: Response) {
        const { title  } = req.body
        if( !title ) return res.status(200).json({ message: "Nenhum registro encontrado."});
        
		const videos = await videoRep.createQueryBuilder()
        .where("LOWER(title) LIKE :title", { title: `%${ title.toLowerCase() }%` })
        .getMany();
        if(!videos) return res.status(200).json({ message: "Nenhum registro encontrado."});
		return res.json(videos);
	}
}
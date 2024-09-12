import { Request, Response } from 'express'
import { thoughtsRep } from '../repositories/ThoughtsRep';
import { usuarioRep } from '../repositories/UsuariosRep';

export class ThoughtController {
    async create(req: Request, res: Response) {
        const { message, usuario  } = req.body
        if( !message || !usuario ) return res.status(400).json({ message: "Campos com * obrigatório."});

        const create = thoughtsRep.create({
            message,
            usuario
        })
        await thoughtsRep.save(create);
        return res.status(201).json(create);
    }
/*
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
*/
    async findall(req: Request, res: Response) {
		const thoughts = await thoughtsRep.find()       
        if(!thoughts) return res.status(200).json({ message: "Nenhum registro encontrado."});
		return res.json(thoughts);
	}
}
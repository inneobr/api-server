import { Request, Response } from 'express'
import { thoughtsRep } from '../repositories/ThoughtsRep';
import { usuarioRep } from '../repositories/UsuariosRep';

export class ThoughtController {
    async create(req: Request, res: Response) {
        const { message, usuario } = req.body
        if( !message || !usuario ) return res.status(400).json({ message: "Campos com * obrigatório."});

        const create = thoughtsRep.create({
            message,
            usuario
        })
        await thoughtsRep.save(create);
        return res.status(201).json(create);
    }

    async findall(req: Request, res: Response) {
        
		const thoughts = await thoughtsRep.createQueryBuilder("thoughts")
        .leftJoinAndSelect("thoughts.usuario", "usuario")
        .getMany()        
        if(!thoughts) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = thoughts.map((thought, index) => {
            return {                
                usuario: {
                    uuid: thought.usuario.uuid,
                    name: thought.usuario.name,
                    username: thought.usuario.username
                },
                uuid: thought.uuid,
                message: thought.message
            }
        })
        
		return res.json(response);
	}
}
import { profileRep } from '../repositories/ProfileRep';
import { usuarioRep } from '../repositories/UsuariosRep';
import { Request, Response } from 'express';

export class ProfileController {
    async create(req: Request, res: Response) {
        const { name, email, biography,  usuario } = req.body
        if( !name || !email || !usuario ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const profile = profileRep.create({
            name,
            email,            
            biography,
            usuario,
            usuarioId: usuario?.id
        })
       await profileRep.save(profile);
        return res.status(201).json({ message: 'Cadastrado com sucesso.' });
    }
   
    async findall(req: Request, res: Response) {        
		const response = await profileRep.find()
        if(!response) return res.status(200).json({ message: "Nenhum registro encontrado."}); 
		return res.json(response);
	}

    async find(req: Request, res: Response) {
        const {id} = req.params
        if( !id ) return res.status(400).json({ message: "Parametro 'id' obrigatório."}) 
        
		const response = await profileRep.findOneBy({usuarioId: Number(id)});
       if(!response) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const profile = { id: response.id, name: response.name, email: response.email, biography: response.biography, 
            usuario: {
                id:  response.usuario.id, username:  response.usuario.username
            } 
        };
		return res.json(profile);
	}

    async update(req: Request, res: Response) {
        const { id, name, email, biography, usuario } = req.body;
        if( !id || !name || !email || !usuario ) return res.status(400).json({ message: "Campos com * obrigatório."});

        const profile = await profileRep.findOneBy({id: Number(id)});  
        if(!profile) return res.status(400).json({ message: "Perfil não encontrado."}); 

        const create = profileRep.create({
            id,
            name,
            email,
            biography,
            usuario
        })
             
        await profileRep.update(profile.id, create);
        return res.status(201).json(create);
    }
}
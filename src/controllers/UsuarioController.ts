import { usuarioRep } from '../repositories/UsuariosRep';
import { Request, Response } from 'express';
import uuid from 'react-uuid';

const bcrypt = require('bcryptjs');

export class UsuarioController {
    async create(req: Request, res: Response) {
        const { username, password } = req.body
        if( !username || !password ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create = usuarioRep.create({
            uuid: uuid(),
            username,
            password: criptpass
        })
        const usuario = await usuarioRep.findOneBy({username: String(create.username)});
        if(usuario) return res.status(400).json({ message: "Username indisponível."});
        await usuarioRep.save(create);
        return res.status(201).json(create);
    }

    async update(req: Request, res: Response) {
        const { id, uuid, username, password } = req.body;
        if( !uuid || !username || !password ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create =  usuarioRep.create({
            uuid,           
            username,
            password: criptpass
        })
        const usuario = await usuarioRep.findOneBy({uuid: String(create.uuid)});
        if(!usuario) return res.status(400).json({ message: "Usuário não encontrado."});
        await usuarioRep.update(uuid, create);
        return res.status(201).json(create);
    }

    async delete(req: Request, res: Response) {
        const { uuid } = req.body;
        if( !uuid ) return res.status(400).json({ message: "UUID obrigatório."});   

        const usuario = await usuarioRep.findOneBy({uuid: String(uuid)});        
        if(!usuario) return res.status(400).json({ message: "UUID não encontrado."});

        await usuarioRep.delete(uuid);
        return res.status(201).json({ message: usuario?.username + " Deletado com sucesso."});
    }
    
    async findall(req: Request, res: Response) {
		const usuario = await usuarioRep.createQueryBuilder("usuario")
        .leftJoinAndSelect("usuario.profile", "profile")
        .getMany();        
        if(!usuario) return res.status(200).json({ message: "Nenhum registro encontrado."});
        
        const response = usuario.map(item => { 
            const profile = item.profile ? item.profile : {name: '', biografia: ''};
            return { uuid: item.uuid, username: item.username, name: profile.name, biografia: profile.biografia }});
		return res.json(response);
	}

    async findByUuid(req: Request, res: Response) {
        const { uuid  } = req.body
        if( !uuid ) return res.status(400).json({ message: "UUID obrigatório."})

		const usuario = await usuarioRep.findOneBy({ uuid: String(uuid) })       
        if(!usuario) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = { uuid: usuario.uuid, username: usuario.username };
		return res.json(response);
	}

    async findByUsername(req: Request, res: Response) {
        const { username } = req.body
        if( !username ) return res.status(200).json({ message: "Nenhum registro encontrado."});
        
		const usuarios = await usuarioRep.createQueryBuilder()
        .where("LOWER(username) LIKE :username", { username: `%${ username.toLowerCase() }%` }).getMany();
        if(!usuarios) return res.status(200).json({ message: "Nenhum registro encontrado."});
		const response = usuarios.map(item => {  return { uuid: item.uuid, username: item.username }});
		return res.json(response);
	}
}
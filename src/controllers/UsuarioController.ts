import { usuarioRep } from '../repositories/UsuariosRep';
import { Request, Response } from 'express';
import uuid from 'react-uuid';

const bcrypt = require('bcryptjs');

export class UsuarioController {
    async create(req: Request, res: Response) {
        const { name, base64, username, password } = req.body
        if( !name || !username || !password ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create = usuarioRep.create({
            uuid: uuid(),
            name,
            base64,
            username,
            password: criptpass
        })
        const usuario = await usuarioRep.findOneBy({username: String(create.username)});
        if(usuario) return res.status(400).json({ message: "Username indisponível."});
        await usuarioRep.save(create);
        return res.status(201).json(create);
    }

    async update(req: Request, res: Response) {
        const { id, uuid, name, base64, username, password } = req.body;
        if( !id || !uuid || !username || !password ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create =  usuarioRep.create({
            id,
            uuid,
            name, 
            base64,
            username,
            password: criptpass
        })
        const usuario = await usuarioRep.findOneBy({uuid: String(create.uuid)});
        if(!usuario) return res.status(400).json({ message: "UUID não encontrado."});
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
		const usuario = await usuarioRep.find();        
        if(!usuario) return res.status(200).json({ message: "Nenhum registro encontrado."});
        
        const response = usuario.map(item => { 
            return { name: item.name, username: item.username, uuid: item.uuid, base64: item.base64 }});
		return res.json(response);
	}

    async findByUuid(req: Request, res: Response) {
        const { uuid  } = req.body
        if( !uuid ) return res.status(400).json({ message: "UUID obrigatório."})

		const usuario = await usuarioRep.findOneBy({ uuid: String(uuid) })       
        if(!usuario) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = { uuid: usuario.uuid, name: usuario.name, base64: usuario.base64, username: usuario.username };
		return res.json(response);
	}

    async findByUsername(req: Request, res: Response) {
        const { username } = req.body
        if( !username ) return res.status(200).json({ message: "Nenhum registro encontrado."});
        
		const usuarios = await usuarioRep.createQueryBuilder()
        .where("LOWER(username) LIKE :username", { username: `%${ username.toLowerCase() }%` })
        .getMany();
        if(!usuarios) return res.status(200).json({ message: "Nenhum registro encontrado."});
		const response = usuarios.map(item => {  return { uuid: item.uuid, name: item.name, base64: item.base64, username: item.username }});
		return res.json(response);
	}
}
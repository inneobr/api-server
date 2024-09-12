import { usuarioRep } from '../repositories/UsuariosRep';
import { createToken } from "../utils/jwtManager"
import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');

export class AuthController {
    async login(req: Request, res: Response) {        
        const { username, password } = req.body
        if( !username  || !password ) return res.status(401).send({ message: 'Username and Password obrigatório.'});
        const create = usuarioRep.create({
            username,
            password
        })
        const usuarios = await usuarioRep.findOneBy({ username: String(create.username)});
        if (!usuarios) return res.status(403).json({message: 'Não autorizado: username or password incorretos.'});
        if(username) {
            const use_password = create.username ? create.password : '';
            const dba_password = usuarios?.password;
            const authenticated = await  bcrypt.compare(use_password, dba_password);

            if (!authenticated) return res.status(403).json({ message: 'Não autorizado: username or password incorretos.'});
            const accessToken = createToken({ uuid: usuarios.uuid, username: usuarios.username });
	        return res.status(200).json({accessToken: accessToken});
        }
    }
}
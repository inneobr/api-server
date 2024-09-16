import { AppDataSource } from '../data-source'
import { Usuario } from '../entities/Usuario'

export const usuarioRep = AppDataSource.getRepository(Usuario);
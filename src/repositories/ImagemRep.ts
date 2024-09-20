import { AppDataSource } from '../data-source'
import { Imagen } from '../entities/Imagen'

export const imagemRep = AppDataSource.getRepository(Imagen);
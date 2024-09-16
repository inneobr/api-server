import { AppDataSource } from '../data-source'
import { Profile } from '../entities/Profile'

export const profileRep = AppDataSource.getRepository(Profile);
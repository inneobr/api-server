import { AppDataSource } from '../data-source'
import { Thoughts } from '../entities/Thoughts'

export const thoughtsRep = AppDataSource.getRepository(Thoughts);
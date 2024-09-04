import { AppDataSource } from '../data-source'
import { Video } from '../entities/Video'

export const videoRep = AppDataSource.getRepository(Video);
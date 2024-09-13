import { AppDataSource } from '../data-source'
import { Trending } from '../entities/Trending'

export const trendingRep = AppDataSource.getRepository(Trending);
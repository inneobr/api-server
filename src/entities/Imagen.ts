import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Profile } from "./Profile";
import { Trending } from "./Trending";
import { Usuario } from "./Usuario";

@Entity('imagen')
export class Imagen {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number    

    @Column({name: 'name', nullable: false})
    name: string

    @Column({type: 'clob', name: 'base64', nullable: false})
    base64: string   
    
    @Column({name: 'usuario', nullable: true})
    usuarioId: number 

    @Column({name: 'trending', nullable: true})
    trendingId: number 
    
    @OneToOne(() => Usuario, usuario => usuario.imagen)
	@JoinColumn({name: 'usuario_id'})
	usuario: Usuario  

    @OneToOne(() => Trending, trending => trending.imagen)
	@JoinColumn({name: 'trending_id'})
	trending: Trending  
}
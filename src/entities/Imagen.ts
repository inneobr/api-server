import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne, OneToOne, ManyToMany } from "typeorm";
import { Profile } from "./Profile";
import { Trending } from "./Trending";
import { Usuario } from "./Usuario";

@Entity('imagen')
export class Imagen {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number    

    @Column({name: 'descricao', nullable: false})
    name: string

    @Column({type: 'clob', name: 'imagem', nullable: false})
    base64: Blob  
    
    @Column({name: 'usuario', nullable: true})
    usuarioId: number 

    @Column({name: 'trending', nullable: true})
    trendingId: number 
    
    @OneToOne(() => Usuario, usuario => usuario.imagen)
	@JoinColumn({name: 'usuario_id'})
	usuario: Usuario  

    @ManyToMany(() => Trending, trending => trending.imagen)
    @JoinColumn({name: 'trending_id'})
	trending: Trending[]  
}
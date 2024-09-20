import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Profile } from "./Profile";
import { Trending } from "./Trending";

@Entity('imagen')
export class Imagen {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', nullable: false})
    name: string

    @Column({type: 'clob', name: 'base64', nullable: false})
    base64: string 
    
    @OneToOne(() => Profile, profile => profile.imagen)
	@JoinColumn()
	profile: Profile  

    @OneToOne(() => Trending, trending => trending.imagen)
	@JoinColumn()
	trending: Trending  
}
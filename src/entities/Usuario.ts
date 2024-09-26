import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, OneToMany, JoinTable } from "typeorm";
import { Profile } from "./Profile";
import { Trending } from "./Trending";
import { Imagen } from "./Imagen";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'username', unique: true, nullable: false})
    username: string

    @Column({name: 'password', nullable: false})
    password: string  

    @OneToOne(() => Profile, (profile) => profile.usuario, { cascade: true, onDelete: 'CASCADE' }) 
    @JoinColumn({name: 'profile_id'})
    profile: Profile

    @OneToOne(() => Imagen, (imagen) => imagen.usuario, { eager: true, cascade: true, onDelete: 'CASCADE'})
    @JoinTable({name: 'imagem_id'})
	imagen: Imagen

    @OneToMany(() => Trending, (trending) => trending.usuario, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable({name: 'usuario_trending'})   
	trending: Trending[]  
}
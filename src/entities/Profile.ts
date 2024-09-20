import {  PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, OneToMany, JoinTable } from "typeorm";
import { Usuario } from "./Usuario";
import { Imagen } from "./Imagen";

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 100, nullable: false})
    name: string

    @Column({name: 'email', length: 100, nullable: false})
    email: string  

    @Column({name: 'biography', length: 100, nullable: true})
    biography: string  

    @OneToOne(() => Usuario, (usuario) => usuario.profile, { eager: true }) 
    @JoinColumn()
    usuario: Usuario

    @OneToOne(() => Imagen, (imagen) => imagen.profile, { eager: true })
    @JoinTable()
	imagen: Imagen
}
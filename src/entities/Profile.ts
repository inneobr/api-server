import {  PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";

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

    @Column({name: 'usuario', nullable: true})
    usuarioId: number

    @OneToOne(() => Usuario, (usuario) => usuario.profile, { eager: true }) 
    @JoinColumn({name: 'usuario_id'})
    usuario: Usuario    
}
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({type: 'varchar2', name: 'uuid', nullable: false})
    uuid: string 

    @Column({type: 'varchar2', name: 'name', nullable: false})
    name: string

    @Column({type: 'varchar2', name: 'email', nullable: false})
    email: string

    @Column({type: 'varchar2', name: 'biografia', nullable: true})
    biografia: string

    @Column({type: 'clob', name: 'base64', nullable: true})
    base64: string 

    @OneToOne(() => Usuario, (usuario) => usuario.profile) 
    usuario: Usuario
}
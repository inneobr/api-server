import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuarios } from './Usuario'

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn({name: 'UUID'})
    uuid: number

    @Column({name: 'title'})
    title: string

    @Column({name: 'description'})
    description: string

    @Column({name: 'path'})
    path: string

    @ManyToOne(() => Usuarios, usuario => usuario.video)
	@JoinColumn({ name: 'usuario_uuid' })
	usuario: Usuarios    
}
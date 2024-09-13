import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuarios } from './Usuario'

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn({name: 'UUID'})
    uuid: number

    @Column({type: 'varchar2', name: 'title', nullable: false})
    title: string

    @Column({type: 'varchar2', name: 'description', nullable: false})
    description: string

    @Column({type: 'varchar2', name: 'path', nullable: false})
    path: string

    @ManyToOne(() => Usuarios, usuario => usuario.videos)
	@JoinColumn({ name: 'usuario_id' })
	usuario: Usuarios
}
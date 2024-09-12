import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thoughts } from './Thoughts'
import { Video } from './Video'

@Entity('usuarios')
export class Usuarios {
    @PrimaryGeneratedColumn({name: 'uuid'})
    uuid: number

    @Column({type: 'varchar2', name: 'name'})
    name: string

    @Column({type: 'varchar2', name: 'username', nullable: false})
    username: string

    @Column({type: 'varchar2', name: 'password', nullable: false})
    password: string

    @OneToMany(() => Thoughts, thought => thought.usuario)
	thought: Thoughts[] 

    @OneToMany(() => Video, video => video.usuario)
	video: Video[]
}
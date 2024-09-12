import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thoughts } from './Thoughts'
import { Video } from './Video'

@Entity('usuarios')
export class Usuarios {
    @PrimaryGeneratedColumn({name: 'uuid'})
    uuid: number

    @Column({name: 'uername'})
    username: string

    @Column({name: 'password'})
    password: string

    @OneToMany(() => Thoughts, thought => thought.usuario)
	thought: Thoughts[] 

    @OneToMany(() => Video, video => video.usuario)
	video: Video[]
}
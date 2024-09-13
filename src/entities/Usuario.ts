import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trending } from './Trending'

@Entity('usuarios')
export class Usuarios {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({type: 'varchar2', name: 'uuid', nullable: true})
    uuid: string 

    @Column({type: 'varchar2', name: 'name'})
    name: string

    @Column({type: 'clob', name: 'base64', nullable: true})
    base64: string 

    @Column({type: 'varchar2', name: 'username', nullable: false})
    username: string

    @Column({type: 'varchar2', name: 'password', nullable: false})
    password: string

    @OneToMany(() => Trending, (trending) => trending.usuario)
    @JoinTable()
	trending: Trending[]
}
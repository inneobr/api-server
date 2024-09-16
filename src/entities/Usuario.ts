import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Trending } from './Trending'
import { Profile } from "./Profile";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({type: 'varchar2', name: 'uuid', nullable: true})
    uuid: string

    @Column({type: 'varchar2', name: 'username', nullable: false})
    username: string

    @Column({type: 'varchar2', name: 'password', nullable: false})
    password: string

    @OneToOne(() => Profile, (profile) => profile.usuario) 
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Trending, (trending) => trending.usuario)
    @JoinTable()
	trending: Trending[]    
}
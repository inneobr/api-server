import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, OneToMany, JoinTable } from "typeorm";
import { Profile } from "./Profile";
import { Trending } from "./Trending";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'username', nullable: false})
    username: string

    @Column({name: 'password', nullable: false})
    password: string  

    @OneToOne(() => Profile, (profile) => profile.usuario, { cascade: true, onDelete: 'CASCADE' }) 
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Trending, (trending) => trending.usuario, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
	trending: Trending[]  
}
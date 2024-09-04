import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('VIDEOS')
export class Video {
    @PrimaryGeneratedColumn({name: 'UUID'})
    uuid: number

    @Column({name: 'TITLE'})
    title: string

    @Column({name: 'DESCRICAO'})
    descricao: string

    @Column({name: 'PUBLICLINK'})
    publiclink: string
}
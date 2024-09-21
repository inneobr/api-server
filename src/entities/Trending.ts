import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from './Usuario'
import { Imagen } from "./Imagen";

@Entity('trending')
export class Trending {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({type: 'varchar2', name: 'uuid', nullable: true})
    uuid: number 
      
    @Column({type: 'varchar2', name: 'message', nullable: true})
    message: string 

    @Column({type: 'varchar2', name: 'uri', nullable: true})
    uri: string 

    @Column({type: 'varchar2', name: 'link', nullable: true})
    link: string     

    @CreateDateColumn({name: 'created'})
    created: Date   

    @ManyToOne(() => Usuario, usuario => usuario.trending, { eager: true })
	@JoinColumn()
	usuario: Usuario 
    
    @OneToMany(() => Imagen, (imagen) => imagen.trending, { eager: true })
    @JoinTable()
	imagen: Imagen
}
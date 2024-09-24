import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from './Usuario'
import { Imagen } from "./Imagen";

@Entity('trending')
export class Trending {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number
       
    @Column({type: 'varchar2', name: 'message', nullable: true})
    message: string 

    @Column({type: 'varchar2', name: 'uri', nullable: true})
    uri: string 

    @Column({type: 'varchar2', name: 'link', nullable: true})
    link: string     

    @CreateDateColumn({name: 'created'})
    created: Date   

    @Column({name: 'usuario'})
    usuarioId: number

    @ManyToOne(() => Usuario, usuario => usuario.trending, { eager: true })
    @JoinColumn({name: 'usuario_id'})
	usuario: Usuario 
    
    @ManyToMany(() => Imagen, (imagen) => imagen.trending, { eager: true })
    @JoinTable({name: 'trending_imagens', 
        joinColumn: {
            name: 'trending_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'imagens_id',
            referencedColumnName: 'id',
        },
    })  
	imagen: Imagen[]
}
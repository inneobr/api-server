import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from './Usuario'

@Entity('trending')
export class Trending {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({type: 'varchar2', name: 'uuid', nullable: true})
    uuid: string 
      
    @Column({type: 'varchar2', name: 'message', nullable: true})
    message: string 

    @Column({type: 'clob', name: 'base64', nullable: true})
    base64: string 

    @CreateDateColumn({name: 'created'})
    created: Date   

    @ManyToOne(() => Usuario, usuario => usuario.trending)
	@JoinColumn({ name: 'usuario_id' })
	usuario: Usuario    
}
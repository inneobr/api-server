import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Usuarios } from './Usuario'

@Entity('trending')
export class Trending {
    @PrimaryGeneratedColumn({name: 'uuid'})
    uuid: number
      
    @Column({type: 'varchar2', name: 'message', nullable: true})
    message: string 

    @Column({type: 'clob', name: 'base64', nullable: true})
    base64: string 

    @Column({type: 'clob', name: 'share', nullable: true})
    share: string  

    @CreateDateColumn({name: 'created'})
    created: Date   

    @ManyToOne(() => Usuarios, usuario => usuario.trending)
	@JoinColumn({ name: 'usuario_id' })
	usuario: Usuarios    
}
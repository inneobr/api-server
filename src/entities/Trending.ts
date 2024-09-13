import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Usuarios } from './Usuario'

@Entity('trending')
export class Trending {
    @PrimaryGeneratedColumn({name: 'uuid'})
    uuid: number
      
    @Column({type: 'varchar2', name: 'message', nullable: false})
    message: string 

    @Column({type: 'blob', name: 'base64', nullable: false})
    base64: string 

    @Column({type: 'varchar2', name: 'share', nullable: false})
    share: string  

    @CreateDateColumn({name: 'created'})
    created: Date   

    @ManyToOne(() => Usuarios, usuario => usuario.trending)
	@JoinColumn({ name: 'usuario_id' })
	usuario: Usuarios    
}
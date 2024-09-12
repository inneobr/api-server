import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuarios } from './Usuario'

@Entity('thoughts')
export class Thoughts {
    @PrimaryGeneratedColumn({name: 'uuid'})
    uuid: number
      
    @Column({type: 'varchar2', name: 'message', nullable: false})
    message: string

    @CreateDateColumn({name: 'created'})
    created: Date

    @ManyToOne(() => Usuarios, usuario => usuario.video)
	@JoinColumn({ name: 'usuario_uuid' })
	usuario: Usuarios    
}
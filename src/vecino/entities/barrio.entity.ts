import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Vecino } from './vecino.entity';

@Entity('barrio')
export class Barrio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Vecino, (vecino) => vecino.barrio)
  vecinos: Vecino[];
}

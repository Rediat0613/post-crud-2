import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from '../../todos/entities/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
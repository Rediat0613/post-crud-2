import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: false })
  isDone: boolean;

  @ManyToOne(() => User, (user) => user.todos, { eager: false })
  user: User;
}

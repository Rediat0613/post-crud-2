import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDto, user: User) {
    const todo = this.todoRepo.create({ ...dto, user });
    return this.todoRepo.save(todo);
  }

  async findAll(user: User) {
    return this.todoRepo.find({ where: { user } });
  }

  async update(id: string, dto: UpdateTodoDto, user: User) {
    const todo = await this.todoRepo.findOne({ where: { id, user } });
    if (!todo) throw new NotFoundException();
    Object.assign(todo, dto);
    return this.todoRepo.save(todo);
  }

  async remove(id: string, user: User) {
    const todo = await this.todoRepo.findOne({ where: { id, user } });
    if (!todo) throw new NotFoundException();
    return this.todoRepo.remove(todo);
  }
}

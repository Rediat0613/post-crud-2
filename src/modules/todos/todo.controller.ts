import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateTodoDto) {
    return this.todosService.create(dto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() dto: UpdateTodoDto) {
    return this.todosService.update(id, dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.todosService.remove(id, req.user);
  }
}

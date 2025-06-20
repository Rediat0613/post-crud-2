import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiCreatedResponse({ type: User })
  @ApiConflictResponse({ description: 'Email already in use' })
  async register(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // you get { userId, email } from validate()
  }
}

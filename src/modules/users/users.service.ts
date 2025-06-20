import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // Check if the user already exists
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}

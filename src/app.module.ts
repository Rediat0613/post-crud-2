import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todo.module';

@Module({
  imports: [
    // Load .env variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME ?? 'postgres', 
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'todoapp',
      entities: [User], // or use glob pattern
      synchronize: true, // for dev only
    }),

    // Feature modules
    UsersModule,
    AuthModule,
    TodosModule,
  ],
})
export class AppModule {}
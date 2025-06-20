import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('To-Do App API')
    .setDescription('API documentation for the To-Do List App')
    .setVersion('1.0')
    .addBearerAuth() // for JWT protected routes
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // accessible at /api
  await app.listen(3000);
}
bootstrap();

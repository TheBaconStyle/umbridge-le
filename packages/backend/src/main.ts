import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { AppService } from './app/app.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const appService = app.get(AppService)
  const config = app.get(ConfigService)
  await appService.applyMiddleware(app)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  )
  const PORT = config.getOrThrow('PORT')
  await app.listen(PORT)
}

bootstrap()

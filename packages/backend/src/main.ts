import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { AppService } from './app/app.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const trpc = app.get(AppService)
  trpc.applyMiddleware(app)
  await app.listen(process.env.PORT || 4000)
}

bootstrap()

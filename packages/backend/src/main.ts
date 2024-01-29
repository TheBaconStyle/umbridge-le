import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { existsSync } from 'fs'
import { AppService } from './app/app.service'

config({ path: existsSync('.env.local') ? '.env.local' : '.env' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const appService = app.get(AppService)
  const config = app.get(ConfigService)
  appService.applyMiddleware(app)
  await app.listen(config.getOrThrow('PORT'))
}

bootstrap()

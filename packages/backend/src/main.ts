import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'
import { existsSync } from 'fs'
import { AppModule } from './app/app.module'
import { AppService } from './app/app.service'
import { renderTrpcPanel } from 'trpc-panel'
import { Request, Response } from 'express'

config({ path: existsSync('.env.local') ? '.env.local' : '.env' })

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
  const isDev = config.get('NODE_ENV') !== 'production'
  if (isDev) {
    app.use('/trpc-panel', (_: Request, res: Response) => {
      return res.send(
        renderTrpcPanel(appService.router, { url: `http://localhost:${PORT}` }),
      )
    })
  }
  await app.listen(PORT)
}

bootstrap()

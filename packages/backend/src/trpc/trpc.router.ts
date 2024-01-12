import { INestApplication, Injectable } from '@nestjs/common'
import { TrpcService } from './trpc.service'
import * as trpcExpress from '@trpc/server/adapters/express'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().optional(),
})

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure.input(userSchema).query(({ input }) => {
      const { name } = input
      return {
        greeting: `Hello ${name ?? 'NestJS + tRPC'}`,
      }
    }),
  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    )
  }
}

export type AppRouter = TrpcRouter['appRouter']

import { INestApplication, Injectable } from '@nestjs/common'
import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

@Injectable()
export class AppService {
  trpc = initTRPC.create()
  procedure = this.trpc.procedure
  router = this.trpc.router
  mergeRouters = this.trpc.mergeRouters

  appRouter = this.trpc.router({})

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    )
  }
}

export type AppRouter = AppService['appRouter']

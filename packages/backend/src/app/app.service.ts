import { INestApplication, Injectable } from '@nestjs/common'
import { router } from '@server/trpc/trpc.config'
import { UserService } from '@server/user/user.service'
import * as trpcExpress from '@trpc/server/adapters/express'

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  appRouter = router({
    // users: this.userService.userRouter,
  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    )
  }
}

export type AppRouter = AppService['appRouter']

import { INestApplication, Injectable } from '@nestjs/common'
import { QuestionService } from '@server/question/question.service'
import { router } from '@server/trpc'
import { UserService } from '@server/user/user.service'
import * as trpcExpress from '@trpc/server/adapters/express'

@Injectable()
export class AppService {
  constructor(
    private readonly questionService: QuestionService,
    private readonly userService: UserService,
  ) {}

  router = router({
    questions: this.questionService.router,
    users: this.userService.router,
  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.router,
      }),
    )
  }
}

export type AppRouter = AppService['router']

import { INestApplication, Injectable } from '@nestjs/common'
import { QuestionService } from '@server/question/question.service'
import { router, createContext } from '@server/trpc'
import * as trpcExpress from '@trpc/server/adapters/express'

@Injectable()
export class AppService {
  constructor(private readonly questionService: QuestionService) {}

  router = router({ questions: this.questionService.router })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.router,
        createContext,
      }),
    )
  }
}

export type AppRouter = AppService['router']

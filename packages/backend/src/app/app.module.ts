import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AttemptModule } from '@server/attempt/attempt.module'
import { CourseModule } from '@server/course/course.module'
import { GroupModule } from '@server/group/group.module'
import { QuestionOrderModule } from '@server/question-order/question-order.module'
import { QuestionModule } from '@server/question/question.module'
import { TaskModule } from '@server/task/task.module'
import { existsSync } from 'fs'
import { AppService } from './app.service'
import { RoleModule } from '@server/role/role.module'
import { TaskSessionModule } from '@server/task-session/task-session.module'
import { UserModule } from '@server/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: existsSync('.env.local') ? '.env.local' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('DB_HOST'),
          port: configService.getOrThrow('DB_PORT'),
          username: configService.getOrThrow('DB_USERNAME'),
          password: configService.getOrThrow('DB_PASSWORD'),
          database: configService.getOrThrow('DB_NAME'),
          entities: [configService.getOrThrow('DB_ENTITIES')],
          migrations: [configService.getOrThrow('DB_MIGRATIONS')],
          synchronize: configService.getOrThrow('DB_SYNC') === 'true',
        }
      },
    }),
    AttemptModule,
    CourseModule,
    GroupModule,
    QuestionModule,
    QuestionOrderModule,
    RoleModule,
    TaskSessionModule,
    TaskModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name)

  constructor(private readonly config: ConfigService) {}

  onApplicationBootstrap() {
    this.logger.log(
      `Server will start at http://localhost:${this.config.getOrThrow('PORT')}`,
    )
  }
}

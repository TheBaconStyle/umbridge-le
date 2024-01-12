import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppService } from './app.service'
import { TrpcModule } from './trpc/trpc.module'

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env.local' }), TrpcModule],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name)
  constructor(private readonly config: ConfigService) {}

  onApplicationBootstrap() {
    this.logger.log(
      `Server will start at http://localhost:${this.config.get('PORT')}`,
    )
  }
}

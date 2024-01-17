import { TypeOrmModule } from '@nestjs/typeorm'
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.getOrThrow('DB_URL'),
        entities: [configService.getOrThrow('DB_ENTITIES')],
        migrations: [configService.getOrThrow('DB_MIGRATIONS')],
        synchronize: configService.get('DB_SYNC') === 'true',
      }),
    }),
  ],
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

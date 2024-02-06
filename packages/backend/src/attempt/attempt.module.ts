import { Module } from '@nestjs/common'
import { AttemptService } from './attempt.service'

@Module({
  providers: [AttemptService],
})
export class AttemptModule {}

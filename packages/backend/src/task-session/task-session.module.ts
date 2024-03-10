import { Module } from '@nestjs/common'
import { TaskSessionService } from './task-session.service'

@Module({
  providers: [TaskSessionService],
})
export class TaskSessionModule {}

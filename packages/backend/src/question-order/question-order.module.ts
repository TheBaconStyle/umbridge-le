import { Module } from '@nestjs/common'
import { QuestionOrderService } from './question-order.service'

@Module({
  providers: [QuestionOrderService],
})
export class QuestionOrderModule {}

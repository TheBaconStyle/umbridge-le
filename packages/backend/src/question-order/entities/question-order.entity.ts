import { Attempt } from '@server/attempt/entities/attempt.entity'
import { Question } from '@server/question/entities/question.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class QuestionOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('jsonb')
  variants: string[]

  @Column('jsonb')
  answer: string | string[]

  @Column()
  order_index: number

  @ManyToOne(() => Question, (question) => question.orders)
  question: Question

  attempt: Attempt
}

import { Task } from '@server/task/entities/task.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { questionTypeVariants } from '../schema/createQuestion.schema'
import { QuestionOrder } from '@server/question-order/entities/question-order.entity'

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  text: string

  @Column('enum', { enum: questionTypeVariants })
  type: (typeof questionTypeVariants)[number]

  @Column('jsonb', { nullable: true })
  variants?: string[]

  @Column('jsonb')
  answer: string | string[]

  @ManyToOne(() => Task, (task) => task.questions)
  task: Task

  @OneToMany(() => QuestionOrder, (order) => order.question)
  orders: QuestionOrder[]
}

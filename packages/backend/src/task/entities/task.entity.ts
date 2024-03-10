import { Course } from '@server/course/entities/course.entity'
import { Question } from '@server/question/entities/question.entity'
import { TaskSession } from '@server/task-session/entities/task-session.entity'
import { IsNotEmpty } from 'class-validator'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  @IsNotEmpty()
  theme: string

  @Column({ nullable: false })
  description: string

  @ManyToOne(() => Course, (course) => course.tasks)
  course: Course

  @OneToMany(() => Question, (question) => question.task)
  questions: Question[]

  @OneToMany(() => TaskSession, (session) => session.task)
  sessions: TaskSession[]
}

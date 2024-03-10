import { Group } from '@server/group/entities/group.entity'
import { Task } from '@server/task/entities/task.entity'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class TaskSession {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('timestamp with time zone')
  start: Date

  @Column('timestamp with time zone')
  finish: Date

  @Column()
  attempts: number

  @Column()
  questions: number

  @Column()
  pass: number

  @Column()
  good: number

  @Column()
  excellent: number

  @ManyToOne(() => Task, (task) => task.sessions)
  task: Task

  @ManyToMany(() => Group, (group) => group.taskSessions)
  groups: Group[]
}

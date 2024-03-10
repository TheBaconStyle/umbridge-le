import { Course } from '@server/course/entities/course.entity'
import { TaskSession } from '@server/task-session/entities/task-session.entity'
import { User } from '@server/user/entities/user.entity'
import { IsNotEmpty } from 'class-validator'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  @IsNotEmpty()
  name: string

  @OneToMany(() => User, (user) => user.group)
  students: User[]

  @ManyToMany(() => Course, (course) => course.groups)
  @JoinTable()
  courses: Course[]

  @ManyToMany(() => TaskSession, (taskSession) => taskSession.groups)
  @JoinTable()
  taskSessions: TaskSession[]
}

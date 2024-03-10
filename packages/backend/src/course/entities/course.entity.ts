import { Group } from '@server/group/entities/group.entity'
import { Task } from '@server/task/entities/task.entity'
import { User } from '@server/user/entities/user.entity'
import { IsNotEmpty } from 'class-validator'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  @IsNotEmpty()
  name: string

  @ManyToMany(() => Group, (group) => group.courses)
  groups: Group[]

  @ManyToOne(() => User, (user) => user.courses)
  teacher: User

  @OneToMany(() => Task, (task) => task.course)
  tasks: Task[]
}

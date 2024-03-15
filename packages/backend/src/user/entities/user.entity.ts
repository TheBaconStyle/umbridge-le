import { Attempt } from '@server/attempt/entities/attempt.entity'
import { Course } from '@server/course/entities/course.entity'
import { Group } from '@server/group/entities/group.entity'
import { Role } from '@server/role/entities/role.entity'
import { Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  @IsNotEmpty({ message: 'Empty password is not allowed' })
  @Exclude()
  password: string

  @Column({ nullable: true })
  resetToken: string

  @Column()
  firstName?: string

  @Column()
  middleName?: string

  @Column()
  lastName?: string

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[]

  @ManyToOne(() => Group, (group) => group.students)
  group: Group

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[]

  @OneToMany(() => Attempt, (attempt) => attempt.user)
  attempts: Attempt[]
}

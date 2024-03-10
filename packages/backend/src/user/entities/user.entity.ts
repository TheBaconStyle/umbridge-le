import { Attempt } from '@server/attempt/entities/attempt.entity'
import { Course } from '@server/course/entities/course.entity'
import { Group } from '@server/group/entities/group.entity'
import { Role } from '@server/role/entities/role.entity'
import { compare, genSalt, hash } from 'bcrypt'
import { IsEmail, IsNotEmpty, isStrongPassword } from 'class-validator'
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
  private passwordHash: string

  @Column({ nullable: true })
  resetToken: string

  @Column()
  firstName: string

  @Column()
  middleName: string

  @Column()
  lastName: string

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[]

  @ManyToOne(() => Group, (group) => group.students)
  group: Group

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[]

  @OneToMany(() => Attempt, (attempt) => attempt.user)
  attempts: Attempt[]

  getInitials() {
    return `${this.lastName} ${this.firstName.slice(
      0,
      2,
    )}. ${this.middleName.slice(0, 2)}.`
  }

  getFullName() {
    return `${this.lastName} ${this.firstName} ${this.middleName}`
  }

  validatePassword(password: string) {
    return compare(password, this.passwordHash)
  }

  async updatePassword(newPassword: string) {
    if (!isStrongPassword(newPassword)) return false
    const salt = await genSalt(Number(process.env.SALT_ROUNDS) ?? 12)
    this.passwordHash = await hash(newPassword, salt)
    return true
  }
}

import { User } from '@server/user/entities/user.entity'
import { IsNotEmpty } from 'class-validator'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  @IsNotEmpty({ message: 'name can not be empty string' })
  name: string

  @ManyToMany(() => User)
  @JoinTable()
  users: User[]
}

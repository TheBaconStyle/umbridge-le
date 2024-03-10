import { User } from '@server/user/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Attempt {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('timestamp with time zone')
  expires: Date

  @Column({ nullable: true })
  result: string

  @Column('time without time zone')
  closed: Date

  @ManyToOne(() => User, (user) => user.attempts)
  user: User
}
